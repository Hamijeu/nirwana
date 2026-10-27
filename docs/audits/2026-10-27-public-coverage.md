# Peta pin jangkauan dan pembersihan label publik

Permintaan pengguna: mengganti konsultasi alamat dengan peta pada beta dan menghapus keterangan seperti ilustrasi. Snapshot sebelum perubahan **#018**; checkpoint utama #010 tetap tersedia.

## Data pin yang ditemukan

Sumber: https://company-staging.nirwana.id/ . HTTP langsung diperiksa kembali dan berhasil 200; bundle yang digunakan tetap `index-Cwj9HtTe.js`.

- Pin kantor: latitude **5.1966411**, longitude **96.7883505**.
- Klasifikasi pin kantor dari data sumber: **Kecamatan Peusangan, Kabupaten Bireuen**.
- Data geografis bundle: batas Bireuen, kabupaten tetangga, dan batas kecamatan (`bireuen`, `neighbours`, `kecamatan`).
- Pin kantor dan alamat sebelumnya telah dikonfirmasi pengguna pada batch #016.
- Status wilayah mengikuti data peta beta; bukan hasil pemeriksaan teknis jalur pemasangan setiap alamat. Teks hasil mengarahkan pengguna mengonfirmasi ketersediaan akhir bersama tim Nirwana.

## Implementasi

`src/CompanyCoverage.jsx` menggantikan formulir lama pada posisi yang sama. Peta dibuat sebagai entry mandiri dari modul beta dalam `public/coverage-map/`, dengan data dan MapLibre worker lokal. Runtime diisolasi dalam iframe agar tidak mencampurkan React/style beta dengan aplikasi utama. Sumber beta asli tetap tidak berubah.

`../output/build_public_coverage.py` mereproduksi entry khusus peta dari salinan beta yang sudah ada; provenance dicatat dalam `public/coverage-map/SOURCE.json`. Tinggi iframe mengikuti konten melalui ResizeObserver dan postMessage yang memvalidasi origin, source dan batas tinggi. Tema mengikuti halaman induk; observer/listener dibersihkan saat unmount.

Fitur: klik pin, tombol lokasi perangkat (izin hanya diminta saat diklik), pengenalan kecamatan, hasil wilayah, zoom, marker kantor, tautan Google Maps dan pesan WhatsApp. WhatsApp hanya memasukkan kecamatan, tanpa koordinat rinci. Peta menggunakan tile dari penyedia pihak ketiga; teks privasi menjelaskan pemrosesan pin lokal serta pemuatan data peta dari penyedia.

## Label

Label “Harga ilustrasi · Prototype”, “Foto ilustrasi”, “Prototype UI/UX”, serta pernyataan harga contoh desain dihapus dari halaman utama, Tentang Kami, footer publik dan modal paket. Deskripsi alt gambar tetap deskriptif. Catatan pajak/pemasangan/ketersediaan normal dipertahankan. Atribusi OpenFreeMap/OpenMapTiles/OpenStreetMap/relief tetap ditampilkan. Provenance aset dan status data desain tetap tercatat di dokumen internal; data angka paket tidak diganti.

## Verifikasi

- Tes baru `node ../output/verify_public_coverage.cjs` gagal sebelum perubahan, lalu lulus pada dev dan preview production `/nirwana/`.
- Diuji dengan canvas peta yang benar-benar dirender: geolocation kantor → Peusangan, klik wilayah lain mengubah hasil, WhatsApp hanya memuat kecamatan, mobile 390/320, pesan tema, dan tidak ada label ilustrasi/prototype pada main/About.
- Hasil pin diperiksa setelah opacity transisi selesai; foto bukti `../output/public-coverage-desktop.png` dan `public-coverage-mobile.png`.
- Pengujian tambahan menemukan transisi status beta kadang tertahan pada opacity 0 di iframe. Entry peta lokal kini memastikan kotak hasil selalu terlihat, tanpa mengubah data atau aksi pin; tes mendeteksi kegagalan sebelum koreksi tersebut.
- `npm run build`: berhasil. `node --test src/*.test.js tests/*.test.js`: 55 lulus, 0 gagal.
- Pemeriksaan About/formulir kontak disesuaikan dengan penggantian alur alamat dan tetap lulus.
- Review independen tidak menemukan masalah pada integrasi iframe, validasi pesan, cleanup atau perilaku peta; pengujian ulang map/render/pin juga lulus.

Perubahan lokal; tidak push, deploy, mengirim pesan WhatsApp atau memakai lokasi asli pengguna dalam pengujian.
