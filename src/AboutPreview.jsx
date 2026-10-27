import React,{useEffect,useId,useRef} from 'react';
import {ArrowUpRight,ChevronDown} from 'lucide-react';

export default function AboutPreview({Link,open,onOpenChange,onNavigate}){
  const root=useRef(null),trigger=useRef(null),timer=useRef(null),hoverOpened=useRef(false),id=useId();
  const cancelClose=()=>{if(timer.current)clearTimeout(timer.current)};
  useEffect(()=>{
    const outside=event=>{if(!root.current?.contains(event.target))onOpenChange(false)};
    const escape=event=>{if(event.key==='Escape'){event.stopPropagation();onOpenChange(false);trigger.current?.focus({preventScroll:true})}};
    if(open){document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape)}
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)};
  },[open,onOpenChange]);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
  const close=()=>{onOpenChange(false);onNavigate?.()};
  return <div ref={root} className="company-about-disclosure" onPointerEnter={event=>{cancelClose();if(event.pointerType==='mouse'&&window.matchMedia('(hover: hover)').matches){hoverOpened.current=!open;onOpenChange(true)}}} onPointerLeave={event=>{if(event.pointerType==='mouse'){cancelClose();timer.current=setTimeout(()=>onOpenChange(false),160)}}}>
    <button ref={trigger} type="button" className="company-about-trigger" aria-expanded={open} aria-controls={id} onClick={()=>{cancelClose();if(hoverOpened.current){hoverOpened.current=false;onOpenChange(true)}else onOpenChange(!open)}}>Tentang kami <ChevronDown size={15}/></button>
    {open&&<div id={id} className="floating-about-panel" role="region" aria-label="Preview Tentang Kami">
      <div className="floating-about-intro"><span className="public-kicker">KENALI NIRWANA</span><h2>Lebih dekat.<br/>Lebih terhubung.</h2><p>Koneksi sesuai kebutuhan Anda.</p></div>
      <img className="floating-about-photo" src={`${import.meta.env.BASE_URL}images/about-gallery-1.jpg`} alt="Teknisi melakukan penyambungan kabel jaringan" width="528" height="960"/>
      <div className="floating-about-detail"><h3>Dari pemasangan<br/>sampai perbaikan.</h3><p>Kenali perusahaan, cara kami melayani, dan tim di balik koneksi Anda.</p><Link to="/tentang-kami" onClick={close}>Lihat lebih lengkap <ArrowUpRight size={18}/></Link></div>
    </div>}
  </div>;
}
