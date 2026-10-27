import test from 'node:test';
import assert from 'node:assert/strict';
let rules={};try{rules=await import('./accountValidation.js')}catch{}
test('account phone validates Indonesian phone and cross-group uniqueness after normalization',()=>{
 assert.equal(typeof rules.validateAccountPhone,'function');
 const users=[{key:'staff-1',phone:'081234567890'},{key:'client-1',phone:'081311112222'}];
 assert.equal(rules.validateAccountPhone('+62 812-3456-7890',users,'staff-1'),null);
 assert.match(rules.validateAccountPhone('+62 813-1111-2222',users,'staff-1'),/sudah/);
 assert.match(rules.validateAccountPhone('080abc123456',users),/Format/);
 assert.match(rules.validateAccountPhone('   ',users),/wajib/);
});
test('active work warning follows actual ticket participation and excludes archived or done tickets',()=>{
 assert.equal(typeof rules.activeStaffTickets,'function');
 const staff={name:'Andi Saputra',role:'Technician'};
 const tickets=[{id:1,status:'OPEN',tech:'Andi Saputra'},{id:2,status:'SELESAI',tech:'Andi Saputra'},{id:3,status:'OPEN',technicians:['Andi Saputra'],archived:true},{id:4,status:'PENDING',technicians:['Andi Saputra','Reza']}];
 assert.deepEqual(rules.activeStaffTickets(staff,tickets).map(t=>t.id),[1,4]);
});
