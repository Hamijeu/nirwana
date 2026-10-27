import React from 'react';
import {ArrowUpRight, Headphones, PanelsTopLeft} from 'lucide-react';

export default function CompanyServices({Link, onAsk}) {
  return <section className="public-container company-services" id="layanan-nirwana" aria-labelledby="company-services-title">
    <div className="company-services-heading"><span className="public-kicker">LAYANAN NIRWANA</span><h2 id="company-services-title">Terhubung. Terbantu.</h2></div>
    <div className="company-services-grid">
      <article><span className="company-service-icon"><Headphones size={23}/></span><h3>Penanganan gangguan</h3><p>Laporkan kendala dan pantau penanganannya melalui portal layanan.</p><Link to="/portal">Buka portal layanan <ArrowUpRight size={17}/></Link></article>
      <article><span className="company-service-icon"><PanelsTopLeft size={23}/></span><h3>Website dan sistem</h3><p>Website dan sistem informasi yang disesuaikan dengan kebutuhan usaha Anda.</p><button type="button" onClick={()=>onAsk('Saya ingin berkonsultasi tentang pembuatan website dan sistem informasi.')}>Diskusikan kebutuhan <ArrowUpRight size={17}/></button></article>
    </div>
  </section>;
}
