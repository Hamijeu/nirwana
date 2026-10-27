import React, {useEffect,useState} from 'react';
import Pricing from './Pricing';
import {SubscriptionSteps} from './ServiceDiscovery';
import CompanyHeader from './CompanyHeader';
import CompanyHero from './CompanyHero';
import CompanyServices from './CompanyServices';
import CompanyFooter from './CompanyFooter';
import {CompanySummary,CompanyClosingActions} from './CompanyDiscovery';
import CompanyCoverage from './CompanyCoverage';
import './company-content.css';
import './company-reference.css';
export default function CompanyLanding({Brand,Link,onAsk,onNavigate}) {
  const [category,setCategory]=useState('home');
  useEffect(()=>{const previous=document.title;document.title='Nirwana Akses Teknologi — Koneksi untuk keseharian Anda';return()=>{document.title=previous}},[]);
  return <div className="company-page public-redesign company-profile-page" id="beranda">
    <CompanyHeader Link={Link}/>
    <main>
      <CompanyHero Link={Link}/>
      <CompanySummary Link={Link}/>
      <SubscriptionSteps/>
      <Pricing onAsk={onAsk} selectedCategory={category} onCategoryChange={setCategory}/>
      <CompanyServices Link={Link} onAsk={onAsk}/>
      <CompanyCoverage/>
      <CompanyClosingActions Link={Link}/>
    </main>
    <CompanyFooter Link={Link}/>
  </div>;
}
