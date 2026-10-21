const priorities=['CRITICAL','HIGH','MEDIUM','LOW'];
const event=(t,title,note,by='Admin / Officer',clientVisible=false)=>({...t,updated:'Baru saja',history:[...(t.history||[]),{title,note,by,clientVisible,time:new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Jakarta'})}]});
export const technicianNames=t=>t.technicians??(t.tech&&t.tech!=='Belum ditugaskan'?[t.tech]:[]);
export function normalizeTicket(t){return {...t,origin:t.origin||'Client',reviewStatus:t.reviewStatus||(t.id===4?'Menunggu Review':'Disetujui'),published:t.published??t.id!==4,technicians:technicianNames(t),...t.id===4?{priority:null}: {}}}
export function availableToTech(t,serviceStatus='Aktif'){
  return !t.archived&&t.published&&['Disetujui','Tidak Wajib'].includes(t.reviewStatus)&&t.status!=='SELESAI'&&(serviceStatus==='Aktif'||t.inactiveDecision==='teknis'&&t.reviewedServiceStatus==='Nonaktif');
}
export function approveReport(t,priority,reason,serviceStatus,decision=''){
  if(t.archived||t.reviewStatus!=='Menunggu Review')throw Error('Pengajuan sudah berubah. Buka kembali data terbaru.');
  if(!priorities.includes(priority)||!reason.trim())throw Error('Pilih prioritas operasional dan tulis alasan keputusan.');
  if(serviceStatus==='Nonaktif'&&!['teknis','administratif'].includes(decision))throw Error('Tentukan tindak lanjut layanan Nonaktif terlebih dahulu.');
  return event({...t,priority,reviewStatus:'Disetujui',published:decision!=='administratif',reviewedServiceStatus:serviceStatus,inactiveDecision:decision||null,reviewReason:reason,status:'NEW'},decision==='administratif'?'Review disetujui · administratif':'Review disetujui · tiket diterbitkan',reason);
}
export function claimReport(t,name,serviceStatus){
  if(!availableToTech(t,serviceStatus))throw Error('Tiket belum tersedia untuk tindakan teknis baru.');
  const names=technicianNames(t); if(names.includes(name))return t;
  return event({...t,technicians:[...names,name],tech:[...names,name].join(', ')},'Teknisi bergabung',`${name} mengklaim tiket. Status penanganan tetap ${t.status}.`,name);
}
export function assignReport(t,names,reason,serviceStatus){
  if(!availableToTech(t,serviceStatus))throw Error('Periksa penerbitan dan status layanan sebelum penugasan.');
  if(!names.length||!reason.trim())throw Error('Pilih Teknisi dan isi alasan penugasan atau handover.');
  const unique=[...new Set(names)];
  return event({...t,technicians:unique,tech:unique.join(', ')},'Penugasan / handover',`${technicianNames(t).join(', ')||'Belum ditugaskan'} → ${unique.join(', ')}. ${reason}`);
}
export function acceptReport(t,name,serviceStatus){
  if(t.status!=='NEW'||!availableToTech(t,serviceStatus)||!technicianNames(t).includes(name))throw Error('Klaim atau penugasan harus selesai sebelum Terima.');
  return event({...t,status:'OPEN',firstAcceptedAt:Date.now()},'Tiket diterima',`${name} menerima pekerjaan.`,name,true);
}
export function canReadTicket(t,role){
  if(!t)return false;
  if(t.archived)return role==='admin';
  if(role==='client')return t.customer==='Budi Santoso';
  if(role==='technician')return !!t.published&&['Disetujui','Tidak Wajib'].includes(t.reviewStatus);
  return ['admin','officer'].includes(role);
}
export const validatePassword=(password,confirmation)=>password.length<8||password.length>128?'Password harus 8–128 karakter.':password!==confirmation?'Konfirmasi password belum cocok.':null;
