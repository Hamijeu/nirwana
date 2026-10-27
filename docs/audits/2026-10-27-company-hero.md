# Header dan hero mengikuti beta

Permintaan: bagian atas Company Profile pada screenshot pengguna mengikuti tampilan beta. Dikerjakan lokal pada 27 Oktober 2026; snapshot batch sebelum perubahan #012, checkpoint utama tetap #010.

## Perubahan

- `src/CompanyHeader.jsx`: logo NAT, header transparan di atas hero, latar solid setelah scroll, menu mobile dengan Escape, dan tautan ke layanan, paket, tentang, portal serta login lokal.
- `src/CompanyHero.jsx`: video menara dan poster dari salinan beta, judul serif putih besar, tombol oranye menuju paket dan tautan tentang Nirwana. Ada kontrol jeda/putar dan video dijeda ketika prefers-reduced-motion aktif.
- `src/Landing.jsx`: memakai dua komponen tersebut pada bagian yang diminta.
- `src/CompanyServices.jsx`: menambahkan anchor untuk tautan Layanan.
- `src/company-reference.css`: gaya baru dibatasi pada company profile. Header portal, halaman lain, dan salinan beta tetap seperti sebelumnya.
- Alamat, jam buka, WhatsApp serta fitur cek jangkauan beta tidak disalin karena belum didukung data lokal. Informasi bawah hero memakai kategori layanan yang tersedia.

## Verifikasi

- Tes browser baru `node ../output/verify_company_hero.cjs` direproduksi gagal sebelum implementasi (video hero belum ada), lalu lulus setelah implementasi.
- Diperiksa: jeda/putar video, CTA tidak merusak route, header solid setelah scroll, menu mobile 390/320 tanpa overflow, reduced motion, tanpa page error.
- `npm run build`: berhasil.
- `node --test src/*.test.js tests/*.test.js`: 54 lulus, 0 gagal.
- Pemeriksaan integrasi company profile/beta dan paket tetap memakai `../output/verify_company.cjs`; versi dev dan build production diuji.
- Bukti visual: `../output/company-hero-desktop.png`, `company-hero-mobile-390.png`, `company-hero-mobile-320.png`.

Tidak ada push atau deployment. Tinjau pada http://127.0.0.1:5173/ .
