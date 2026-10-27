import {normalizePhone} from './demoAuth.js';
export function validateAccountPhone(value,users,excludeKey){
 if(!String(value||'').trim())return 'Nomor WhatsApp wajib diisi.';
 const normalized=normalizePhone(value);
 if(!/^08\d{8,11}$/.test(normalized))return 'Format nomor WhatsApp salah. Gunakan 08 atau +62 dengan 10–13 digit.';
 if(users.some(user=>user.key!==excludeKey&&normalizePhone(user.phone)===normalized))return 'Nomor WhatsApp sudah digunakan pengguna lain.';
 return null;
}
export function activeStaffTickets(user,tickets){
 return tickets.filter(ticket=>!ticket.archived&&ticket.status!=='SELESAI'&&((ticket.technicians||String(ticket.tech||'').split(',').map(x=>x.trim())).includes(user.name)||ticket.assignedOfficer===user.name));
}
