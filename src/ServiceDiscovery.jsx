import React from 'react';
import {ClipboardList, CalendarCheck, CheckCircle2} from 'lucide-react';

export function SubscriptionSteps() {
  const steps=[{Icon:ClipboardList,title:'Pilih paket',text:'Sesuaikan pilihan dengan kebutuhan Anda.'},{Icon:CheckCircle2,title:'Konfirmasi kebutuhan',text:'Diskusikan lokasi dan layanan dengan tim Nirwana.'},{Icon:CalendarCheck,title:'Jadwal pemasangan',text:'Tentukan waktu setelah layanan dikonfirmasi.'}];
  return <section className="public-container subscription-section" aria-labelledby="subscription-title"><div className="subscription-band"><span className="public-kicker">CARA BERLANGGANAN</span><h2 id="subscription-title">Tiga langkah untuk mulai terhubung.</h2><div className="subscription-grid">{steps.map(({Icon,title,text},index)=><article key={title}><span className="subscription-icon"><Icon size={21}/></span><span className="subscription-number">0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
