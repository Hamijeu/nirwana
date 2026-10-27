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
