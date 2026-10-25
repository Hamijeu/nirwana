import React, {useState} from 'react';
import {ArrowRight, BriefcaseBusiness, Check, House, SlidersHorizontal, Zap} from 'lucide-react';
import {homePlans, businessPlans, formatPrice} from './plans.js';
import './pricing.css';

export default function Pricing({onAsk,selectedCategory,onCategoryChange}) {
  const [localCategory, setLocalCategory] = useState('home');
  const category=selectedCategory??localCategory;
  const setCategory=value=>{setLocalCategory(value);onCategoryChange?.(value)};
  const plans = category === 'home' ? homePlans : businessPlans;
  return <section className="company-section company-pricing" id="layanan"><div className="company-container">
    <div className="company-section-heading"><div><span className="company-eyebrow">PAKET INTERNET</span><h2>Pilih koneksi yang pas untuk Anda.</h2><p>Dari kebutuhan sehari-hari hingga solusi untuk usaha.</p></div><span className="company-demo-label">Harga ilustrasi · Prototype</span></div>
    <div className="pricing-switch" role="group" aria-label="Jenis paket internet">
      <button type="button" aria-pressed={category==='home'} onClick={()=>setCategory('home')}><House size={16}/> Internet Rumah</button>
      <button type="button" aria-pressed={category==='business'} onClick={()=>setCategory('business')}><BriefcaseBusiness size={16}/> Bisnis & Custom</button>
    </div>
    <div className={'pricing-grid '+(category==='home'?'home':'business')}>
      {plans.map(plan=><article className={'pricing-card '+(plan.featured?'featured':'')} key={plan.id}>
        <div className="pricing-card-top"><span className="pricing-icon">{plan.speed?<Zap size={19}/>:<SlidersHorizontal size={19}/>}</span>{plan.featured&&<span className="pricing-popular">Paling populer</span>}</div>
        <h3>{plan.name}</h3><p className="pricing-description">{plan.description}</p>
        <div className="pricing-speed">{plan.speed?<><small>Hingga</small><div><strong>{plan.speed}</strong><span>Mbps</span></div></>:<><small>Dirancang untuk Anda</small><div><strong className="custom-speed">Fleksibel</strong></div></>}</div>
        <div className="pricing-amount">{plan.price?<><strong>{formatPrice(plan.price)}</strong><span>/bulan</span></>:<><strong>Harga custom</strong><span>Sesuai kebutuhan</span></>}</div>
        <ul>{plan.features.map(feature=><li key={feature}><Check size={14}/>{feature}</li>)}</ul>
        <button className={'btn '+(plan.featured?'':'outline')} type="button" onClick={()=>onAsk(`Saya tertarik ${plan.name}. ${plan.price?'Bisa jelaskan paket dan harganya?':'Saya ingin konsultasi paket custom untuk sekolah atau bisnis.'}`)}>{plan.price?'Tanya paket ini':'Konsultasi kebutuhan'}<ArrowRight size={15}/></button>
      </article>)}
    </div>
    <p className="pricing-note">Harga dan kecepatan merupakan contoh untuk desain, bukan penawaran resmi. Harga per bulan belum termasuk pajak dan biaya pemasangan. Layanan mengikuti ketersediaan area.</p>
  </div></section>;
}
