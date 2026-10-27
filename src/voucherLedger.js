export const canManageVoucherTypes=role=>['admin','officer'].includes(role);
export const canMoveVoucherStock=role=>['admin','officer','technician'].includes(role);
const actor=role=>({admin:'Nadia Amelia · Admin',officer:'Nadia Putri · Officer',technician:'Andi Saputra · Teknisi'}[role]);
const authorize=(allowed,role)=>{if(!allowed(role))throw Error('Anda tidak berwenang melakukan tindakan voucher ini.');};
const quantityOf=value=>{const n=Number(value);if(!Number.isSafeInteger(n)||n<=0)throw Error('Jumlah harus berupa bilangan bulat positif.');return n;};
const reasonOf=value=>{if(!String(value??'').trim())throw Error('Alasan wajib diisi.');return String(value).trim();};
const voucherOf=(ledger,id)=>{const item=ledger.vouchers.find(v=>v.id===id);if(!item)throw Error('Jenis voucher tidak ditemukan.');return item;};
const id=()=>crypto.randomUUID();

export function createVoucherLedger(initialVouchers){
 return {vouchers:initialVouchers.map((v,index)=>({...v,id:v.id||`voucher-${index+1}`})),history:[]};
}

export function saveVoucherType(ledger,role,input){
 authorize(canManageVoucherTypes,role);
 const name=String(input.name??'').trim();if(!name)throw Error('Nama jenis voucher wajib diisi.');
 if(ledger.vouchers.some(v=>v.id!==input.id&&v.name.toLocaleLowerCase('id-ID')===name.toLocaleLowerCase('id-ID')))throw Error('Nama jenis voucher sudah digunakan.');
 if(input.id){voucherOf(ledger,input.id);return {...ledger,vouchers:ledger.vouchers.map(v=>v.id===input.id?{...v,name}:v)};}
 return {...ledger,vouchers:[...ledger.vouchers,{id:id(),name,count:0}]};
}

function appendMovement(ledger,voucher,entry){
 const count=voucher.count+entry.delta;
 if(!Number.isSafeInteger(count)||count<0)throw Error('Jumlah melebihi stok tersedia atau saldo tidak valid.');
 return {vouchers:ledger.vouchers.map(v=>v.id===voucher.id?{...v,count}:v),history:[{id:id(),...entry,before:voucher.count,after:count,at:new Date().toISOString()},...ledger.history]};
}

export function recordVoucherMovement(ledger,role,input){
 authorize(canMoveVoucherStock,role);
 if(!['Tambah','Kurangi'].includes(input.type))throw Error('Jenis mutasi tidak valid.');
 const quantity=quantityOf(input.quantity),reason=reasonOf(input.reason),voucher=voucherOf(ledger,input.voucherId);
 return appendMovement(ledger,voucher,{voucherId:voucher.id,voucherName:voucher.name,type:input.type,delta:quantity*(input.type==='Tambah'?1:-1),reason,by:actor(role)});
}

export function correctVoucherMovement(ledger,role,input){
 authorize(canManageVoucherTypes,role);
 const source=ledger.history.find(h=>h.id===input.movementId);
 if(!source||source.type==='Koreksi')throw Error('Pilih mutasi asal yang dapat dikoreksi.');
 if(ledger.history.some(h=>h.corrects===source.id))throw Error('Mutasi ini sudah dikoreksi.');
 const quantity=quantityOf(input.quantity),reason=reasonOf(input.reason),voucher=voucherOf(ledger,source.voucherId);
 const correctedDelta=quantity*(source.delta<0?-1:1),delta=correctedDelta-source.delta;
 if(delta===0)throw Error('Jumlah koreksi sama dengan mutasi asal.');
 return appendMovement(ledger,voucher,{voucherId:voucher.id,voucherName:voucher.name,type:'Koreksi',delta,reason,by:actor(role),corrects:source.id,correctedQuantity:quantity,originalDelta:source.delta});
}
