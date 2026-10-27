import test from 'node:test';
import assert from 'node:assert/strict';
const {preparePublicInquiry=()=>({}),publicContact={}}=await import('./publicContact.js').catch(()=>({}));
test('public inquiry requires actual name and need, then encodes a draft for confirmed WhatsApp',()=>{
  assert.ok(preparePublicInquiry('  ','Internet rumah').error);
  assert.ok(preparePublicInquiry('Rina','  ').error);
  const result=preparePublicInquiry(' Rina ','Internet rumah & usaha');
  assert.equal(result.error,undefined);
  assert.match(result.message,/Rina/);
  assert.equal(new URL(result.href).searchParams.get('text'),result.message);
  assert.equal(new URL(result.href).pathname,'/'+publicContact.whatsapp);
  assert.match(result.message,/Internet rumah & usaha/);
});
