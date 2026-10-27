import {availableToTech,technicianNames} from './workflow.js';
import {isTicketCategory,isSubmissionCategory,categoryLabel} from './ticketCategories.js';
const office=role=>['admin','officer'].includes(role);
export const actorName=role=>role==='technician'?'Andi Saputra':role==='admin'?'Nadia · Admin':'Nadia · Officer';
export function appendAudit(t,patch,title,note,by,now=Date.now(),clientVisible=false){
 return {...t,...patch,updated:'Baru saja',history:[...(t.history||[]),{title,note,by,at:now,time:new Date(now).toLocaleString('id-ID',{timeZone:'Asia/Jakarta'})+' WIB',clientVisible}]};
}
export function reviewCategory(t,category,reason,role,actor,now=Date.now()){
 if(!office(role)||t.archived)throw Error('Kategori hanya dapat diperbarui Admin/Officer pada tiket aktif.');
 if(!isTicketCategory(category)||!reason.trim())throw Error('Pilih kategori dan isi alasan pemeriksaan atau koreksi.');
 return appendAudit(t,{category},'Kategori diperiksa / dikoreksi',`${categoryLabel(t)} → ${category}. ${reason.trim()}`,actor,now,false);
}
export function correctPriority(t,priority,reason,role,actor,now=Date.now()){
 if(!(office(role)||role==='technician'&&(availableToTech(t,t.reviewedServiceStatus||'Aktif')||technicianNames(t).includes(actor)))||t.archived||!t.published)throw Error('Koreksi prioritas memerlukan kewenangan pada antrean atau tugas terbit.');
 if(!['CRITICAL','HIGH','MEDIUM','LOW'].includes(priority)||!reason.trim())throw Error('Pilih prioritas dan isi alasan perubahan.');
 return appendAudit(t,{priority},'Prioritas dikoreksi',`${t.priority||'Belum ditetapkan'} → ${priority}. ${reason.trim()}`,actor,now);
}
export function archiveReport(t,role,actor,now=Date.now()){
 if(role!=='admin'||t.archived||t.status!=='SELESAI')throw Error('Hanya Admin dapat mengarsipkan tiket selesai yang belum diarsipkan.');
 return appendAudit(t,{archived:true,archivedAt:now,archivedBy:actor},'Tiket diarsipkan','Seluruh riwayat dipertahankan. Arsip hanya dapat dibaca Admin.',actor,now);
}
const timestamp=v=>typeof v==='number'&&Number.isFinite(v)&&v>0;
const duration=(start,end)=>timestamp(start)&&timestamp(end)&&end>=start?end-start:null;
export function ticketDurations(t,now=Date.now()){
 return {response:duration(t.createdAt,t.firstAcceptedAt),resolution:t.status==='SELESAI'?duration(t.createdAt,t.lastCompletedAt):null,age:t.status!=='SELESAI'&&!t.archived?duration(t.createdAt,now):null};
}
export function formatDuration(ms){
 if(ms===null)return 'Belum tersedia';
 const seconds=Math.floor(ms/1000);if(seconds<60)return `${seconds} detik`;
 const minutes=Math.floor(seconds/60);if(minutes<60)return `${minutes} menit`;
 const hours=Math.floor(minutes/60);return hours<24?`${hours} jam ${minutes%60} menit`:`${Math.floor(hours/24)} hari ${hours%24} jam`;
}
export function validateStaffReport(input,services,role){
 if(!['admin','officer','technician'].includes(role))return 'Peran ini tidak dapat membuat laporan atas nama pelanggan.';
 if(!input.customer||!services.some(s=>s.id===Number(input.serviceId)&&s.owner===input.customer))return 'Pilih layanan milik pelanggan yang dipilih.';
 if(!input.title?.trim()||!input.description?.trim()||!input.reason?.trim())return 'Isi judul, fakta gangguan, dan alasan pelaporan atas nama pelanggan.';
 if(!['CRITICAL','HIGH','MEDIUM','LOW'].includes(input.priority))return 'Pilih prioritas operasional laporan petugas.';
 if(!isSubmissionCategory(input.category))return 'Kategori gangguan tidak valid.';
 return null;
}
export function hasCoordinates(service){
 const parts=String(service.coord||'').split(',');if(parts.length!==2||parts.some(p=>!p.trim()))return false;
 const [lat,lng]=parts.map(Number);return Number.isFinite(lat)&&Number.isFinite(lng)&&Math.abs(lat)<=90&&Math.abs(lng)<=180;
}
export function filterMapServices(services,query='',region='Semua wilayah',status='Semua status'){
 return services.filter(s=>`${s.owner} ${s.number} ${s.address||''}`.toLowerCase().includes(query.toLowerCase())&&(region==='Semua wilayah'||s.region===region)&&(status==='Semua status'||s.status===status));
}

export const staffPublication=status=>status==='Aktif'?{reviewStatus:'Tidak Wajib',published:true}:{reviewStatus:'Menunggu Review',published:false};
