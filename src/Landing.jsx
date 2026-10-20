import React, {useEffect, useState} from 'react';
import {ArrowRight, BriefcaseBusiness, GraduationCap, House, Menu, MessageCircle, X} from 'lucide-react';
import './landing.css';
import Pricing from './Pricing';

export default function CompanyLanding({Brand,Link,onAsk}){
  const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{const previous=document.title;document.title='Nirwana Akses Teknologi — Pilihan Internet untuk Anda';return()=>{document.title=previous}},[]);
  const closeMenu=()=>setMenuOpen(false);
  return <div className="company-page" id="beranda">
    <header className="company-header"><div className="company-container company-nav">
      <Link to="/" className="company-brand" onClick={closeMenu}><Brand small/></Link>
      <nav className={'company-nav-links'+(menuOpen?' open':'')} aria-label="Navigasi utama">
        <a href="#beranda" onClick={closeMenu}>Beranda</a><a href="#layanan" onClick={closeMenu}>Paket Internet</a><a href="#tentang" onClick={closeMenu}>Tentang</a><a href="#kontak" onClick={closeMenu}>Bantuan</a>
        <div className="company-mobile-actions"><Link to="/login" className="btn" onClick={closeMenu}>Masuk Portal <ArrowRight size={15}/></Link></div>
      </nav>
      <div className="company-nav-actions"><Link to="/login" className="btn">Masuk Portal <ArrowRight size={15}/></Link></div>
      <button className="company-menu-button" type="button" aria-label={menuOpen?'Tutup menu':'Buka menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
    </div></header>

    <main>
      <section className="company-hero"><div className="company-container company-hero-content">
        <span className="company-eyebrow"><span/> PT NIRWANA AKSES TEKNOLOGI</span>
        <h1>Internet yang pas untuk <em>setiap kebutuhan.</em></h1>
        <p>Konektivitas untuk rumah, bisnis, dan sekolah. Hubungi tim kami untuk membahas kebutuhan layanan Anda.</p>
        <div className="company-hero-actions"><a href="#layanan" className="btn">Lihat paket <ArrowRight size={17}/></a></div>
        <div className="company-hero-categories"><span><House size={15}/> Rumah</span><span><BriefcaseBusiness size={15}/> Bisnis</span><span><GraduationCap size={15}/> Sekolah</span></div>
      </div></section>

      <Pricing onAsk={onAsk}/>

      <section className="company-summary" id="tentang"><div className="company-container company-summary-grid">
        <div className="company-summary-copy"><span className="company-eyebrow">TENTANG NIRWANA</span><h2>Koneksi untuk keseharian Anda.</h2><p>PT Nirwana Akses Teknologi menyediakan pilihan internet untuk rumah, bisnis, dan sekolah, dengan bantuan pelanggan dalam satu portal.</p></div>
        <div className="company-help-inline" id="kontak"><span className="company-eyebrow">ADA PERTANYAAN?</span><h3>Kami bantu memilih paket.</h3><p>Tanyakan harga, kebutuhan koneksi, atau area pemasangan lewat Nira.</p><button type="button" className="company-help-link" onClick={()=>onAsk('Saya ingin bertanya tentang paket dan area pemasangan.')}><MessageCircle size={16}/> Tanya Nira <ArrowRight size={15}/></button></div>
      </div></section>
    </main>

    <footer className="company-footer"><div className="company-container company-footer-inner"><div><Brand small/><p>PT Nirwana Akses Teknologi · Koneksi untuk rumah, bisnis, dan sekolah.</p></div><nav aria-label="Navigasi footer"><a href="#layanan">Paket Internet</a><a href="#tentang">Tentang</a><a href="#kontak">Bantuan</a></nav></div><div className="company-container company-footer-bottom"><span>© 2026 PT Nirwana Akses Teknologi. Hak Cipta Dilindungi.</span><span>Prototype UI/UX</span></div></footer>
  </div>;
}
