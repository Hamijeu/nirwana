import React, {useState} from 'react';
import {Plus} from 'lucide-react';
import {customers} from './data';
import {useFeedback} from './Feedback';
import {normalizePhone} from './demoAuth';
import {validateAccountPhone,activeStaffTickets} from './accountValidation';

export const initialStaff=[
 {id:1,name:'Nadia Amelia',phone:'081200000193',role:'Admin',status:'Aktif',last:'Hari ini'},
 {id:2,name:'Nadia Putri',phone:'081300002810',role:'Officer',status:'Aktif',last:'Hari ini'},
 {id:3,name:'Andi Saputra',phone:'082200001265',role:'Technician',status:'Aktif',last:'Kemarin'},
];
const blank={name:'',phone:'',role:'Officer'};
export default function UsersPage({notify,tickets=[],staff:controlledStaff,setStaff:controlledSetStaff}){
 const {checkOperation}=useFeedback();
 const [tab,setTab]=useState('Staff'),[localStaff,setLocalStaff]=useState(initialStaff),[dialog,setDialog]=useState(null),[form,setForm]=useState(blank),[error,setError]=useState('');
 const staff=controlledStaff??localStaff,setStaff=controlledSetStaff??setLocalStaff;
 const users=tab==='Staff'?staff:customers.map(c=>({...c,role:'Client',last:'03 Okt 2026'}));
 const allUsers=[...staff.map(u=>({...u,key:'staff-'+u.id})),...customers.map(u=>({...u,key:'client-'+u.id}))];
 function open(type,user){setError('');setForm(user?{name:user.name,phone:user.phone,role:user.role}:blank);setDialog({type,user})}
 function update(user,fields){if(!checkOperation())return;if(tab==='Staff')setStaff(items=>items.map(item=>item.id===user.id?{...item,...fields}:item));else Object.assign(customers.find(c=>c.id===user.id),fields);notify('Akses akun demo diperbarui');setDialog(null)}
 function savePhone(e){e.preventDefault();const invalid=validateAccountPhone(form.phone,allUsers,(tab==='Staff'?'staff-':'client-')+dialog.user.id);if(invalid){setError(invalid);return}update(dialog.user,{phone:normalizePhone(form.phone)})}
 function add(e){e.preventDefault();const invalid=!form.name.trim()?'Nama staf wajib diisi.':validateAccountPhone(form.phone,allUsers);if(invalid){setError(invalid);return}if(!checkOperation())return;setStaff(items=>[...items,{id:Date.now(),name:form.name.trim(),phone:normalizePhone(form.phone),role:form.role,status:'Aktif',last:'Belum pernah'}]);notify('Staf demo ditambahkan');setDialog(null)}
 const activeWork=dialog?.user?activeStaffTickets(dialog.user,tickets):[];
 const actions=save=><div className="modal-actions"><button type="button" className="btn soft" onClick={()=>setDialog(null)}>Batal</button><button className="btn" type={save?'button':'submit'} onClick={save}>Simpan</button></div>;
 return <><div className="page-heading"><div><div className="eyebrow">ADMINISTRATION</div><h1>Pengguna & Akses</h1><p>Kelola peran, nomor WhatsApp, dan status akun demo.</p></div><div className="heading-actions"><button className="btn" onClick={()=>open('add')}><Plus size={16}/> Tambah staf</button></div></div><section className="panel"><div className="tabs">{['Staff','Client Accounts'].map(item=><button key={item} className={tab===item?'selected':''} onClick={()=>setTab(item)}>{item}</button>)}</div><div className="table-scroll"><table><thead><tr>{['Nama','Nomor','Role','Status','Last Login','Aksi'].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{users.map(user=><tr key={user.id}><td><strong>{user.name}</strong></td><td>{user.phone}</td><td>{user.role}</td><td><span className={'badge '+user.status.toLowerCase()}>{user.status}</span></td><td>{user.last}</td><td><div className="inline-actions"><button className="text-link" onClick={()=>open('view',user)}>Lihat</button><button className="text-link" onClick={()=>open('phone',user)}>Ubah nomor</button>{tab==='Staff'&&<button className="text-link" onClick={()=>open('role',user)}>Ubah role</button>}<button className="text-link" onClick={()=>open('status',user)}>{user.status==='Aktif'?'Nonaktifkan':'Aktifkan'}</button></div></td></tr>)}</tbody></table></div><p className="small-note">Seluruh nama dan nomor adalah data fiktif untuk simulasi.</p></section>
 {dialog&&<div className="modal-backdrop" onClick={()=>setDialog(null)}><div className="modal" role="dialog" aria-modal="true" aria-label={dialog.type==='add'?'Tambah staf':'Kelola akun'} onKeyDown={e=>{if(e.key==='Escape')setDialog(null)}} onClick={e=>e.stopPropagation()}>
 {dialog.type==='add'?<form noValidate onSubmit={add}><h2>Tambah staf</h2><label className="field"><span>Nama</span><input autoFocus value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label className="field"><span>Nomor WhatsApp</span><input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><label className="field"><span>Role</span><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option>Admin</option><option>Officer</option><option>Technician</option></select></label>{error&&<p className="pm-inline-error" role="alert">{error}</p>}{actions()}</form>
 :dialog.type==='phone'?<form noValidate onSubmit={savePhone}><h2>Ubah nomor WhatsApp</h2><p>{dialog.user.name}</p><label className="field"><span>Nomor WhatsApp baru</span><input autoFocus type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>{error&&<p className="pm-inline-error" role="alert">{error}</p>}{actions()}</form>
 :dialog.type==='role'?<><h2>Ubah role</h2><p>{dialog.user.name}</p><label className="field"><span>Role baru</span><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option>Admin</option><option>Officer</option><option>Technician</option></select></label>{actions(()=>update(dialog.user,{role:form.role}))}</>
 :dialog.type==='status'?<><h2>{dialog.user.status==='Aktif'?'Nonaktifkan':'Aktifkan'} akun?</h2><p>{dialog.user.name} · {dialog.user.role}</p>{dialog.user.status==='Aktif'&&activeWork.length>0&&<div className="pm-note" role="status"><strong>Perhatian: {dialog.user.role==='Technician'?'Teknisi':'Staf'} masih memiliki {activeWork.length} tiket aktif</strong><p>Keterlibatan {dialog.user.role==='Technician'?'Teknisi':'staf'} pada tiket tidak akan dipindahkan atau dihapus secara otomatis. Admin atau Officer dapat melakukan handover setelah akun dinonaktifkan.</p></div>}<div className="modal-actions"><button className="btn soft" onClick={()=>setDialog(null)}>Batal</button><button className="btn" onClick={()=>update(dialog.user,{status:dialog.user.status==='Aktif'?'Nonaktif':'Aktif'})}>Konfirmasi</button></div></>
 :<><h2>{dialog.user.name}</h2><p>{dialog.user.phone} · {dialog.user.role} · {dialog.user.status}</p><div className="modal-actions"><button className="btn" onClick={()=>setDialog(null)}>Tutup</button></div></>}
 </div></div>}</>;
}
