# Tentang Kami: profil beta dan panel layanan gabungan

Tanggal: 27 Oktober 2026, Asia/Jakarta.

## Permintaan dan keputusan lokasi

Pengguna meminta bagian dari SS1 sampai SS2 pada beta ditempatkan di bawah pembuka SS3. Setelah klarifikasi terakhir, lokasi bagian tersebut adalah halaman Tentang Kami (/tentang-kami), bukan halaman utama. SS5 kemudian diberikan sebagai referensi panel dua kolom pada company page utama. Isi SS4 digabung ke panel SS5 di posisi penutup halaman utama.

## Perubahan

- CompanyStory.jsx dan company-story.css menyajikan judul, deskripsi, gambar menara, empat angka, dan tiga pilar Cara kami bekerja dari salinan beta lokal public/company-reference/index.html.
- Gambar memakai tower-sky-DzsPeWtr.webp, dengan titik potong 78% 50% seperti beta. Desktop memakai sticky top 96px; mobile menampilkan gambar statis dan susunan satu kolom.
- AboutPage mengganti bagian profil lama yang berjudul sama dengan CompanyStory tepat sesudah pembuka about-story, sehingga tidak ada judul profil duplikat. Bagian jaringan, portal, dan kontak berikutnya tetap tersedia.
- Landing tidak lagi menampilkan CompanyServices sebagai bagian tersendiri. Isinya dimasukkan ke CompanyClosingActions: Penanganan gangguan di kolom pelanggan, Website dan sistem di kolom konsultasi. Panel tetap dua kolom abu-abu seperti SS5 dan satu kolom di mobile.
- ID layanan-nirwana dipindahkan ke panel gabungan supaya menu Layanan tetap menuju bagian yang benar. CTA portal menuju /portal dan kontak menuju /tentang-kami?section=kontak.

## Rollback

Snapshot #032 dibuat dan diverifikasi sebelum pengeditan: 426 file; SHA256 77de6f97c1d1d68f5dd25c3ccdc1a1a96ce6a0b1c20e991df0c3a0d8f3553aaf. ZIP mencakup tracked/untracked, mengecualikan .git, node_modules dan dist; indeks di ../nirwana-rollbacks/INDEX.md. Nomor snapshot diinformasikan sebelum edit.

## Verifikasi browser

- /tentang-kami memiliki urutan about-story → company-story → about-network → about-portal-strip → company-contact-full. Judul company-story-title hanya satu.
- Gambar berhasil dimuat dengan naturalWidth 1600. Saat menggulir ke Cara kami bekerja, bounding box gambar tetap top 96px; foto menampilkan dua menara seperti referensi.
- Di halaman utama, .company-services yang lama berjumlah nol dan #layanan-nirwana berjumlah satu. Menu Layanan menggulir ke panel gabungan; tautan CTA diperiksa dari DOM.
- Desktop: panel gabungan tetap dua kolom; screenshot tersimpan.
- Mobile utama 390px: panel satu kolom, document width 390 = viewport 390.
- Tentang Kami mobile 320px, mode gelap: foto position static, document width 320 = viewport 320. Teks dan semua angka tersedia; tidak ada luapan horizontal.
- Tema terang dan viewport normal dipulihkan setelah pemeriksaan. Tidak menambahkan animasi scroll JavaScript baru; sticky native dan dukungan reduced motion halaman tetap mengikuti implementasi yang ada.

## Verifikasi otomatis

node --test src/*.test.js: 50 lulus, 0 gagal.
npm run build: berhasil.
git diff --check: berhasil.

Screenshot di folder induk output/company-story-revision: about-start.png, about-scroll.png, about-mobile-dark.png, merged-closing-desktop.png, merged-closing-mobile.png.

Angka 2021, 850+, 14 dan target <24 jam mengikuti materi beta yang diminta pengguna; ini bukan pengambilan metrik operasional live. Perubahan tetap lokal; belum commit, push atau deployment.
