import React,{useEffect,useState} from 'react';
import {ArrowRight, LogIn, FileText, Activity, RotateCcw, ShieldCheck, ArrowUpRight, Wifi, WifiOff} from 'lucide-react';
import {PublicHeader,PublicFooter,AccessHelp} from './PublicChrome';
import {currentSearch} from './routing';
export default function PortalLanding({Brand,Link}) {
  const [failed,setFailed]=useState(false);
  useEffect(()=>{const section=currentSearch(window.location,import.meta.env.BASE_URL).get('section');if(!['panduan','bantuan-akses'].includes(section))return;const frame=requestAnimationFrame(()=>document.getElementById(section)?.scrollIntoView({behavior:'instant'}));return()=>cancelAnimationFrame(frame)},[]);
  useEffect(()=>{const previous=document.title;document.title='Portal Layanan — Nirwana';return()=>{document.title=previous}},[]);
  return <div className="portal-page public-redesign"><PublicHeader Brand={Brand} Link={Link} portal/>
    <main>
      {failed?<section className="public-container portal-error" role="alert"><span className="portal-error-icon"><WifiOff size={30}/></span><span className="public-kicker">KONEKSI TERPUTUS</span><h1>Belum bisa terhubung.</h1><p>Portal belum dapat dimuat. Periksa koneksi Anda, lalu coba kembali.</p><button className="btn public-primary" onClick={()=>setFailed(false)}><RotateCcw size={17}/> Coba Lagi</button></section>:<>
        <section className="public-container portal-intro"><div className="portal-intro-copy"><span className="public-kicker"><span/> PORTAL LAYANAN NIRWANA</span><h1>Layanan Anda.<br/><em>Lebih mudah<br/>dikelola.</em></h1><p>Lihat layanan, laporkan kendala, dan ikuti penanganannya. Semua dalam satu tempat.</p><div className="portal-intro-detail"><span className="portal-line"/><span>Lebih dekat dengan layanan Anda.</span></div></div>
        <div className="portal-access"><div className="portal-access-top"><span className="portal-access-icon"><Wifi size={26}/></span><span>AKSES PELANGGAN</span></div><h2>Selamat datang<br/>di ruang layanan Anda.</h2><p>Masuk menggunakan akun Nirwana untuk mulai mengelola layanan.</p><Link to="/login" className="btn public-primary">Masuk ke akun Anda <ArrowRight size={18}/></Link><div className="portal-access-new"><span>Baru bergabung?</span><Link to="/first-login">Aktifkan akun <ArrowUpRight size={16}/></Link></div><div className="portal-access-safe"><ShieldCheck size={16}/><span>Laporan gangguan tersedia setelah login.</span></div><AccessHelp Link={Link}/></div>
        </section>
        <section className="portal-guide-band" id="panduan"><div className="public-container"><div className="portal-guide-heading"><span className="public-kicker">DARI LAPORAN HINGGA PENANGANAN</span><h2>Tiga langkah. Tetap terpantau.</h2></div><div className="portal-guide-steps">{[[LogIn,'01','Masuk ke akun','Gunakan akun Nirwana yang terdaftar.'],[FileText,'02','Ceritakan kendala','Pilih layanan dan buat laporan gangguan.'],[Activity,'03','Pantau penanganan','Ikuti perkembangan laporan melalui portal.']].map(([Icon,no,title,copy])=><article key={no}><div className="portal-step-meta"><span>{no}</span><Icon size={22}/></div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      </>}
    </main>
    <PublicFooter Brand={Brand} Link={Link} portal><details className="portal-demo"><summary>Simulasi tampilan</summary><button type="button" onClick={()=>{setFailed(true);window.scrollTo(0,0)}}>Tampilkan gagal memuat</button></details></PublicFooter>
  </div>;
}
