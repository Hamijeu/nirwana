import test from 'node:test';
import assert from 'node:assert/strict';
import * as auth from './demoAuth.js';

test('login lock expires and exposes seconds remaining',()=>{
 auth.resetDemoLock();
 for(let i=0;i<5;i++)auth.loginDemo(auth.DEMO_PHONE,'incorrect','Aktif',1000);
 assert.equal(typeof auth.getDemoLock,'function');
 assert.equal(auth.getDemoLock(2000).remainingSeconds,899);
 assert.equal(auth.loginDemo(auth.DEMO_PHONE,auth.DEMO_PASSWORD,'Aktif',901001).ok,true);
});
test('OTP failures decrement remaining attempts, exhaustion and resend reset',()=>{
 auth.issueDemoOtp(auth.DEMO_PHONE,1000);
 assert.equal(typeof auth.getDemoOtpState,'function');
 assert.equal(auth.getDemoOtpState(1000).remainingAttempts,5);
 for(let i=0;i<5;i++)auth.checkDemoOtp('000000',2000);
 assert.equal(auth.getDemoOtpState(2000).remainingAttempts,0);
 assert.match(auth.checkDemoOtp('123456',2000),/Batas percobaan/);
 auth.issueDemoOtp(auth.DEMO_PHONE,3000);
 assert.equal(auth.getDemoOtpState(3000).remainingAttempts,5);
 assert.equal(auth.checkDemoOtp('123456',4000),null);
 auth.finishDemoRecovery();
 assert.match(auth.checkDemoOtp('123456',4000),/digunakan/);
});
test('OTP expiration is distinct and already verified code cannot be verified twice',()=>{
 auth.issueDemoOtp(auth.DEMO_PHONE,1000);
 assert.match(auth.checkDemoOtp('123456',301000),/kedaluwarsa/);
 auth.issueDemoOtp(auth.DEMO_PHONE,1000);
 assert.equal(auth.checkDemoOtp('123456',2000),null);
 assert.match(auth.checkDemoOtp('123456',2000),/digunakan/);
});

test('login failures use the same response for every account status',()=>{
 auth.resetDemoLock();
 const activeFailure=auth.loginDemo(auth.DEMO_PHONE,'incorrect','Aktif',1000);
 assert.deepEqual(auth.loginDemo(auth.DEMO_PHONE,'incorrect','Belum Aktif',1001),activeFailure);
 assert.deepEqual(auth.loginDemo(auth.DEMO_PHONE,auth.DEMO_PASSWORD,'Nonaktif',1002),activeFailure);
});

test('OTP request gives the same acknowledgement for unknown numbers without allowing verification',()=>{
 const known=auth.issueDemoOtp(auth.DEMO_PHONE,1000);
 const unknown=auth.issueDemoOtp('081200000000',1000);
 assert.deepEqual(unknown,known);
 assert.match(auth.checkDemoOtp('123456',2000),/tidak cocok/);
});

test('deactivation revokes the demo client session and any verified or new OTP',async()=>{
 const {customers}=await import('./data.js');
 const customer=customers.find(item=>item.id===auth.DEMO_CLIENT_ID);
 const status=customer.status;
 try {
  auth.resetDemoLock();
  assert.equal(auth.loginDemo(auth.DEMO_PHONE,auth.DEMO_PASSWORD,'Aktif',1000).ok,true);
  auth.issueDemoOtp(auth.DEMO_PHONE,1000);
  assert.equal(auth.checkDemoOtp('123456',2000),null);
  customer.status='Nonaktif';
  auth.revokeDemoClientAccess();
  auth.setDemoSession('client');
  assert.equal(auth.getDemoSession(),null);
  assert.equal(auth.finishDemoRecovery(2000),false);
  auth.issueDemoOtp(auth.DEMO_PHONE,2000);
  assert.match(auth.checkDemoOtp('123456',2100),/tidak cocok/);
  customer.status='Aktif';
  assert.equal(auth.getDemoSession(),null);
  assert.match(auth.checkDemoOtp('123456',2200),/tidak cocok/);
 } finally {
  customer.status=status;
  auth.revokeDemoClientAccess();
  auth.resetDemoLock();
 }
});
