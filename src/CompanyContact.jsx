import React,{useEffect,useState} from 'react';
import {ArrowUpRight,MapPin,Clock3} from 'lucide-react';
import {publicContact,preparePublicInquiry} from './publicContact';

export default function CompanyContact({initialNeed=''}){
  const [name,setName]=useState(''),[need,setNeed]=useState(initialNeed),[draft,setDraft]=useState(null);
  const [mapLoaded,setMapLoaded]=useState(false),[mapSlow,setMapSlow]=useState(false);
  useEffect(()=>{const timer=setTimeout(()=>setMapSlow(true),12000);return()=>clearTimeout(timer)},[]);
  const submit=event=>{event.preventDefault();setDraft(preparePublicInquiry(name,need))};
  return <section className="company-contact-full" id="kontak" aria-labelledby="company-contact-title">
    <div className="company-contact-form"><span className="public-kicker">HUBUNGI NIRWANA</span><h2 id="company-contact-title">Ceritakan kebutuhan<br/>internet Anda.</h2><p>Mulai dari alamat dan kebutuhan Anda. Kami bantu membicarakan pilihan layanan yang sesuai.</p>
      <form onSubmit={submit}><label htmlFor="inquiry-name">Nama Anda</label><input id="inquiry-name" autoComplete="name" value={name} maxLength={100} required placeholder="Nama Anda" onChange={event=>{setName(event.target.value);setDraft(null)}}/>
        <label htmlFor="inquiry-need">Kebutuhan Anda</label><textarea id="inquiry-need" value={need} maxLength={1500} required rows={3} placeholder="Misalnya, pasang internet untuk rumah di…" onChange={event=>{setNeed(event.target.value);setDraft(null)}}/>
        <button type="submit" className="company-orange-button">Siapkan pesan <ArrowUpRight size={16}/></button>
      </form>
      {draft?.error&&<p role="alert">{draft.error}</p>}
      {draft?.message&&<div className="company-inquiry-preview" role="region" aria-label="Pratinjau pesan"><strong>Pesan Anda</strong><p>{draft.message}</p><a className="company-orange-button" href={draft.href} target="_blank" rel="noopener noreferrer">Buka WhatsApp <ArrowUpRight size={16}/></a><small>Pesan baru terkirim setelah Anda menekan kirim di WhatsApp.</small></div>}
      <div className="company-contact-channels"><a href={`tel:+${publicContact.whatsapp}`}>{publicContact.phone}</a><a href={`mailto:${publicContact.email}`}>{publicContact.email}</a></div>
    </div>
    <div className="company-office-card"><div className="company-office-map"><iframe title="Lokasi kantor Nirwana di Google Maps" src={publicContact.mapEmbed} loading="lazy" onLoad={()=>setMapLoaded(true)} referrerPolicy="no-referrer-when-downgrade"/>{!mapLoaded&&<div className="company-map-loading"><MapPin size={30}/><strong>Lokasi kantor Nirwana</strong><span>{mapSlow?'Lihat lokasi melalui Google Maps.':'Memuat peta kantor…'}</span><a href={publicContact.maps} target="_blank" rel="noopener noreferrer">Buka peta <ArrowUpRight size={15}/></a></div>}</div><div className="company-office-details"><h3>Kunjungi kantor kami.</h3><p><MapPin size={18}/><span>{publicContact.address}</span></p><p><Clock3 size={18}/><span>{publicContact.hours}</span></p><a href={publicContact.maps} target="_blank" rel="noopener noreferrer">Buka di Google Maps <ArrowUpRight size={16}/></a></div></div>
  </section>;
}
