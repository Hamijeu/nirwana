import React,{useEffect,useState} from 'react';
import {Menu,X} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import {scrollToPublicSection} from './PublicChrome';
import AboutPreview from './AboutPreview';

export default function CompanyHeader({Link}) {
  const [open,setOpen]=useState(false);
  const [solid,setSolid]=useState(()=>window.scrollY>40);
  const [hidden,setHidden]=useState(false);
  const [aboutOpen,setAboutOpen]=useState(false);
  useEffect(()=>{
    let previous=window.scrollY;
    const hero=document.querySelector('.company-hero-scroll');
    const scroll=()=>{
      const y=Math.max(0,window.scrollY);setSolid(y>40);
      if(y<80||(hero&&hero.getBoundingClientRect().bottom>0&&hero.dataset.copyHidden!=='true')){setHidden(false);previous=y;}
      else if(Math.abs(y-previous)>4){setHidden(y>previous);previous=y;}
    };
    const heroVisibility=event=>{setHidden(event.detail.hidden&&window.scrollY>=previous);};
    const dismiss=event=>{if(event.key==='Escape'){setOpen(false);setAboutOpen(false)}};
    window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('keydown',dismiss);
    hero?.addEventListener('hero-copy-visibility',heroVisibility);
    return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('keydown',dismiss);hero?.removeEventListener('hero-copy-visibility',heroVisibility)};
  },[]);
  const section=(event,id)=>{scrollToPublicSection(event,id);setOpen(false);setAboutOpen(false)};
  const close=()=>{setOpen(false);setAboutOpen(false)};
  const opaque=solid||open;
  return <header className={`company-profile-header${opaque?' is-solid':''}${hidden&&!open&&!aboutOpen?' is-hidden':''}`}>
    <div className="company-header-inner">
      <Link to="/" aria-label="Nirwana — company profile" onClick={close}><img src={`${import.meta.env.BASE_URL}company-reference/assets/${opaque?'logo-nat-240-BpxM_fM6.webp':'logo-nat-white-240-BDH65WSx.webp'}`} width="240" height="153" alt="PT Nirwana Akses Teknologi"/></Link>
      <nav id="company-navigation" className={open?'is-open':''} aria-label="Navigasi utama">
        <a href="#layanan-nirwana" onClick={event=>section(event,'layanan-nirwana')}>Layanan</a>
        <a href="#layanan" onClick={event=>section(event,'layanan')}>Paket</a>
        <AboutPreview Link={Link} open={aboutOpen} onOpenChange={setAboutOpen} onNavigate={close}/>
        <Link to="/portal" onClick={close}>Portal layanan</Link>
      </nav>
      <div className="company-header-controls"><ThemeToggle/><Link className="company-header-login" to="/login" onClick={close}>Masuk</Link><button type="button" className="company-header-menu" aria-label={open?'Tutup menu':'Buka menu'} aria-controls="company-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>
    </div>
  </header>;
}
