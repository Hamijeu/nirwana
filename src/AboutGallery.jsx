import React, {useState} from 'react';
import {Pause, Play} from 'lucide-react';
import './about-gallery.css';

const photos=[
  {file:'about-company.jpg',alt:'Dua teknisi berhelm keselamatan menangani kabel jaringan'},
  {file:'about-gallery-1.jpg',alt:'Teknisi melakukan penyambungan kabel jaringan di lapangan'},
  {file:'about-gallery-2.jpg',alt:'Konektor dan kabel pada panel jaringan fiber optik'},
];

export default function AboutGallery() {
  const [paused,setPaused]=useState(false);
  return <figure className="about-story-photo about-gallery" aria-label="Galeri kegiatan teknisi dan jaringan Nirwana">
    <div className={'about-gallery-track'+(paused?' is-paused':'')}>
      {[false,true].map(duplicate=><div className="about-gallery-group" key={String(duplicate)} aria-hidden={duplicate?true:undefined}>
        {photos.map(photo=><img key={photo.file} src={`${import.meta.env.BASE_URL}images/${photo.file}`} alt={duplicate?'':photo.alt} draggable="false" decoding="async"/>)}
      </div>)}
    </div>
    <button type="button" className="about-gallery-toggle" onClick={()=>setPaused(value=>!value)} aria-label={paused?'Putar galeri foto':'Jeda galeri foto'} aria-pressed={paused}>{paused?<Play size={16}/>:<Pause size={16}/>}</button>
  </figure>;
}
