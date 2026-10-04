import test from 'node:test';
import assert from 'node:assert/strict';
import {canTransition, transitionTicket, canCorrectVoucher, validateImportRows} from './domain.js';

test('ticket follows lifecycle and archived tickets are read only', () => {
  const ticket={status:'NEW',archived:false,history:[]};
  assert.equal(canTransition(ticket,'OPEN'),true);
  assert.equal(canTransition(ticket,'SELESAI'),false);
  const opened=transitionTicket(ticket,'OPEN','Diterima');
  assert.equal(opened.status,'OPEN');
  assert.equal(opened.history.length,1);
  assert.equal(canTransition({...opened,status:'SELESAI'},'OPEN'),true);
  assert.equal(canTransition({...opened,archived:true},'IN PROGRESS'),false);
});

test('voucher correction is limited to office roles', () => {
  assert.equal(canCorrectVoucher('admin'),true);
  assert.equal(canCorrectVoucher('officer'),true);
  assert.equal(canCorrectVoucher('technician'),false);
});

test('CSV validation reports missing fields and permits valid rows', () => {
  assert.equal(validateImportRows([{nama:'Budi',nomor_layanan:'SRV-1',wilayah:'Bandung Utara'}]).length,0);
  assert.equal(validateImportRows([{nama:'',nomor_layanan:'SRV-1',wilayah:''}]).length,2);
});
