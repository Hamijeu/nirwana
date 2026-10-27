import test from 'node:test';
import assert from 'node:assert/strict';
import * as categories from './ticketCategories.js';
import {approveReport,assignReport,acceptReport} from './workflow.js';
import * as revision from './revisionWorkflow.js';
const ticket=()=>({id:1,customer:'Budi',serviceId:1,category:'Belum tahu',status:'NEW',reviewStatus:'Menunggu Review',history:[],createdAt:1000});
test('optional category permits blank, rejects fabricated categories',()=>{
 assert.equal(categories.isSubmissionCategory(''),true);
 assert.equal(categories.isSubmissionCategory('Belum tahu'),true);
 assert.equal(categories.isSubmissionCategory('fabricated'),false);
});
test('Nira proposes only clear facts and declines conflicting or negated facts',()=>{
 assert.equal(categories.suggestCategory('Internet lambat sejak pagi'),'Koneksi lambat');
 assert.equal(categories.suggestCategory('Internet mati total'),'Tidak bisa terhubung');
 assert.equal(categories.suggestCategory('Koneksi putus-putus'),'Koneksi putus-putus');
 assert.equal(categories.suggestCategory('Tidak tahu'),'');
 assert.equal(categories.suggestCategory('Koneksi tidak lambat'),'');
 assert.equal(categories.suggestCategory('Internet lambat dan mati total'),'');
});
test('category review records old/new actor and timestamp and requires role/reason',()=>{
 const t=ticket();const next=revision.reviewCategory(t,'Koneksi lambat','Keluhan diperiksa','officer','Nadia',2000);
 assert.equal(next.category,'Koneksi lambat');assert.equal(t.category,'Belum tahu');
 assert.equal(next.history.length,1);assert.match(next.history[0].note,/Belum tahu.*Koneksi lambat/);assert.equal(next.history[0].by,'Nadia');assert.equal(next.history[0].at,2000);assert.equal(next.history[0].clientVisible,false);
 assert.throws(()=>revision.reviewCategory(t,'Lainnya','','admin','A'));
 assert.throws(()=>revision.reviewCategory(t,'Lainnya','alasan','client','A'));
 assert.throws(()=>revision.reviewCategory({...t,archived:true},'Lainnya','alasan','admin','A'));
});
test('duration uses real timestamps, never invents zeros for legacy tickets',()=>{
 assert.deepEqual(revision.ticketDurations({status:'OPEN'},9000),{response:null,resolution:null,age:null});
 assert.deepEqual(revision.ticketDurations({createdAt:1000,firstAcceptedAt:3000,lastCompletedAt:6000,status:'SELESAI'},9000),{response:2000,resolution:5000,age:null});
 assert.deepEqual(revision.ticketDurations({createdAt:1000,firstAcceptedAt:3000,lastCompletedAt:6000,status:'OPEN'},9000),{response:2000,resolution:null,age:8000});
 assert.equal(revision.ticketDurations({createdAt:5000,firstAcceptedAt:1000},9000).response,null);
});
test('archive is admin-only for completed tickets and append-only',()=>{
 const t={...ticket(),status:'SELESAI'};const archived=revision.archiveReport(t,'admin','Nadia',8000);
 assert.equal(archived.archived,true);assert.equal(archived.history.at(-1).at,8000);assert.equal(t.history.length,0);
 assert.throws(()=>revision.archiveReport(t,'officer','Nadia'));
 assert.throws(()=>revision.archiveReport(ticket(),'admin','Nadia'));
 assert.throws(()=>revision.archiveReport(archived,'admin','Nadia'));
});
test('priority correction requires published queue/task authority and reason',()=>{
 const t={...ticket(),published:true,reviewStatus:'Disetujui',priority:'LOW'};
 const next=revision.correctPriority(t,'HIGH','Dampak diperiksa','officer','Nadia',9000);
 assert.equal(next.priority,'HIGH');assert.match(next.history.at(-1).note,/LOW.*HIGH/);
 assert.throws(()=>revision.correctPriority(t,'HIGH',' ','admin','Nadia'));
 assert.equal(revision.correctPriority(t,'HIGH','alasan','technician','Andi').priority,'HIGH');
 assert.throws(()=>revision.correctPriority({...t,published:false},'HIGH','alasan','technician','Andi'));
 assert.throws(()=>revision.correctPriority({...t,archived:true},'HIGH','alasan','admin','A'));
});
test('staff reports validate service ownership, role, category and facts',()=>{
 const input={customer:'Budi',serviceId:'1',title:'Internet mati',description:'Sejak pagi',category:'',priority:'MEDIUM',reason:'Diterima via telepon'};
 const services=[{id:1,owner:'Budi'},{id:2,owner:'Siti'}];
 assert.equal(revision.validateStaffReport(input,services,'technician'),null);
 assert.ok(revision.validateStaffReport({...input,serviceId:2},services,'admin'));
 assert.ok(revision.validateStaffReport(input,services,'client'));
 assert.ok(revision.validateStaffReport({...input,reason:' '},services,'officer'));
});
test('map filters share results and validate real coordinate pairs',()=>{
 const list=[{number:'A',owner:'Budi',region:'Utara',status:'Aktif',coord:'-6.8, 107.6'},{number:'B',owner:'Siti',region:'Timur',status:'Nonaktif',coord:'—'}];
 assert.deepEqual(revision.filterMapServices(list,'Siti','Semua wilayah','Nonaktif'),[list[1]]);
 assert.equal(revision.hasCoordinates(list[0]),true);assert.equal(revision.hasCoordinates(list[1]),false);
 assert.equal(revision.hasCoordinates({coord:'999, 107'}),false);
});

test('staff reports publish active services without Client review and retain inactive review',()=>{
 assert.deepEqual(revision.staffPublication('Aktif'),{reviewStatus:'Tidak Wajib',published:true});
 assert.deepEqual(revision.staffPublication('Nonaktif'),{reviewStatus:'Menunggu Review',published:false});
 const input={customer:'Budi',serviceId:1,title:'Mati',description:'Fakta',category:'',reason:'Telepon',priority:''};
 assert.ok(revision.validateStaffReport(input,[{id:1,owner:'Budi'}],'admin'));
});

test('review and handover audit retain actual actor and timestamp',()=>{
 const reviewed=approveReport(ticket(),'HIGH','Sudah diperiksa','Aktif','','Nadia · Officer');
 assert.equal(reviewed.history.at(-1).by,'Nadia · Officer');assert.equal(typeof reviewed.history.at(-1).at,'number');
 const assigned=assignReport(reviewed,['Andi Saputra'],'Penugasan lapangan','Aktif','Nadia · Admin');
 assert.equal(assigned.history.at(-1).by,'Nadia · Admin');
 const accepted=acceptReport({...assigned,firstAcceptedAt:2000},'Andi Saputra','Aktif');
 assert.equal(accepted.firstAcceptedAt,2000);assert.equal(accepted.status,'OPEN');
});
