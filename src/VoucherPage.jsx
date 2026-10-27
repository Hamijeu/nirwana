import React,{useEffect,useRef,useState} from 'react';
import {FileText,Plus} from 'lucide-react';
import {canManageVoucherTypes,canMoveVoucherStock,saveVoucherType,recordVoucherMovement,correctVoucherMovement} from './voucherLedger.js';

const stamp=value=>new Date(value).toLocaleString('id-ID',{timeZone:'Asia/Jakarta',dateStyle:'medium',timeStyle:'short'})+' WIB';
const signed=value=>(value>0?'+':'')+value;

export default function VoucherPage({role,ledger,onChangeLedger,notify}){
 const [dialog,setDialog]=useState(null),[quantity,setQuantity]=useState('1'),[reason,setReason]=useState(''),[name,setName]=useState(''),[error,setError]=useState('');
 const modalRef=useRef(null),trigger=useRef(null);
 const manage=canManageVoucherTypes(role),move=canMoveVoucherStock(role);
 const {vouchers,history}=ledger;
 const voucher=dialog?.voucherId?vouchers.find(v=>v.id===dialog.voucherId):null;
 const source=dialog?.movementId?history.find(h=>h.id===dialog.movementId):null;
 const title=dialog?.type==='new'?'Tambah jenis voucher':dialog?.type==='edit'?'Edit jenis voucher':dialog?.type==='correct'?'Koreksi mutasi stok':`${dialog?.type||''} stok voucher`;
 function close(){setDialog(null);trigger.current?.focus();}
 function open(next,event){trigger.current=event.currentTarget;setError('');setReason('');setQuantity(next.type==='correct'?String(Math.abs(history.find(h=>h.id===next.movementId).delta)):'1');setName(next.type==='edit'?vouchers.find(v=>v.id===next.voucherId).name:'');setDialog(next);}
 useEffect(()=>{if(!dialog)return;modalRef.current?.querySelector('input,textarea,button')?.focus();},[dialog]);
 function trap(event){
  if(event.key==='Escape'){event.preventDefault();close();return;}
  if(event.key!=='Tab')return;
  const nodes=Array.from(modalRef.current?.querySelectorAll('input,textarea,select,button')||[]).filter(n=>!n.disabled);
  if(!nodes.length)return;
  if(event.shiftKey&&document.activeElement===nodes[0]){event.preventDefault();nodes.at(-1).focus();}
  else if(!event.shiftKey&&document.activeElement===nodes.at(-1)){event.preventDefault();nodes[0].focus();}
 }
 function commit(event){
  event.preventDefault();if(!dialog)return;
  try{
   const next=['new','edit'].includes(dialog.type)?saveVoucherType(ledger,role,{id:dialog.type==='edit'?dialog.voucherId:undefined,name}):dialog.type==='correct'?correctVoucherMovement(ledger,role,{movementId:dialog.movementId,quantity,reason}):recordVoucherMovement(ledger,role,{voucherId:dialog.voucherId,type:dialog.type,quantity,reason});
   if(onChangeLedger(next)===false)return;
   notify(['new','edit'].includes(dialog.type)?'Jenis voucher tersimpan':'Mutasi stok tersimpan');close();
  }catch(problem){setError(problem.message);}
 }
 return <>
  <div className="page-heading"><div><div className="eyebrow">SALDO PERUSAHAAN</div><h1>Stok Voucher</h1><p>Saldo dalam unit berdasarkan jenis dan riwayat mutasi.</p></div>{manage&&<div className="heading-actions"><button className="btn" onClick={event=>open({type:'new'},event)}><Plus size={16}/> Tambah jenis voucher</button></div>}</div>
  <div className="metrics three voucher-grid">{vouchers.map(v=><div className="voucher-card" key={v.id}>
   <div className="voucher-card-top"><div className="voucher-icon"><FileText size={20}/></div><span className="badge">{v.count<100?'Stok rendah':'Tersedia'}</span></div><span>{v.name}</span><strong>{v.count}</strong><small>unit voucher tersedia</small>
   {move&&<div className="voucher-actions"><button className="btn soft" onClick={event=>open({voucherId:v.id,type:'Tambah'},event)}><Plus size={15}/> Tambah stok</button><button className="btn soft" disabled={v.count===0} onClick={event=>open({voucherId:v.id,type:'Kurangi'},event)}>− Kurangi stok</button></div>}
   {manage&&<button className="text-link" style={{marginTop:14}} onClick={event=>open({voucherId:v.id,type:'edit'},event)}>Edit jenis voucher</button>}
  </div>)}</div>
  {!vouchers.length&&<p className="panel pm-empty">Belum ada jenis voucher.</p>}
  <section className="panel"><div className="panel-head"><h2>Riwayat Mutasi</h2></div><p className="small-note">Saldo awal merupakan data demo. Setiap perubahan stok dicatat terpisah; koreksi tidak menghapus mutasi asal.</p>
   {history.length?<div className="table-scroll"><table><thead><tr>{['Waktu','Voucher','Tipe','Perubahan stok','Pelaku','Alasan',...(manage?['Aksi']:[])].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{history.map(h=>{
    const correction=history.find(entry=>entry.corrects===h.id);
    return <tr key={h.id}><td>{stamp(h.at)}<small style={{display:'block'}}>#{h.id.slice(0,8)}</small></td><td>{h.voucherName}</td><td>{h.type==='Tambah'?'Penambahan':h.type==='Kurangi'?'Pengurangan':'Koreksi'}{h.corrects&&<small style={{display:'block'}}>Mutasi asal #{h.corrects.slice(0,8)}<br/>Jumlah yang benar: {h.correctedQuantity} unit</small>}{correction&&<small style={{display:'block'}}>Sudah dikoreksi · #{correction.id.slice(0,8)}</small>}</td><td>{signed(h.delta)} unit<small style={{display:'block'}}>Saldo: {h.before??'Belum tercatat'} → {h.after??'Belum tercatat'} unit</small></td><td>{h.by}</td><td>{h.reason}</td>{manage&&<td>{h.type!=='Koreksi'&&!correction?<button className="text-link" onClick={event=>open({type:'correct',voucherId:h.voucherId,movementId:h.id},event)}>Koreksi mutasi</button>:<span className="small-note">{correction?'Sudah dikoreksi':'Catatan koreksi'}</span>}</td>}</tr>;
   })}</tbody></table></div>:<p className="pm-empty">Belum ada mutasi stok pada sesi ini.</p>}
  </section>
  {role==='technician'&&<p className="small-note">Teknisi dapat menambah dan mengurangi stok dengan alasan. Pengelolaan jenis dan koreksi mutasi dilakukan Admin/Officer.</p>}
  {dialog&&<div className="modal-backdrop" onClick={close}><form ref={modalRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="voucher-dialog-title" onKeyDown={trap} onClick={event=>event.stopPropagation()} onSubmit={commit}>
   <h2 id="voucher-dialog-title">{title}</h2>
   {['new','edit'].includes(dialog.type)?<><label className="field"><span>Nama jenis voucher</span><input required maxLength={100} value={name} onChange={event=>setName(event.target.value)} placeholder="Contoh: Voucher 20 GB"/></label><p className="small-note">{dialog.type==='new'?'Jenis baru dimulai dari 0 unit. Gunakan Tambah stok untuk mencatat stok masuk.':'Mengubah nama tidak mengubah saldo atau nama pada riwayat sebelumnya.'}</p></>:<>
    <p>{voucher?.name} · stok saat ini {voucher?.count} unit</p>
    {source&&<div className="pm-note"><strong>Mutasi asal #{source.id.slice(0,8)}</strong><p>{source.type==='Tambah'?'Penambahan':'Pengurangan'} {Math.abs(source.delta)} unit · {stamp(source.at)}</p><p>{source.reason}</p><small>Masukkan jumlah yang benar untuk mutasi asal. Sistem mencatat selisihnya sebagai transaksi koreksi terpisah.</small></div>}
    <label className="field"><span>{source?'Jumlah yang benar (unit)':'Jumlah unit'}</span><input type="number" min="1" step="1" required value={quantity} onChange={event=>setQuantity(event.target.value)}/></label>
    <label className="field"><span>{source?'Alasan koreksi':'Alasan mutasi'}</span><textarea required maxLength={1000} rows={3} value={reason} onChange={event=>setReason(event.target.value)}/></label>
   </>}
   {error&&<p className="pm-inline-error" role="alert">{error}</p>}
   <div className="modal-actions"><button className="btn soft" type="button" onClick={close}>Batal</button><button className="btn" type="submit">{source?'Simpan koreksi':'Simpan'}</button></div>
  </form></div>}
 </>;
}
