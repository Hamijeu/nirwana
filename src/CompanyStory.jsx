import React from 'react';
import './company-story.css';

const facts=[
 ['2021','Tahun PT NAT mulai melayani pelanggan.'],
 ['850+','Pelanggan aktif yang kami layani.'],
 ['14','Desa dan kelurahan yang sudah terlayani.'],
 ['< 24 jam','Target tanggapan pertama atas laporan gangguan.'],
];
const pillars=[
 ['Teknisi sendiri','Pemasangan dan perbaikan dikerjakan teknisi kami sendiri, bukan perantara. Setiap laporan bisa ditelusuri sampai ke petugas yang menanganinya, dan Anda tahu siapa yang datang ke alamat Anda.'],
 ['Satu data, satu sistem','Pelanggan, layanan, laporan gangguan, dan penugasan teknisi tercatat di satu sistem, Nirwana Management System. Petugas dan teknisi bekerja dari data yang sama, jadi Anda tidak perlu mengulang cerita.'],
 ['Dekat dengan pelanggan','Kantor kami di Jalan Medan–Banda Aceh Km 228 terbuka untuk pelanggan. Anda bisa bertanya lewat WhatsApp, telepon, atau datang langsung pada jam layanan.'],
];

export default function CompanyStory(){
 return <section className="company-story" aria-labelledby="company-story-title">
  <h2 id="company-story-title">Dari pemasangan sampai perbaikan.</h2>
  <p className="company-story-lead">PT Nirwana Akses Teknologi adalah penyedia internet yang berkantor di Jalan Medan–Banda Aceh Km 228, Peusangan. Teknisi kami memasang layanan di alamat Anda dan menanganinya bila terjadi gangguan, dari rumah, toko, sampai kantor.</p>
  <figure className="company-story-photo"><img src={`${import.meta.env.BASE_URL}company-reference/assets/tower-sky-DzsPeWtr.webp`} alt="Menara jaringan Nirwana di bawah langit biru" width="1600" height="900" loading="lazy"/></figure>
  <dl className="company-story-facts">{facts.map(([value,label])=><div key={value}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  <div className="company-story-pillars"><h3>Cara kami bekerja</h3><ul>{pillars.map(([title,description])=><li key={title}><h4>{title}</h4><p>{description}</p></li>)}</ul></div>
 </section>;
}
