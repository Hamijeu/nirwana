import {homePlans, businessPlans, formatPrice} from './plans.js';

export function getDemoReply(message, context) {
  const question = message.toLocaleLowerCase('id-ID');
  if (context === 'client') {
    if (/tiket|laporan|progress|progres|status/.test(question)) return {text:'Progres penanganan dapat dilihat di Tiket Saya. Buka salah satu tiket untuk melihat status dan timeline pembaruannya.', action:'tickets'};
    if (/lambat|lemot|putus|mati|gangguan|router|wifi|wi-fi|internet|los/.test(question)) return {text:'Mari mulai dari pengecekan sederhana:\n1. Periksa daya router dan sambungan kabel.\n2. Coba koneksi dari perangkat lain di dekat router.\n3. Jika kendala tetap terjadi, buat laporan dan pilih layanan yang bermasalah agar tim dapat menindaklanjuti.\n\nIni contoh panduan, bukan hasil pemeriksaan jaringan Anda.', action:'report'};
    if (/paket|layanan|upgrade/.test(question)) return {text:'Buka Layanan Saya untuk melihat paket dan lokasi pemasangan. Untuk perubahan paket, konsultasikan kebutuhan Anda kepada tim Nirwana.', action:'services'};
    return {text:'Saya bisa membantu dengan contoh panduan internet lambat, koneksi terputus, atau cara melihat progres tiket. Apa kendala yang ingin Anda tanyakan?', action:null};
  }
  if (/bisnis|business|sekolah|custom|kantor|usaha/.test(question)) return {text:`Pilihan bisnis contoh kami:\n${businessPlans.filter(p=>p.price).map(p=>`• ${p.name}: hingga ${p.speed} Mbps — ${formatPrice(p.price)}/bulan`).join('\n')}\n\nBusiness Custom tersedia untuk sekolah, kantor, dan multi-lokasi. Bandwidth serta harga menyesuaikan kebutuhan setelah konsultasi. Semua harga ini ilustrasi untuk prototype.`, action:'packages'};
  if (/area|jangkauan|lokasi|pasang|bandung|cakupan/.test(question)) return {text:'Ketersediaan pemasangan perlu dikonfirmasi oleh tim Nirwana sesuai lokasi. Anda dapat mengisi form kontak untuk contoh alur konsultasi area dan kebutuhan pemasangan.', action:'contact'};
  const selected = homePlans.find(plan=>question.includes(plan.name.toLowerCase()));
  if(selected) return {text:`${selected.name} menawarkan kecepatan hingga ${selected.speed} Mbps dengan harga contoh ${formatPrice(selected.price)}/bulan. ${selected.description}\n\nHarga ini ilustrasi untuk prototype, belum termasuk pajak dan pemasangan. Untuk kebutuhan usaha atau sekolah, tersedia Business Custom.`, action:'packages'};
  if (/paket|harga|rumah|mbps|murah|mahal|langganan/.test(question)) return {text:`Berikut pilihan paket rumah contoh:\n${homePlans.map(p=>`• ${p.name}: hingga ${p.speed} Mbps — ${formatPrice(p.price)}/bulan`).join('\n')}\n\nHarga ilustrasi, belum termasuk pajak dan biaya pemasangan. Mau membandingkan pilihan rumah atau bisnis?`, action:'packages'};
  return {text:'Halo! Saya bisa membantu mengenalkan harga paket rumah, pilihan internet bisnis, dan layanan custom untuk sekolah atau kantor. Pilih pertanyaan cepat atau tulis kebutuhan Anda.', action:null};
}
