import React, {useEffect, useState} from 'react';
import {ArrowRight, Menu, X} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './public-design.css';
export function scrollToPublicSection(event,id) {
  // Preserve the hash route used by GitHub Pages when following an in-page link.
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
export function PublicHeader({Brand, Link, portal=false, about=false, auth=false}) {
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  const section=(event,id)=>{scrollToPublicSection(event,id);close();};
  useEffect(()=>{if(!open)return;const dismiss=event=>{if(event.key==='Escape')setOpen(false)};window.addEventListener('keydown',dismiss);return()=>window.removeEventListener('keydown',dismiss)},[open]);
  return <header className="public-header"><div className="public-container public-header-inner">
    <Link to="/" onClick={close} aria-label="Nirwana — company profile"><Brand small/></Link>
    <nav id="public-navigation" className={'public-navigation'+(open?' is-open':'')} aria-label="Navigasi utama">
      {portal?<><Link to="/" onClick={close}>Company Profile</Link>{auth?<><Link to="/portal?section=panduan" onClick={close}>Panduan layanan</Link></>:<><a href="#panduan" onClick={event=>section(event,'panduan')}>Panduan layanan</a></>}</>:<>{about?<Link to="/" onClick={close}>Beranda</Link>:<a href="#layanan" onClick={event=>section(event,'layanan')}>Paket Internet</a>}<Link to="/tentang-kami" onClick={close} aria-current={about?'page':undefined}>Tentang Kami</Link><Link to="/portal" className="public-portal-link" onClick={close}>Portal Layanan <ArrowRight size={16}/></Link></>}
    </nav>
    <div className="public-header-controls"><ThemeToggle/><button className="public-menu" aria-controls="public-navigation" aria-expanded={open} aria-label={open?'Tutup menu':'Buka menu'} onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button></div>
  </div></header>;
}
export function PublicFooter({portal=false, children}) {
  return <footer className="public-footer"><div className="public-container public-footer-inner"><p>PT Nirwana Akses Teknologi<br/><span>{portal?'Portal layanan pelanggan':'Koneksi untuk keseharian Anda.'}</span></p><div className="public-footer-links">{children}<small>© 2026 Nirwana · Prototype UI/UX</small></div></div></footer>;
}

export function AccessHelp({Link,login=false,verification=false}) {
  return <div className="access-help-inline" id={login?undefined:'bantuan-akses'}><strong>{verification?'Perlu bantuan verifikasi?':'Kesulitan mengakses akun?'}</strong><p>{verification?'Pastikan nomor WhatsApp Anda sudah terdaftar.':login?'Gunakan pemulihan akses di atas.':'Pulihkan akses melalui halaman login.'} Kontak bantuan resmi akan ditampilkan setelah dikonfirmasi.</p>{!login&&!verification&&<Link to="/forgot-password">Pulihkan akses akun <ArrowRight size={13}/></Link>}</div>;
}
