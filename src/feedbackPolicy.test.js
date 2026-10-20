import test from 'node:test';
import assert from 'node:assert/strict';
import {submissionFailure, validateLogin, validateUpload, fieldValidationMessage} from './feedbackPolicy.js';

test('offline prevents an operation regardless of selected failure scenario', () => {
  assert.equal(submissionFailure({online:false,scenario:'timeout'}).code, 'offline');
  assert.equal(submissionFailure({online:true,scenario:'normal'}), null);
});
test('credential failure applies to login only', () => {
  assert.equal(submissionFailure({online:true,scenario:'auth',login:false}), null);
  assert.equal(submissionFailure({online:true,scenario:'auth',login:true}).code, 'auth');
});
test('timeout and save errors provide recoverable messages', () => {
  for (const scenario of ['timeout','save']) {
    const problem=submissionFailure({online:true,scenario});
    assert.equal(problem.code,scenario);
    assert.match(problem.message,/coba|kirim/i);
  }
});
test('login validates missing values and Indonesian mobile numbers without real authentication', () => {
  assert.match(validateLogin('',''),/nomor|password/i);
  assert.match(validateLogin('abc','demo123'),/nomor/i);
  assert.equal(validateLogin('+62 812-3456-7890','demo123'),null);
  assert.equal(validateLogin('081234567890','demo123'),null);
});
test('uploads reject files above 5 MB and incompatible file formats', () => {
  assert.match(validateUpload({name:'foto.jpg',type:'image/jpeg',size:6*1024*1024},'image/*').title,/besar/i);
  assert.match(validateUpload({name:'data.exe',type:'application/octet-stream',size:120},'.csv,text/csv').title,/format/i);
  assert.equal(validateUpload({name:'data.csv',type:'',size:120},'.csv,text/csv'),null);
  assert.equal(validateUpload({name:'foto.png',type:'image/png',size:120},'image/*'),null);
});
test('required and range warnings use consistent Indonesian copy', () => {
  assert.equal(fieldValidationMessage({label:'Nama',validity:{valueMissing:true}}),'Nama wajib diisi.');
  assert.equal(fieldValidationMessage({label:'Jumlah',min:1,validity:{rangeUnderflow:true}}),'Jumlah minimal 1.');
});
