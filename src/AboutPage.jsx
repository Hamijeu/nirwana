import React,{useEffect} from 'react';
import {ArrowUpRight, House, BriefcaseBusiness, GraduationCap, MessageCircle} from 'lucide-react';
import {PublicHeader,PublicFooter} from './PublicChrome';
export default function AboutPage({Brand,Link}) {
  useEffect(()=>{const previous=document.title;document.title='Tentang Kami — Nirwana Akses Teknologi';return()=>{document.title=previous}},[]);
  return <div className="company-page public-redesign public-about-page"><PublicHeader Brand={Brand} Link={Link} about/>
    <main className="public-container about-content">
      <section className="about-story" aria-labelledby="about-title">
        <figure className="about-story-photo"><img src={`${import.meta.env.BASE_URL}images/home-workspace.jpg`} alt="Ruang bekerja di rumah dengan laptop dan pencahayaan alami" width="1400" height="933" fetchPriority="high"/><figcaption>Foto ilustrasi · George Milton / Pexels</figcaption></figure>
        <div className="about-story-copy"><span className="public-kicker"><span/> TENTANG NIRWANA</span><h1 id="about-title">Lebih dekat.<br/><em>Lebih terhubung.</em></h1><p className="about-lead">Koneksi yang baik dimulai dari memahami kebutuhan Anda.</p><p>PT Nirwana Akses Teknologi menyediakan pilihan internet untuk mendukung aktivitas di rumah, bisnis, dan lingkungan pendidikan.</p><p>Dari belajar dan bekerja hingga mengelola usaha, temukan layanan yang sesuai dengan keseharian Anda.</p><div className="about-audiences" aria-label="Pilihan kebutuhan layanan"><span><House size={17}/> Rumah</span><span><BriefcaseBusiness size={17}/> Bisnis</span><span><GraduationCap size={18}/> Pendidikan</span></div></div>
      </section>
      <section className="about-support" aria-label="Layanan dan informasi kontak"><div className="about-portal"><span className="public-kicker">LAYANAN PELANGGAN</span><h2>Satu portal.<br/>Lebih mudah dikelola.</h2><p>Lihat layanan, sampaikan kendala, dan ikuti perkembangan laporan melalui portal Nirwana.</p><Link to="/portal">Jelajahi portal layanan <ArrowUpRight size={17}/></Link></div><div className="about-contact" id="kontak"><span className="about-contact-icon"><MessageCircle size={23}/></span><span className="public-kicker">HUBUNGI KAMI</span><h2>Mari bicarakan<br/>kebutuhan Anda.</h2><p>Informasi kontak resmi perusahaan sedang menunggu konfirmasi dan akan ditampilkan setelah tersedia.</p><span className="about-contact-status"><span/> Kontak resmi belum tersedia</span></div></section>
    </main><PublicFooter Brand={Brand} Link={Link}/>
  </div>;
}
