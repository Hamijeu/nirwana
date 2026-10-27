import React from 'react';
import {ArrowUpRight} from 'lucide-react';
import AboutGallery from './AboutGallery';

export function CompanySummary({Link}){
  return <section className="public-container company-introduction" aria-labelledby="company-introduction-title"><div className="company-introduction-brand"><span className="public-kicker">PT NIRWANA AKSES TEKNOLOGI</span><h2 id="company-introduction-title">Kenali Nirwana.</h2><div className="company-summary-logo"><img className="summary-logo-light" src={`${import.meta.env.BASE_URL}company-reference/assets/logo-nat-240-BpxM_fM6.webp`} width="240" height="153" alt="Logo PT Nirwana Akses Teknologi"/><img className="summary-logo-dark" src={`${import.meta.env.BASE_URL}company-reference/assets/logo-nat-white-240-BDH65WSx.webp`} width="240" height="153" alt="Logo PT Nirwana Akses Teknologi"/></div></div><div className="company-introduction-gallery"><AboutGallery/><Link to="/tentang-kami">Lebih dekat dengan kami <ArrowUpRight size={17}/></Link></div></section>;
}

export function CompanyClosingActions({Link}){
  return <section className="public-container company-closing-actions" aria-label="Portal pelanggan dan konsultasi"><article className="company-closing-portal"><span className="public-kicker">UNTUK PELANGGAN</span><h2>Sudah berlangganan?</h2><p>Kelola layanan, laporkan gangguan, dan pantau penanganannya melalui satu portal.</p><Link to="/portal" className="company-orange-button">Buka portal layanan <ArrowUpRight size={17}/></Link></article><article className="company-closing-contact"><span className="public-kicker">MULAI PERCAKAPAN</span><h2>Mari bicarakan<br/>kebutuhan Anda.</h2><p>Konsultasikan layanan atau temukan alamat kantor kami.</p><Link to="/tentang-kami?section=kontak" className="company-orange-button">Hubungi Nirwana <ArrowUpRight size={17}/></Link></article></section>;
}
