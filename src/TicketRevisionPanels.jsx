import React,{useEffect,useState} from 'react';
import {availableToTech,technicianNames} from './workflow';
import {TICKET_CATEGORIES,categoryLabel} from './ticketCategories.js';
import {reviewCategory,correctPriority,actorName,ticketDurations,formatDuration} from './revisionWorkflow.js';

export function TicketTiming({ticket}){
 const [now,setNow]=useState(Date.now());
 useEffect(()=>{if(ticket.status==='SELESAI'||ticket.archived)return;const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[ticket.status,ticket.archived]);
 const durations=ticketDurations(ticket,now);
 return <section className="panel"><h2>Informasi Waktu Penanganan</h2><dl className="details"><div><dt>Waktu Respons</dt><dd>{formatDuration(durations.response)}</dd></div><div><dt>Waktu Penyelesaian</dt><dd>{formatDuration(durations.resolution)}</dd></div>{ticket.status!=='SELESAI'&&!ticket.archived&&<div><dt>Umur tiket berjalan</dt><dd>{formatDuration(durations.age)}</dd></div>}</dl><p className="small-note">Respons dihitung sampai penerimaan pertama, penyelesaian sampai penanganan selesai. Data waktu yang belum tercatat ditampilkan sebagai Belum tersedia.</p></section>;
}
export function CategoryReview({ticket,role,commit}){
 const [category,setCategory]=useState(ticket.category||''),[reason,setReason]=useState(''),[error,setError]=useState('');
 useEffect(()=>{setCategory(ticket.category||'')},[ticket.id,ticket.category]);
 if(!['admin','officer'].includes(role)||ticket.archived)return null;
 function submit(e){e.preventDefault();setError('');try{if(commit(reviewCategory(ticket,category,reason,role,actorName(role))))setReason('')}catch(err){setError(err.message)}}
 return <section className="panel"><h2>Periksa kategori gangguan</h2><p className="body-copy">Kategori saat ini: <strong>{categoryLabel(ticket)}</strong>. Lengkapi atau koreksi berdasarkan fakta laporan. Client tidak perlu mengisi ulang kategori.</p><form data-local-form="true" onSubmit={submit}><label className="field"><span>Kategori hasil pemeriksaan</span><select value={category} onChange={e=>setCategory(e.target.value)}><option value="">Pilih kategori</option>{TICKET_CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></label><label className="field"><span>Alasan pemeriksaan / koreksi kategori</span><textarea rows={2} value={reason} onChange={e=>setReason(e.target.value)}/></label>{error&&<p role="alert" className="pm-inline-error">{error}</p>}<button className="btn soft" type="submit">Simpan kategori & jejak audit</button></form></section>;
}
export function PriorityEditor({ticket,role,commit,compact=false}){
 const [priority,setPriority]=useState(ticket.priority||'MEDIUM'),[reason,setReason]=useState(''),[error,setError]=useState('');
 if(!(['admin','officer'].includes(role)||role==='technician'&&(availableToTech(ticket,ticket.reviewedServiceStatus||'Aktif')||technicianNames(ticket).includes(actorName(role))))||!ticket.published||ticket.archived)return null;
 function submit(e){e.preventDefault();setError('');try{if(commit(correctPriority(ticket,priority,reason,role,actorName(role))))setReason('')}catch(err){setError(err.message)}}
 return <details className="revision-priority" onClick={e=>e.stopPropagation()}><summary>Ubah Prioritas</summary><form data-local-form="true" onSubmit={submit}><p>{compact?`#${ticket.number}`:'Koreksi prioritas dicatat pada riwayat tiket.'}</p><label className="field"><span>Prioritas baru</span><select value={priority} onChange={e=>setPriority(e.target.value)}>{['CRITICAL','HIGH','MEDIUM','LOW'].map(p=><option key={p}>{p}</option>)}</select></label><label className="field"><span>Alasan Perubahan</span><textarea value={reason} rows={2} onChange={e=>setReason(e.target.value)}/></label>{error&&<p role="alert" className="pm-inline-error">{error}</p>}<button type="submit" className="btn soft">Simpan prioritas</button></form></details>;
}
export function ForbiddenPage({role,Link}){
 return <section className="panel empty"><strong>403 — Akses tidak diizinkan</strong><p>Peran Anda tidak berwenang membuka halaman atau tindakan ini.</p><Link className="btn" to={`/${role}/dashboard`}>Kembali ke beranda</Link></section>;
}
export function ArchivePage({tickets,detail,Link}){
 const [query,setQuery]=useState('');
 if(detail)return null;
 const filtered=tickets.filter(t=>t.archived&&`${t.number} ${t.customer} ${t.title}`.toLowerCase().includes(query.toLowerCase()));
 return <><div className="page-heading"><div><div className="eyebrow">KHUSUS ADMIN</div><h1>Arsip Tiket</h1><p>Seluruh riwayat dipertahankan. Arsip hanya dapat dibaca.</p></div></div><section className="panel"><label className="field"><span>Cari arsip tiket</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Nomor, pelanggan, atau keluhan"/></label><div className="ticket-list">{filtered.map(t=><Link key={t.id} to={`/admin/archives/${t.id}`} className="ticket-card"><div><span className="id-text">#{t.number} · {t.customer}</span><strong>{t.title}</strong><small>Diarsipkan oleh {t.archivedBy||'Admin'} · {t.archivedAt?new Date(t.archivedAt).toLocaleString('id-ID',{timeZone:'Asia/Jakarta'})+' WIB':'Waktu belum tersedia'}</small></div><span className="pm-status">Baca saja</span></Link>)}</div>{!filtered.length&&<p className="pm-empty">Belum ada arsip yang sesuai.</p>}</section></>;
}
