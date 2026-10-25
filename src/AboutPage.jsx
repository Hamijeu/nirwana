import React,{useEffect} from 'react';
import {ArrowUpRight, House, BriefcaseBusiness, GraduationCap, MessageCircle} from 'lucide-react';
import {PublicHeader,PublicFooter} from './PublicChrome';
import AboutGallery from './AboutGallery';
export default function AboutPage({Brand,Link}) {
  useEffect(()=>{const previous=document.title;document.title='Tentang Kami — Nirwana Akses Teknologi';return()=>{document.title=previous}},[]);
  return <div className="company-page public-redesign public-about-page"><PublicHeader Brand={Brand} Link={Link} about/>
    <main className="public-container about-content">
      <section className="about-story" aria-labelledby="about-title">
        <AboutGallery/>
        <div className="about-story-copy"><span className="public-kicker"><span/> TENTANG NIRWANA</span><h1 id="about-title">Lebih dekat.<br/><em>Lebih terhubung.</em></h1><p className="about-lead">Koneksi sesuai kebutuhan Anda.</p><p>Internet untuk rumah, bisnis, dan pendidikan.</p><div className="about-audiences" aria-label="Pilihan kebutuhan layanan"><span><House size={17}/> Rumah</span><span><BriefcaseBusiness size={17}/> Bisnis</span><span><GraduationCap size={18}/> Pendidikan</span></div></div>
      </section>
      <section className="about-support" aria-label="Layanan dan informasi kontak"><div className="about-portal"><span className="public-kicker">LAYANAN PELANGGAN</span><h2>Satu portal.<br/>Lebih mudah dikelola.</h2><p>Kelola layanan dan pantau laporan Anda.</p><Link to="/portal">Jelajahi portal layanan <ArrowUpRight size={17}/></Link></div><div className="about-contact" id="kontak"><span className="about-contact-icon"><MessageCircle size={23}/></span><span className="public-kicker">HUBUNGI KAMI</span><h2>Mari bicarakan<br/>kebutuhan Anda.</h2><p>Kontak resmi akan segera tersedia.</p><span className="about-contact-status"><span/> Kontak resmi belum tersedia</span></div></section>
    </main><PublicFooter Brand={Brand} Link={Link}/>
  </div>;
}
