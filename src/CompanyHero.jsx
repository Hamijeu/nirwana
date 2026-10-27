import React,{useEffect,useRef,useState} from 'react';
import {Pause,Play} from 'lucide-react';
import {scrollToPublicSection} from './PublicChrome';
import useHeroScroll from './useHeroScroll';

export default function CompanyHero({Link}) {
  const video=useRef(null);
  const wrapper=useRef(null),media=useRef(null),content=useRef(null);
  useHeroScroll(wrapper,media,content);
  const [paused,setPaused]=useState(true);
  useEffect(()=>{
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{if(motion.matches)video.current?.pause();else video.current?.play().catch(()=>setPaused(true))};
    sync();motion.addEventListener('change',sync);
    return()=>motion.removeEventListener('change',sync);
  },[]);
  const toggle=()=>{if(video.current?.paused)video.current.play().catch(()=>setPaused(true));else video.current?.pause()};
  const assets=`${import.meta.env.BASE_URL}company-reference/assets/`;
  return <div ref={wrapper} className="company-hero-scroll"><section className="public-hero company-video-hero" aria-labelledby="company-hero-title">
    <div ref={media} className="company-hero-media">
    <video ref={video} src={`${assets}hero-loop-D7J1NpWK.mp4`} poster={`${assets}hero-poster-DbAyCSDN.webp`} width="1280" height="720" muted loop playsInline preload="metadata" aria-hidden="true" onPlay={()=>setPaused(false)} onPause={()=>setPaused(true)}/>
    <div className="company-hero-shade" aria-hidden="true"/>
    <button className="company-hero-video-toggle" type="button" onClick={toggle} aria-label={paused?'Putar video':'Jeda video'}>{paused?<Play size={19}/>:<Pause size={19}/>}</button>
    </div>
    <div ref={content} className="company-hero-content"><div className="company-hero-message"><h1 id="company-hero-title">Internet sampai<br/>ke alamat Anda.</h1><p>Internet untuk rumah, bisnis, dan pendidikan.<br/>Koneksi sesuai kebutuhan Anda.</p><div className="company-hero-actions"><a href="#layanan" className="company-hero-primary" onClick={event=>scrollToPublicSection(event,'layanan')}>Lihat paket</a><Link to="/tentang-kami">Tentang Nirwana</Link></div></div>
      <dl className="company-hero-details"><div><dt>Untuk rumah</dt><dd>Koneksi sehari-hari</dd></div><div><dt>Untuk usaha</dt><dd>Bisnis &amp; custom</dd></div><div><dt>Layanan pelanggan</dt><dd>Portal layanan</dd></div></dl>
    </div>
  </section></div>;
}
