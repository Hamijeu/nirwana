# Animasi Cara Berlangganan, galeri pengantar, dan urutan paket

Permintaan pengguna: animasi Cara Berlangganan mengikuti beta, paragraf kanan Kenali Nirwana diganti galeri dengan tautan tetap ada, dan Paket Internet diletakkan setelah Cara Berlangganan. Snapshot sebelum perubahan **#017**; checkpoint utama #010 tetap tersedia.

## Perubahan

- `CompanyDiscovery.jsx`: panel kanan pengantar memakai komponen AboutGallery yang sama dengan Tentang Kami. Tautan **Lebih dekat dengan kami** tetap berada di bawah galeri. Galeri memiliki kontrol jeda dan dukungan reduced motion.
- `Landing.jsx`: urutan kini hero → Kenali Nirwana/galeri → Cara Berlangganan → Paket Internet → bagian lain yang sudah ada.
- `ServiceDiscovery.jsx`, `useSubscriptionScroll.js`, `company-content.css`: animasi masuk bagian navy, pin desktop, pergantian langkah berdasarkan scroll, garis progres, lapisan gambar dengan sapuan ke atas, zoom gambar dan transisi caption.
- Referensi beta fungsi DO memakai empat langkah dengan durasi pin 4 × 26% viewport. Implementasi lokal mengikuti durasi 104% viewport itu, tanpa dependensi tambahan.
- Klik langkah tetap dapat dipakai. Desktop membawa posisi scroll ke langkah yang dipilih; mobile/reduced motion memakai pilihan manual tanpa pin. Cleanup listener dan RAF disediakan saat unmount.
- Data paket, kontak, halaman Tentang Kami dan sumber beta dipertahankan.

## Verifikasi

- Tes baru `node ../output/verify_subscription_revision.cjs` gagal sebelum perubahan, lalu lulus pada dev dan preview production `/nirwana/`.
- Memeriksa galeri/tautan, urutan DOM paket, pin, pergantian otomatis maju/mundur, pilihan manual, mobile dan reduced motion.
- Pemeriksaan About/kontak dan animasi hero tetap lulus melalui `verify_about_content.cjs` dan `verify_company_scroll.cjs`.
- Build berhasil; 55 tes unit lulus.
- Review independen tidak menemukan masalah yang perlu diperbaiki pada scroll/pilihan manual, cleanup, pin responsif dan reduced motion.
- Visual diperiksa: `../output/gallery-inspection.png` dan `../output/subscription-scroll-middle.png`.

Perubahan hanya lokal, tanpa push atau deployment.
