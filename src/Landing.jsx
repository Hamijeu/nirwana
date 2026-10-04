import React, {useEffect, useState} from 'react';
import {ArrowRight, BriefcaseBusiness, Check, GraduationCap, House, Mail, MapPin, Menu, Send, Wifi, X} from 'lucide-react';
import './landing.css';

const reportUrl='/login?next=%2Fclient%2Ftickets%2Fcreate';
const plans=[
  {name:'Internet Rumah',description:'Koneksi untuk bekerja, belajar, dan menikmati hiburan di rumah.',icon:House},
  {name:'Internet Bisnis',description:'Konektivitas untuk kebutuhan operasional usaha.',icon:BriefcaseBusiness,featured:true},
  {name:'Internet Sekolah',description:'Dukungan internet untuk kegiatan belajar dan ruang digital sekolah.',icon:GraduationCap},
];

function PlanCard({plan}){
  const Icon=plan.icon;
  return <article className={'company-plan'+(plan.featured?' featured':'')}>
    <div className="company-plan-top"><span className="company-plan-icon"><Icon size={21}/></span>{plan.featured&&<span className="company-plan-tag">Pilihan populer</span>}</div>
    <h3>{plan.name}</h3><p>{plan.description}</p>
    <a className={'btn '+(plan.featured?'':'outline')} href="#kontak">Tanya layanan <ArrowRight size={16}/></a>
  </article>;
}

