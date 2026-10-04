const nextStatuses={NEW:['OPEN'],OPEN:['IN PROGRESS','PENDING'], 'IN PROGRESS':['PENDING','SELESAI'],PENDING:['IN PROGRESS','SELESAI'],SELESAI:['OPEN']};
export const canTransition=(ticket,next)=>!ticket.archived&&(nextStatuses[ticket.status]||[]).includes(next);
export const transitionTicket=(ticket,next,note,by='Nadia · Officer')=>{
  if(!canTransition(ticket,next))return ticket;
  return {...ticket,status:next,updated:'Baru saja',history:[...ticket.history,{title:'Status menjadi '+next,time:'Baru saja',by,note}]};
};
export const canCorrectVoucher=role=>role==='admin'||role==='officer';
export const validateImportRows=rows=>rows.flatMap((row,index)=>['nama','nomor_layanan','wilayah'].filter(field=>!String(row[field]||'').trim()).map(field=>({row:index+2,field,problem:'Wajib diisi'})));
