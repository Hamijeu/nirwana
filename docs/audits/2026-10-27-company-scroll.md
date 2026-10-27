# Animasi scroll hero mengikuti beta

Permintaan: hero utama perlu animasi scroll seperti beta, bukan hanya video dan tampilan awal. Snapshot sebelum batch #013, checkpoint utama tetap #010.

## Dasar dan implementasi

Bundle referensi lokal fungsi BD menggunakan desktop >=1024px: pin selama 70% tinggi viewport; clip video menuju `inset(88px 20px 20px 20px round 12px)`; teks bergeser -14% dan memudar pada 60% awal progres. Mobile memakai geser teks -48px dan fade tanpa pin. Animasi tidak aktif pada reduced motion.

`src/useHeroScroll.js` menerapkan perilaku tersebut dengan passive listener dan requestAnimationFrame yang berhenti ketika mencapai target. Seluruh listener/frame dibersihkan saat unmount. CSS desktop memakai sticky di dalam area tambahan 70svh; media video diberi clip-path dan konten hero dipisahkan. Konten yang telah hilang diberi inert agar tautan tidak tetap menerima fokus. Scroll balik memulihkan konten dan fokus.

`src/CompanyHeader.jsx` menyembunyikan header saat scroll turun dan menampilkannya saat scroll naik, membuka menu, atau fokus keyboard masuk header. Perubahan CSS dibatasi pada halaman utama. Tidak menambah dependensi animasi.

## Verifikasi

- `node ../output/verify_company_scroll.cjs`: tes baru gagal sebelum implementasi, lalu lulus setelah perubahan. Diperiksa: pin desktop, clip akhir 88px, fade dan scroll balik, inert CTA tersembunyi, hero melepas pin dan bagian paket tampil, mobile tanpa pin, reduced motion, tanpa page error.
- Tes tersebut lulus pada dev 5173 dan preview build 4173/nirwana.
- `node ../output/verify_company_hero.cjs`: kontrol video, CTA, scroll header dan menu mobile tetap lulus.
- `node ../output/verify_company.cjs`: pergantian beta/utama, paket rumah/bisnis/custom dan modal konsultasi tetap lulus.
- `npm run build`: berhasil. `node --test src/*.test.js tests/*.test.js`: 54 lulus, 0 gagal.
- Review independen memeriksa cleanup RAF/listener, pin responsif, fokus dan reduced motion; tidak ada temuan yang perlu diperbaiki.
- Bukti visual diperiksa: `../output/company-scroll-mid.png`, `company-scroll-end.png`, `company-scroll-next-section.png`.

Pengerjaan lokal, tanpa push/deployment. Halaman peninjauan: http://127.0.0.1:5173/ .

## Koreksi header setelah peninjauan pengguna

Snapshot sebelum koreksi #014. Header belum konsisten menghilang karena delta kecil scroll direset pada setiap event dan aturan `:focus-within` mempertahankan header setelah klik pointer. Delta kini diakumulasi sampai melewati ambang 4px; pengecualian fokus memakai `:focus-visible` untuk akses keyboard saja.

`node ../output/verify_header_scroll.cjs` mereproduksi kegagalan scroll lambat sebelum perbaikan dan lulus setelah perbaikan. Cakupan: scroll turun 2px per event, klik Paket lalu scroll, header kembali saat scroll naik, navigasi keyboard. Build dan 54 tes juga lulus.

## Penundaan header sampai hero selesai

Arahan pengguna berikutnya: header terlalu cepat menghilang. Snapshot sebelum perubahan #015. Header kini tetap terlihat selama batas bawah `.company-hero-scroll` masih berada di layar; perilaku sembunyi saat turun baru berlaku sesudah hero seluruhnya lewat. Scroll naik tetap menampilkan header kembali. Aturan ini mengikuti tinggi aktual hero pada desktop maupun mobile.

Tes browser diperbarui dan terbukti gagal sebelum perubahan, lalu lulus: terlihat di awal dan tepat sebelum akhir hero, hilang setelah akhir hero termasuk scroll lambat/klik pointer, kembali ketika scroll naik, akses keyboard, mobile 390/320. Build dan 54 tes lulus.