export default function CompanyLanding({Brand,Link}){
  const [menuOpen,setMenuOpen]=useState(false);
  const [sent,setSent]=useState(false);
  useEffect(()=>{const previous=document.title;document.title='Nirwana Akses Teknologi — Pilihan Internet untuk Anda';return()=>{document.title=previous}},[]);
  const closeMenu=()=>setMenuOpen(false);
  return <div className="company-page" id="beranda">
    <header className="company-header"><div className="company-container company-nav">
      <Link to="/" className="company-brand" onClick={closeMenu}><Brand small/></Link>
      <nav className={'company-nav-links'+(menuOpen?' open':'')} aria-label="Navigasi utama">
        <a href="#beranda" onClick={closeMenu}>Beranda</a><a href="#layanan" onClick={closeMenu}>Layanan</a><a href="#tentang" onClick={closeMenu}>Tentang Kami</a><a href="#kelebihan" onClick={closeMenu}>Kelebihan</a><a href="#bantuan" onClick={closeMenu}>Bantuan</a><a href="#kontak" onClick={closeMenu}>Kontak</a>
        <div className="company-mobile-actions"><Link to="/login" className="btn outline" onClick={closeMenu}>Masuk Portal</Link><Link to={reportUrl} className="btn" onClick={closeMenu}>Laporkan Gangguan</Link></div>
      </nav>
      <div className="company-nav-actions"><Link to="/login" className="company-nav-login">Masuk Portal</Link><Link to={reportUrl} className="btn">Laporkan Gangguan</Link></div>
      <button className="company-menu-button" type="button" aria-label={menuOpen?'Tutup menu':'Buka menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
    </div></header>

    <main>
      <section className="company-hero"><div className="company-container company-hero-content">
        <span className="company-eyebrow"><span/> PT NIRWANA AKSES TEKNOLOGI</span>
        <h1>Internet yang pas untuk <em>setiap kebutuhan.</em></h1>
        <p>Konektivitas untuk rumah, bisnis, dan sekolah. Hubungi tim kami untuk membahas kebutuhan layanan Anda.</p>
        <div className="company-hero-actions"><a href="#layanan" className="btn">Lihat layanan <ArrowRight size={17}/></a><Link to="/login" className="btn outline">Masuk Portal Pelanggan</Link></div>
        <div className="company-hero-categories"><span><House size={15}/> Rumah</span><span><BriefcaseBusiness size={15}/> Bisnis</span><span><GraduationCap size={15}/> Sekolah</span></div>
      </div></section>

      <section className="company-section company-pricing" id="layanan"><div className="company-container">
        <div className="company-section-heading"><div><span className="company-eyebrow">LAYANAN</span><h2>Koneksi untuk berbagai kebutuhan.</h2><p>Pilih jenis layanan yang ingin Anda diskusikan dengan tim Nirwana.</p></div></div>
        <div className="company-plan-grid">{plans.map(plan=><PlanCard key={plan.name} plan={plan}/>)}</div>
      </div></section>

      <section className="company-section company-about" id="tentang"><div className="company-container company-about-grid">
        <div className="company-about-copy"><span className="company-eyebrow">TENTANG NIRWANA</span><h2>Koneksi yang mendukung langkah Anda.</h2><p>PT Nirwana Akses Teknologi membantu kebutuhan konektivitas rumah, bisnis, dan lingkungan pendidikan. Portal pelanggan memudahkan pelaporan gangguan dan pemantauan penanganan.</p><a href="#kontak" className="company-text-link">Hubungi tim kami <ArrowRight size={16}/></a></div>
        <div className="company-portal-card"><span className="company-portal-icon"><Wifi size={22}/></span><div><small>SUDAH MENJADI PELANGGAN?</small><h3>Semua layanan dalam satu portal.</h3><p>Lihat layanan Anda, laporkan gangguan, dan pantau progres tiket tanpa harus mencari informasi di tempat lain.</p><Link to="/login" className="btn">Buka Portal Pelanggan <ArrowRight size={16}/></Link></div></div>
      </div></section>

      <section className="company-section company-steps" id="kelebihan"><div className="company-container"><div className="company-section-heading"><div><span className="company-eyebrow">KENAPA NIRWANA</span><h2>Layanan dan bantuan dalam satu tempat.</h2></div></div><div className="company-step-grid"><div><strong>01</strong><h3>Pilihan sesuai kebutuhan</h3><p>Jelajahi layanan untuk rumah, bisnis, dan sekolah.</p></div><div><strong>02</strong><h3>Portal pelanggan</h3><p>Lihat layanan aktif dan riwayat laporan Anda.</p></div><div><strong>03</strong><h3>Progres terlihat</h3><p>Pantau status gangguan melalui timeline tiket.</p></div></div></div></section>

      <section className="company-section company-report" id="bantuan"><div className="company-container company-report-grid"><div><span className="company-eyebrow">BANTUAN PELANGGAN</span><h2>Melaporkan gangguan, langkah demi langkah.</h2><p>Masuk ke portal, pilih layanan yang bermasalah, lalu kirim penjelasan. Status penanganan dapat dilihat pada tiket Anda.</p><Link to={reportUrl} className="btn">Laporkan gangguan <ArrowRight size={16}/></Link></div><div className="company-report-note"><span className="company-eyebrow">TESTIMONIAL</span><p>“Portal yang memudahkan pelanggan melihat laporan dan progres penanganan.”</p><small>Contoh narasi untuk desain · menunggu testimoni pelanggan yang disetujui</small></div></div></section>

      <section className="company-section company-contact" id="kontak"><div className="company-container company-contact-grid">
        <div className="company-contact-copy"><span className="company-eyebrow">HUBUNGI KAMI</span><h2>Butuh informasi lebih lanjut?</h2><p>Ceritakan kebutuhan konektivitas Anda. Form di samping menunjukkan alur kontak untuk prototype ini.</p><div className="company-contact-placeholder"><span><Mail size={16}/> Email resmi belum dicantumkan</span><span><MapPin size={16}/> Alamat kantor belum dicantumkan</span></div></div>
        <div className="company-contact-box">{sent?<div className="company-contact-success" role="status"><span><Check size={25}/></span><h3>Pesan contoh tercatat</h3><p>Ini hanya simulasi. Pesan tidak dikirim ke Nirwana.</p><button className="btn outline" type="button" onClick={()=>setSent(false)}>Tulis pesan lain</button></div>:<form className="company-contact-form" onSubmit={event=>{event.preventDefault();setSent(true)}}><h3>Kirim pertanyaan</h3><label>Nama lengkap<input required name="name" autoComplete="name" placeholder="Nama Anda"/></label><label>Nomor WhatsApp<input required name="phone" type="tel" inputMode="tel" minLength={9} placeholder="08xx xxxx xxxx"/></label><label>Pesan<textarea required name="message" rows={3} placeholder="Apa yang ingin Anda tanyakan?"/></label><button type="submit" className="btn">Kirim Pesan <Send size={15}/></button><small>Simulasi UI/UX · Tidak ada pesan yang dikirim</small></form>}</div>
      </div></section>
    </main>

    <footer className="company-footer"><div className="company-container company-footer-inner"><div><Brand small/><p>PT Nirwana Akses Teknologi · Koneksi untuk rumah, bisnis, dan sekolah.</p></div><nav aria-label="Navigasi footer"><a href="#layanan">Layanan</a><a href="#tentang">Tentang</a><a href="#kontak">Kontak</a><Link to="/login">Portal Pelanggan</Link></nav></div><div className="company-container company-footer-bottom"><span>© 2026 PT Nirwana Akses Teknologi. Hak Cipta Dilindungi.</span><span>Prototype UI/UX</span></div></footer>
  </div>;
}
