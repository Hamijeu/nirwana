import React,{useRef,useState} from 'react';
import useSubscriptionScroll from './useSubscriptionScroll';

export function SubscriptionSteps() {
  const [active,setActive]=useState(0);
  const section=useRef(null),select=useSubscriptionScroll(section,setActive);
  const steps=[
    {title:'Ceritakan kebutuhan',text:'Pilih kebutuhan rumah atau usaha, lalu diskusikan paket yang sesuai.',photo:'images/home-workspace.jpg',alt:'Pelanggan menggunakan laptop untuk aktivitas dari rumah'},
    {title:'Konfirmasi lokasi',text:'Sampaikan alamat agar ketersediaan layanan dan kebutuhan pemasangan dapat diperiksa.',photo:'images/installation-location.svg',alt:'Pin lokasi rumah pada peta untuk pemeriksaan alamat'},
    {title:'Jadwalkan pemasangan',text:'Sepakati layanan dan waktu pemasangan bersama tim Nirwana.',photo:'images/about-gallery-1.jpg',alt:'Teknisi menyiapkan sambungan kabel jaringan'},
    {title:'Aktif dan terpantau',text:'Kelola layanan dan pantau laporan gangguan melalui portal pelanggan.',photo:'images/service-monitoring.svg',alt:'Layar pemantauan jaringan dengan status layanan dan laporan'},
  ];
  return <section ref={section} className="subscription-section company-subscription" aria-labelledby="subscription-title"><div className="subscription-pin"><div className="public-container subscription-layout"><div><span className="public-kicker">CARA BERLANGGANAN</span><h2 id="subscription-title">Dari kebutuhan Anda<br/>sampai terhubung.</h2><ol className="subscription-timeline">{steps.map((step,index)=><li key={step.title}><button type="button" aria-pressed={active===index} onClick={()=>select(index)}><span>0{index+1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></button></li>)}</ol></div><figure className="subscription-visual">{steps.map((step,index)=><div key={step.photo} className={`subscription-slide${index<=active?' is-revealed':''}${index===active?' is-current':''}`} aria-hidden={index!==active}><img src={`${import.meta.env.BASE_URL}${step.photo}`} alt={step.alt} loading="lazy" width="1600" height="1100"/></div>)}<figcaption key={active}><span>0{active+1} · LANGKAH BERLANGGANAN</span><strong>{steps[active].title}</strong></figcaption></figure></div></div></section>;
}
