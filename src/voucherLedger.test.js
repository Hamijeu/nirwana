import test from 'node:test';
import assert from 'node:assert/strict';
import {createVoucherLedger,saveVoucherType,recordVoucherMovement,correctVoucherMovement} from './voucherLedger.js';

const fresh=()=>createVoucherLedger([{name:'Voucher 10 GB',count:10}]);
test('initial ledger owns stable IDs and does not fabricate stock history',()=>{
 const ledger=fresh(); assert.ok(ledger.vouchers[0].id); assert.equal(ledger.vouchers[0].count,10); assert.deepEqual(ledger.history,[]);
});
test('only operational staff manage types and duplicate names are rejected',()=>{
 const original=fresh(); const added=saveVoucherType(original,'admin',{name:'Voucher 20 GB'});
 assert.equal(added.vouchers.length,2); assert.equal(added.vouchers[1].count,0); assert.equal(original.vouchers.length,1);
 assert.throws(()=>saveVoucherType(original,'technician',{name:'Other'}),/berwenang/);
 assert.throws(()=>saveVoucherType(original,'officer',{name:' voucher 10 gb '}),/sudah/);
 const edited=saveVoucherType(original,'officer',{id:original.vouchers[0].id,name:'Voucher 12 GB'});
 assert.equal(edited.vouchers[0].count,10); assert.equal(edited.vouchers[0].name,'Voucher 12 GB');
});
test('technician records stock movements with positive integer quantities and mandatory reasons',()=>{
 const original=fresh(),voucherId=original.vouchers[0].id;
 const next=recordVoucherMovement(original,'technician',{voucherId,type:'Tambah',quantity:3,reason:'Pembelian stok'});
 assert.equal(next.vouchers[0].count,13); assert.equal(next.history[0].delta,3); assert.equal(next.history[0].by,'Andi Saputra · Teknisi');
 assert.equal(original.vouchers[0].count,10); assert.equal(original.history.length,0);
 for(const quantity of [0,-1,1.5,Infinity,NaN,''])assert.throws(()=>recordVoucherMovement(original,'admin',{voucherId,type:'Tambah',quantity,reason:'Stok'}));
 assert.throws(()=>recordVoucherMovement(original,'officer',{voucherId,type:'Tambah',quantity:1,reason:'   '}),/alasan/i);
 assert.throws(()=>recordVoucherMovement(original,'client',{voucherId,type:'Tambah',quantity:1,reason:'Stok'}),/berwenang/);
 assert.throws(()=>recordVoucherMovement(original,'admin',{voucherId,type:'Kurangi',quantity:11,reason:'Distribusi'}),/stok/i);
 assert.throws(()=>recordVoucherMovement(original,'admin',{voucherId,type:'Other',quantity:1,reason:'Distribusi'}),/jenis/i);
});
test('correction appends the difference and retains the original immutable record',()=>{
 const original=fresh(),voucherId=original.vouchers[0].id;
 const moved=recordVoucherMovement(original,'admin',{voucherId,type:'Tambah',quantity:5,reason:'Stok masuk'});
 const source=moved.history[0];
 const corrected=correctVoucherMovement(moved,'officer',{movementId:source.id,quantity:2,reason:'Jumlah pada bukti adalah dua'});
 assert.equal(corrected.vouchers[0].count,12); assert.equal(corrected.history.length,2); assert.deepEqual(corrected.history[1],source);
 assert.equal(corrected.history[0].corrects,source.id); assert.equal(corrected.history[0].delta,-3); assert.equal(corrected.history[0].correctedQuantity,2);
 assert.throws(()=>correctVoucherMovement(corrected,'admin',{movementId:source.id,quantity:1,reason:'Ulang'}),/sudah/);
 assert.throws(()=>correctVoucherMovement(moved,'technician',{movementId:source.id,quantity:2,reason:'Koreksi'}),/berwenang/);
 assert.throws(()=>correctVoucherMovement(moved,'admin',{movementId:source.id,quantity:5,reason:'Tidak berubah'}),/sama/);
 assert.throws(()=>correctVoucherMovement(moved,'admin',{movementId:source.id,quantity:0,reason:'Koreksi'}),/positif/);
});
test('correction of outgoing movement uses original direction and cannot make balance negative',()=>{
 const original=fresh(),voucherId=original.vouchers[0].id;
 const moved=recordVoucherMovement(original,'technician',{voucherId,type:'Kurangi',quantity:4,reason:'Distribusi'});
 const source=moved.history[0];
 assert.equal(correctVoucherMovement(moved,'admin',{movementId:source.id,quantity:2,reason:'Ternyata dua unit'}).vouchers[0].count,8);
 assert.throws(()=>correctVoucherMovement(moved,'admin',{movementId:source.id,quantity:11,reason:'Koreksi bukti'}),/stok/i);
});

test('movement audit records company balance before and after without changing origin',()=>{
 const start=createVoucherLedger([{name:'Voucher',count:10}]);
 const moved=recordVoucherMovement(start,'technician',{voucherId:start.vouchers[0].id,type:'Tambah',quantity:5,reason:'Masuk'});
 assert.equal(moved.history[0].before,10);assert.equal(moved.history[0].after,15);
 const corrected=correctVoucherMovement(moved,'admin',{movementId:moved.history[0].id,quantity:3,reason:'Koreksi'});
 assert.equal(corrected.history[0].before,15);assert.equal(corrected.history[0].after,13);assert.equal(corrected.history[1].after,15);
});
