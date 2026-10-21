import test from 'node:test';
import assert from 'node:assert/strict';
import {approveReport, claimReport, assignReport, acceptReport, availableToTech, canReadTicket} from '../src/workflow.js';
const pending={id:1,status:'NEW',reviewStatus:'Menunggu Review',published:false,priority:null,technicians:[],history:[],customer:'Budi Santoso'};
test('pengajuan belum terbit tidak terlihat atau bisa diklaim teknisi',()=>{
  assert.equal(availableToTech(pending,'Aktif'),false);
  assert.throws(()=>claimReport(pending,'Andi Saputra','Aktif'));
  assert.equal(canReadTicket(pending,'technician'),false);
});
test('review memerlukan prioritas dan alasan, tetap NEW tanpa penugasan',()=>{
  assert.throws(()=>approveReport(pending,'','alasan','Aktif'));
  assert.throws(()=>approveReport(pending,'HIGH','','Aktif'));
  const t=approveReport(pending,'HIGH','Berdampak pada pekerjaan','Aktif');
  assert.equal(t.status,'NEW'); assert.equal(t.published,true); assert.equal(t.reviewStatus,'Disetujui'); assert.deepEqual(t.technicians,[]);
  assert.throws(()=>approveReport(t,'HIGH','ganda','Aktif'));
});
test('klaim multi-teknisi dan penugasan tidak menjalankan Terima',()=>{
  let t=approveReport(pending,'MEDIUM','Satu layanan terdampak','Aktif');
  t=claimReport(t,'Andi Saputra','Aktif'); t=claimReport(t,'Reza Putra','Aktif');
  assert.equal(t.status,'NEW'); assert.deepEqual(t.technicians,['Andi Saputra','Reza Putra']);
  assert.throws(()=>acceptReport(t,'Teknisi lain','Aktif'));
  t=acceptReport(t,'Andi Saputra','Aktif'); assert.equal(t.status,'OPEN');
});
test('layanan Nonaktif memerlukan keputusan dan perubahan setelah terbit memblokir tindakan baru',()=>{
  assert.throws(()=>approveReport(pending,'HIGH','Periksa','Nonaktif'));
  let t=approveReport(pending,'HIGH','Kunjungan disetujui','Nonaktif','teknis');
  assert.equal(availableToTech(t,'Nonaktif'),true);
  t=claimReport(t,'Andi Saputra','Nonaktif'); assert.equal(acceptReport(t,'Andi Saputra','Nonaktif').status,'OPEN');
  const active=approveReport(pending,'HIGH','Periksa','Aktif');
  assert.equal(availableToTech(active,'Nonaktif'),false);
  assert.throws(()=>assignReport(active,['Andi Saputra'],'Penugasan','Nonaktif'));
});
test('administratif tidak diterbitkan; arsip dan tiket lain tidak dapat dibaca Client',()=>{
  const t=approveReport(pending,'MEDIUM','Tindak lanjut administrasi','Nonaktif','administratif');
  assert.equal(t.published,false); assert.equal(canReadTicket(t,'technician'),false);
  assert.equal(canReadTicket({...t,archived:true},'client'),false);
  assert.equal(canReadTicket({...t,customer:'Siti Rahma'},'client'),false);
});
test('handover menjaga riwayat dan tidak mengubah status',()=>{
  const t=claimReport(approveReport(pending,'HIGH','Alasan','Aktif'),'Andi Saputra','Aktif');
  const next=assignReport(t,['Reza Putra'],'Pergantian jadwal','Aktif');
  assert.deepEqual(next.technicians,['Reza Putra']); assert.equal(next.status,t.status);
  assert.ok(next.history.at(-1).note.includes('Andi Saputra')); assert.ok(next.history.at(-1).note.includes('Reza Putra'));
});
