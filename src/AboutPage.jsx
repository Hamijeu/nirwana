import React,{useEffect,useRef} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {PublicHeader,PublicFooter} from './PublicChrome';
import AboutGallery from './AboutGallery';
import CompanyContact from './CompanyContact';
import CompanyStory from './CompanyStory';
import {currentSearch} from './routing';
import useAboutReveal from './useAboutReveal';
import './company-reference.css';
import './company-content.css';
export default function AboutPage({Brand,Link}) {
  const content=useRef(null);useAboutReveal(content);
  const query=currentSearch(window.location,import.meta.env.BASE_URL),queryKey=query.toString();
  useEffect(()=>{const previous=document.title;document.title='Tentang Kami — Nirwana Akses Teknologi';return()=>{document.title=previous}},[]);
  useEffect(()=>{if(query.get('section')!=='kontak')return;const frame=requestAnimationFrame(()=>document.getElementById('kontak')?.scrollIntoView({behavior:'instant'}));return()=>cancelAnimationFrame(frame)},[queryKey]);
  return <div className="company-page public-redesign public-about-page company-about-page"><PublicHeader Brand={Brand} Link={Link} about/>
    <main ref={content} className="public-container about-content">
      <section className="about-story" aria-labelledby="about-title">
        <AboutGallery/>
        <div className="about-story-copy"><h1 id="about-title">Lebih dekat.<br/><em>Lebih terhubung.</em></h1><div className="company-summary-logo about-centered-logo"><img className="summary-logo-light" src={`${import.meta.env.BASE_URL}company-reference/assets/logo-nat-240-BpxM_fM6.webp`} width="240" height="153" alt="Logo PT Nirwana Akses Teknologi"/><img className="summary-logo-dark" src={`${import.meta.env.BASE_URL}company-reference/assets/logo-nat-white-240-BDH65WSx.webp`} width="240" height="153" alt="Logo PT Nirwana Akses Teknologi"/></div></div>
      </section>
      <CompanyStory/>
      <section className="about-network" aria-labelledby="about-network-title"><div className="about-network-heading"><span className="public-kicker">DI BALIK KONEKSI</span><h2 id="about-network-title">Jaringan yang menghubungkan.</h2><p>Dari sambungan fiber optik hingga jaringan di tempat Anda.</p></div><div className="about-network-photos"><figure><img src={`${import.meta.env.BASE_URL}company-reference/assets/fiber-patch-CklqDRti.webp`} alt="sambungan kabel fiber optik pada perangkat jaringan" loading="lazy" width="1600" height="1071"/><figcaption>Sambungan fiber optik </figcaption></figure><figure><img src={`${import.meta.env.BASE_URL}company-reference/assets/access-point-DX8Ns9uF.webp`} alt="access point Wi-Fi yang terpasang pada instalasi jaringan" loading="lazy" width="1600" height="1200"/><figcaption>Koneksi di tempat Anda </figcaption></figure></div></section>
      <section className="about-portal-strip"><div><span className="public-kicker">LAYANAN PELANGGAN</span><h2>Satu portal.<br/>Lebih mudah dikelola.</h2></div><div><p>Kelola layanan dan pantau laporan Anda.</p><Link to="/portal">Jelajahi portal layanan <ArrowUpRight size={17}/></Link></div></section>
      <CompanyContact initialNeed={query.get('need')||''}/>
    </main><PublicFooter Brand={Brand} Link={Link}/>
  </div>;
}
