// Illustrative Nirwana packages for the UI prototype, not commercial offers.
export const homePlans = [
  {id:'home-30', name:'Home Lite', speed:30, price:179000, description:'Mulai dari kebutuhan sehari-hari.', features:['Browsing & media sosial','Belajar dari rumah','Bantuan melalui portal']},
  {id:'home-50', name:'Home Comfort', speed:50, price:229000, description:'Lebih nyaman untuk keluarga kecil.', features:['Streaming & video call','Bekerja dari rumah','Bantuan melalui portal']},
  {id:'home-100', name:'Home Family', speed:100, price:299000, featured:true, description:'Satu koneksi untuk aktivitas keluarga.', features:['Banyak aktivitas bersamaan','Hiburan & kerja online','Bantuan melalui portal']},
  {id:'home-300', name:'Home Ultimate', speed:300, price:499000, description:'Ruang lebih luas untuk kebutuhan digital.', features:['Streaming resolusi tinggi','Unduh file berukuran besar','Bantuan melalui portal']},
];

export const businessPlans = [
  {id:'biz-100', name:'Business Start', speed:100, price:649000, description:'Untuk toko, studio, dan kantor kecil.', features:['Koneksi untuk operasional','Konsultasi jaringan awal','Bantuan melalui portal']},
  {id:'biz-200', name:'Business Pro', speed:200, price:999000, featured:true, description:'Dukung kolaborasi dan bisnis yang tumbuh.', features:['Aktivitas tim lebih leluasa','Konsultasi kebutuhan jaringan','Bantuan melalui portal']},
  {id:'biz-custom', name:'Business Custom', speed:null, price:null, description:'Solusi untuk sekolah, kantor, dan multi-lokasi.', features:['Bandwidth sesuai kebutuhan','Pilihan jaringan multi-lokasi','Penawaran setelah konsultasi']},
];

export const formatPrice = value => `Rp${new Intl.NumberFormat('id-ID').format(value)}`;
