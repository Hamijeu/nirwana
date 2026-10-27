# Company Profile dan Tentang Kami: penataan konten

Tanggal: 27 Oktober 2026 (Asia/Jakarta). Pengguna menyetujui saran penempatan bagian beta dan meminta galeri teknisi tetap paling atas pada Tentang Kami. Snapshot sebelum perubahan: **#016**. Checkpoint utama **#010** tetap tersedia.

## Konfirmasi data

Pengguna menjawab **“Ya, gunakan informasi kontak pada beta”** untuk nomor WhatsApp, email, alamat kantor, dan jam layanan. Data tersebut kini disatukan dalam `src/publicContact.js` dan dipakai untuk kontak serta modal konsultasi paket:

- WhatsApp: +62 831-7835-1557.
- Email: waxarsatia@nirwana.id.
- Alamat: Jl. Medan–Banda Aceh Km 228, Keude Matang Glp Dua, Kec. Peusangan, Kab. Bireuen, Aceh 24261.
- Jam layanan: Senin–Sabtu, 08.00–17.00 WIB.
- Google Maps dan embed: salinan tautan dari beta yang telah dikonfirmasi.

Angka 2021, 850+, 14 wilayah, target respons <24 jam, relasi pelanggan institusi dan batas cakupan jaringan belum dikonfirmasi. Tidak ditampilkan sebagai fakta, dan tidak dibuat peta cek jangkauan otomatis.

## Susunan hasil

Company Profile: hero yang sudah disetujui → pengantar singkat Nirwana → paket lokal → timeline pemasangan empat langkah → layanan tambahan → konsultasi alamat → banner portal pelanggan → undangan kontak → footer.

Tentang Kami: galeri teknisi + pengantar yang sudah ada → profil perusahaan dan pendekatan layanan → dua gambar jaringan ilustratif → portal pelanggan → formulir konsultasi, kontak resmi dan peta kantor → footer.

Galeri pembuka tetap menjadi section pertama, termasuk urutan visual pada mobile. Tiga foto pengguna dipertahankan dan ditambah dua foto jaringan dari aset referensi lokal. Bagian jaringan memakai gambar fiber optik dan access point yang diberi label foto ilustrasi.

## Perilaku

- Timeline empat langkah dapat dipilih; gambar dan keterangannya mengikuti langkah aktif. Menggantikan blok tiga langkah sebelumnya.
- Alamat yang diisi pada halaman utama diteruskan ke formulir Tentang Kami melalui query, juga pada base production `/nirwana/`.
- Form memvalidasi nama dan kebutuhan, menampilkan draf, lalu menyediakan tautan WhatsApp dengan teks terisi. Situs tidak mengirim pesan; pengguna mengirim dari WhatsApp.
- Peta kantor menggunakan embed beta. Ada status pemuatan dan tautan langsung Google Maps agar lokasi tetap dapat dibuka saat layanan peta lambat. Respons embed diperiksa HTTP 200; pemuatan konten peta bergantung jaringan pihak ketiga.
- Hero/animasi, katalog paket, salinan beta dan modul operasional dipertahankan.

## Verifikasi

- Tes baru inquiry: gagal sebelum implementasi, lalu lulus; menguji input kosong, normalisasi teks dan encoding URL WhatsApp.
- `node --test src/*.test.js tests/*.test.js`: **55 lulus, 0 gagal**.
- `npm run build`: berhasil.
- `node ../output/verify_about_content.cjs`: lulus pada dev 5173 dan preview production 4173/nirwana. Memeriksa galeri pertama, lima foto, pilihan timeline, query alamat, modal paket dengan kontak resmi, preview pesan, gambar, mobile 390/320, tema gelap dan navigasi demo.
- `node ../output/verify_company.cjs` dan `verify_company_scroll.cjs`: alur utama/beta, paket/custom, modal serta animasi hero tetap lulus.
- `src/plans.js` dan seluruh `public/company-reference/` dibandingkan terhadap snapshot #016 dan identik.
- Review independen: tidak ada temuan source yang perlu diperbaiki; uji fokus form kontak juga lulus.
- Bukti visual: `../output/about-content-verification/` dan `../output/office-map-check.png`.

Semua perubahan lokal. Tidak push, deploy, atau mengirim pesan eksternal.
