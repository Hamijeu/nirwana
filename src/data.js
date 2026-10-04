export const customers = [
  {id:1,name:'Budi Santoso',phone:'0812 •••• 1234',region:'Bandung Utara',status:'Aktif',joined:'12 Jan 2024',services:2},
  {id:2,name:'Siti Rahma',phone:'0813 •••• 4402',region:'Bandung Timur',status:'Aktif',joined:'03 Mar 2024',services:1},
  {id:3,name:'Dewi Lestari',phone:'0821 •••• 8721',region:'Bandung Selatan',status:'Aktif',joined:'22 Jun 2025',services:2},
  {id:4,name:'Rizky Pratama',phone:'0857 •••• 9916',region:'Bandung Utara',status:'Nonaktif',joined:'07 Sep 2025',services:1},
];
export const services = [
  {id:1,number:'SRV-2026-001',name:'Internet Rumah',owner:'Budi Santoso',package:'Home Internet',status:'Aktif',region:'Bandung Utara',address:'Jl. Cikutra No. 42, Bandung',installed:'14 Jan 2024',coord:'-6.8881, 107.6472'},
  {id:2,number:'SRV-2026-002',name:'Internet Kantor',owner:'Budi Santoso',package:'Business Internet',status:'Aktif',region:'Bandung Timur',address:'Jl. A.H. Nasution No. 18, Bandung',installed:'08 Jul 2025',coord:'-6.9066, 107.6671'},
  {id:3,number:'SRV-2026-003',name:'Internet Rumah',owner:'Siti Rahma',package:'Home Internet',status:'Aktif',region:'Bandung Timur',address:'Jl. Antapani No. 7, Bandung',installed:'04 Mar 2024',coord:'-6.9175, 107.6591'},
  {id:4,number:'SRV-2026-004',name:'Internet Rumah',owner:'Dewi Lestari',package:'Home Internet',status:'Nonaktif',region:'Bandung Selatan',address:'Jl. Buah Batu No. 12, Bandung',installed:'26 Jun 2025',coord:'—'},
];
export const initialTickets = [
  {id:1,number:'TKT-2026-014',title:'Internet tidak dapat digunakan',customer:'Budi Santoso',serviceId:1,priority:'HIGH',status:'IN PROGRESS',tech:'Andi Saputra',region:'Bandung Utara',created:'04 Okt 2026 · 08:42',updated:'10 menit lalu',description:'Sejak pagi koneksi internet di rumah terputus. Lampu indikator modem menyala merah.',history:[{title:'Laporan dibuat',time:'08:42',by:'Budi Santoso',note:'Pelanggan melaporkan koneksi terputus.'},{title:'Tiket diterima',time:'08:55',by:'Nadia · Officer',note:'Laporan telah diverifikasi.'},{title:'Teknisi ditugaskan',time:'09:10',by:'Nadia · Officer',note:'Andi Saputra dan Reza Putra ditugaskan.'},{title:'Pemeriksaan lokasi',time:'10:05',by:'Andi Saputra',note:'Teknisi sedang memeriksa sambungan di lokasi.'}]},
  {id:2,number:'TKT-2026-013',title:'Koneksi lambat pada jam kerja',customer:'Budi Santoso',serviceId:2,priority:'MEDIUM',status:'PENDING',tech:'Reza Putra',region:'Bandung Timur',created:'03 Okt 2026 · 14:20',updated:'2 jam lalu',description:'Koneksi kantor melambat pada siang hari.',history:[{title:'Laporan dibuat',time:'14:20',by:'Budi Santoso',note:'Koneksi melambat.'},{title:'Menunggu pemeriksaan lanjutan',time:'16:30',by:'Reza Putra',note:'Perlu pengecekan saat jam kerja.'}]},
  {id:3,number:'TKT-2026-012',title:'Sinyal Wi-Fi tidak stabil',customer:'Siti Rahma',serviceId:3,priority:'LOW',status:'SELESAI',tech:'Andi Saputra',region:'Bandung Timur',created:'01 Okt 2026 · 09:12',updated:'02 Okt 2026',description:'Koneksi Wi-Fi sering terputus.',history:[{title:'Laporan dibuat',time:'09:12',by:'Siti Rahma',note:'Koneksi tidak stabil.'},{title:'Penanganan selesai',time:'15:36',by:'Andi Saputra',note:'Pemeriksaan perangkat dan koneksi selesai.'}]},
  {id:4,number:'TKT-2026-015',title:'Internet mati total',customer:'Dewi Lestari',serviceId:4,priority:'CRITICAL',status:'NEW',tech:'Belum ditugaskan',region:'Bandung Selatan',created:'04 Okt 2026 · 10:17',updated:'15 menit lalu',description:'Tidak ada koneksi internet sejak dini hari.',history:[{title:'Laporan dibuat',time:'10:17',by:'Dewi Lestari',note:'Menunggu verifikasi layanan.'}]},
];
export const initialVouchers = [{name:'Voucher 10 GB',count:342},{name:'Voucher 20 GB',count:127},{name:'Voucher 50 GB',count:58}];
export const regions=['Semua wilayah','Bandung Utara','Bandung Timur','Bandung Selatan'];
