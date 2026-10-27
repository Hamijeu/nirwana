import React,{useEffect,useRef,useState} from 'react';

export default function CompanyCoverage(){
  const frame=useRef(null),[height,setHeight]=useState(950);
  const sendTheme=()=>frame.current?.contentWindow?.postMessage({type:'nirwana-coverage-theme',theme:document.documentElement.dataset.theme},window.location.origin);
  useEffect(()=>{
    const resize=event=>{if(event.origin!==window.location.origin||event.source!==frame.current?.contentWindow||event.data?.type!=='nirwana-coverage-height')return;const value=event.data.height;if(Number.isFinite(value)&&value>=300&&value<=3000)setHeight(value)};
    window.addEventListener('message',resize);
    const observer=new MutationObserver(sendTheme);observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});sendTheme();
    return()=>{window.removeEventListener('message',resize);observer.disconnect()};
  },[]);
  return <section className="company-coverage-section" id="jangkauan" aria-label="Cek jangkauan layanan"><iframe ref={frame} title="Cek jangkauan layanan Nirwana" src={`${import.meta.env.BASE_URL}coverage-map/index.html`} style={{height}} loading="lazy" onLoad={sendTheme} allow="geolocation" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"/></section>;
}
