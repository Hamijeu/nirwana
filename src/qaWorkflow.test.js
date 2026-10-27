import test from 'node:test';
import assert from 'node:assert/strict';
import * as rules from './revisionWorkflow.js';

test('ticket date filters use Jakarta midnight and parse known legacy dates',()=>{
 assert.equal(typeof rules.matchesTicketDate,'function');
 const now=Date.parse('2026-10-27T00:30:00+07:00');
 assert.equal(rules.matchesTicketDate({createdAt:Date.parse('2026-10-26T17:05:00Z')},'Hari ini',now),true);
 assert.equal(rules.matchesTicketDate({createdAt:Date.parse('2026-10-26T16:59:00Z')},'Hari ini',now),false);
 assert.equal(rules.matchesTicketDate({created:'04 Okt 2026 · 08:42'},'Hari ini',now),false);
 assert.equal(rules.matchesTicketDate({created:'04 Okt 2026 · 08:42'},'Sebelumnya',now),true);
 assert.equal(rules.matchesTicketDate({created:'27/10/2026, 09.00 WIB'},'Hari ini',now),true);
 assert.equal(rules.matchesTicketDate({created:'Tidak diketahui'},'Sebelumnya',now),false);
});
test('technician filtering includes each participant and excludes old handovers',()=>{
 assert.equal(typeof rules.matchesTicketTechnician,'function');
 const ticket={technicians:['Andi Saputra','Reza Putra'],tech:'Andi Saputra, Reza Putra'};
 assert.equal(rules.matchesTicketTechnician(ticket,'Andi Saputra'),true);
 assert.equal(rules.matchesTicketTechnician(ticket,'Reza Putra'),true);
 assert.equal(rules.matchesTicketTechnician({...ticket,technicians:['Reza Putra']},'Andi Saputra'),false);
 assert.equal(rules.matchesTicketTechnician({tech:'Belum ditugaskan'},'Belum ditugaskan'),true);
});
test('progress preserves status, initial report and timing while appending an audit',()=>{
 assert.equal(typeof rules.recordTicketProgress,'function');
 const ticket={id:1,status:'IN PROGRESS',published:true,reviewStatus:'Disetujui',technicians:['Andi Saputra'],description:'Laporan awal',firstAcceptedAt:20,createdAt:10,history:[]};
 const next=rules.recordTicketProgress(ticket,'Pemeriksaan berlanjut',[],'technician','Andi Saputra',100);
 assert.equal(next.status,ticket.status);assert.equal(next.description,ticket.description);assert.equal(next.firstAcceptedAt,20);
 assert.equal(next.history.at(-1).title,'Progres ditambahkan');assert.equal(next.history.at(-1).by,'Andi Saputra');assert.equal(next.history.at(-1).at,100);
 assert.equal(ticket.history.length,0);
 for(const [t,role,actor,note,photos] of [[ticket,'client','Client','Catatan',[]],[ticket,'technician','Reza','Catatan',[]],[{...ticket,archived:true},'admin','Admin','Catatan',[]],[{...ticket,status:'NEW'},'admin','Admin','Catatan',[]],[ticket,'admin','Admin',' ',[]],[ticket,'admin','Admin','Catatan',Array(6).fill({size:1,type:'image/png'})],[ticket,'admin','Admin','Catatan',[{size:6*1024*1024,type:'image/png'}]]]){
  assert.throws(()=>rules.recordTicketProgress(t,note,photos,role,actor));
 }
});
