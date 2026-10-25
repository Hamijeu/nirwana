import React, {useState} from 'react';
import {ArrowRight, MapPin, ClipboardList, CalendarCheck, CheckCircle2} from 'lucide-react';

export function ServiceDiscovery() {
  const [message,setMessage]=useState('');
  return <section className="public-container service-discovery" aria-labelledby="discovery-title">
    <div className="discovery-location">
      <div><span className="public-kicker">MULAI DARI LOKASI ANDA</span><h2 id="discovery-title">Koneksi dekat.<br/><em>Kemungkinan luas.</em></h2><p>Temukan paket untuk rumah atau usaha Anda.</p><span className="discovery-location-note"><MapPin size={15}/> Ketersediaan perlu dikonfirmasi tim Nirwana.</span></div>
      <form className="coverage-form" onSubmit={event=>{event.preventDefault();setMessage('Lokasi telah diisi. Ini hanya simulasi; cakupan jaringan belum diperiksa dan alamat tidak dikirim.')}}>
        <div className="coverage-heading"><MapPin size={20}/><h3>Cek lokasi pemasangan</h3><span>Simulasi</span></div>
        <label htmlFor="coverage-city">Kota / Kabupaten</label><input id="coverage-city" name="city" placeholder="Contoh: Bireuen, Aceh" required maxLength={100} onChange={()=>setMessage('')}/>
        <label htmlFor="coverage-address">Jalan / Gedung / Perumahan</label><input id="coverage-address" name="address" placeholder="Masukkan lokasi pemasangan" required maxLength={200} onChange={()=>setMessage('')}/>
        <button type="submit" className="btn public-primary">Cek lokasi <ArrowRight size={16}/></button>
        <p role="status" className="coverage-result">{message||'Pratinjau desain · Belum terhubung ke data cakupan.'}</p>
      </form>
    </div>
  </section>;
}

export function SubscriptionSteps() {
  const steps=[{Icon:ClipboardList,title:'Pilih paket',text:'Sesuaikan pilihan dengan kebutuhan Anda.'},{Icon:CheckCircle2,title:'Konfirmasi kebutuhan',text:'Diskusikan lokasi dan layanan dengan tim Nirwana.'},{Icon:CalendarCheck,title:'Jadwal pemasangan',text:'Tentukan waktu setelah layanan dikonfirmasi.'}];
  return <section className="public-container subscription-section" aria-labelledby="subscription-title"><div className="subscription-band"><span className="public-kicker">CARA BERLANGGANAN</span><h2 id="subscription-title">Tiga langkah untuk mulai terhubung.</h2><div className="subscription-grid">{steps.map(({Icon,title,text},index)=><article key={title}><span className="subscription-icon"><Icon size={21}/></span><span className="subscription-number">0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
