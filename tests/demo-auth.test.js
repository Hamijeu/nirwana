import test from 'node:test';
import assert from 'node:assert/strict';
import {loginDemo,resetDemoLock,issueDemoOtp,checkDemoOtp,finishDemoRecovery,normalizePhone} from '../src/demoAuth.js';
import {validatePassword} from '../src/workflow.js';
test('normalisasi, salah login, lockout dan status akun',()=>{
 resetDemoLock();assert.equal(normalizePhone('+62 812-3456-7890'),'081234567890');
 for(let i=0;i<5;i++)assert.ok(loginDemo('081234567890','salah','Aktif',1000+i).error);
 assert.ok(loginDemo('081234567890','Nirwana2026!','Aktif',2000).lockedUntil);
 resetDemoLock();assert.equal(loginDemo('081234567890','x','Belum Aktif').activation,true);
 assert.ok(loginDemo('081234567890','x','Nonaktif').error);
 assert.equal(loginDemo('081234567890','Nirwana2026!').ok,true);
});
test('OTP salah, kedaluwarsa, digunakan ulang dan rentang password',()=>{
 issueDemoOtp('081234567890',1000);assert.ok(checkDemoOtp('000000',2000));assert.equal(checkDemoOtp('123456',2000),null);
 assert.ok(checkDemoOtp('123456',301000));issueDemoOtp('081234567890');finishDemoRecovery();assert.ok(checkDemoOtp('123456'));
 assert.ok(validatePassword('1234567','1234567'));assert.ok(validatePassword('a'.repeat(129),'a'.repeat(129)));assert.ok(validatePassword('12345678','salah'));assert.equal(validatePassword('12345678','12345678'),null);
});
