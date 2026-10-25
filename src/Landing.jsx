import React, {useEffect,useState} from 'react';
import {ArrowRight, Wifi} from 'lucide-react';
import Pricing from './Pricing';
import {SubscriptionSteps} from './ServiceDiscovery';
import {PublicHeader,PublicFooter,scrollToPublicSection} from './PublicChrome';
export default function CompanyLanding({Brand,Link,onAsk}) {
  const [category,setCategory]=useState('home');
  useEffect(()=>{const previous=document.title;document.title='Nirwana Akses Teknologi — Koneksi untuk keseharian Anda';return()=>{document.title=previous}},[]);
  return <div className="company-page public-redesign" id="beranda">
    <PublicHeader Brand={Brand} Link={Link}/>
    <main>
      <section className="public-container public-hero">
        <div className="public-hero-copy"><span className="public-kicker">TERHUBUNG BERSAMA NIRWANA</span><h1>Koneksi yang<br/>membawa Anda<br/><em>lebih jauh.</em></h1><p>Internet untuk rumah dan usaha Anda.</p><a className="btn public-primary" href="#layanan" onClick={event=>scrollToPublicSection(event,'layanan')}>Temukan paket Anda <ArrowRight size={18}/></a></div>
        <figure className="public-hero-image"><img src={`${import.meta.env.BASE_URL}images/home-workspace.jpg`} alt="Suasana bekerja menggunakan laptop di rumah yang terang dengan tanaman di sekitar meja" width="1400" height="933" fetchPriority="high"/><figcaption><span className="public-photo-icon"><Wifi size={22}/></span><div><strong>Ruang Anda. Kemungkinan baru.</strong><span>Koneksi untuk hal-hal yang berarti.</span></div></figcaption><span className="public-photo-credit">Foto ilustrasi · George Milton / Pexels</span></figure>
      </section>
      <Pricing onAsk={onAsk} selectedCategory={category} onCategoryChange={setCategory}/>
      <SubscriptionSteps/>
    </main>
    <PublicFooter Brand={Brand} Link={Link}/>
  </div>;
}
