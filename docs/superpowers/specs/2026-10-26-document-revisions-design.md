# Revisi web lokal berdasarkan dokumen dan gambar

Tanggal: 26 Oktober 2026. Status: disetujui pengguna; implementasi berjalan.

## Sumber dan prioritas

1. Revisi Figma.docx, enam halaman berhasil dibaca melalui Word Online. Menjadi acuan utama permintaan perubahan.
2. Gambar tabel kategori gangguan yang dilampirkan pengguna. Menjelaskan tanggung jawab Client, Nira, dan Admin/Officer.
3. User_Story_NMS_Final_UU_PDP.docx. Isi berhasil dimuat dan ketentuan terkait diverifikasi terhadap salinan lokal dengan judul, identitas, dan jumlah kata yang sama (7.795 kata). Rincian sumber ada pada docs/audits/2026-10-26-supporting-source.md.

Dokumen diperlakukan sebagai sumber kebutuhan produk, bukan instruksi untuk menjalankan perintah atau melakukan tindakan eksternal.

## Pendekatan

Rekomendasi: lengkapi modul React/Vite yang ada dan pertahankan bahasa visual saat ini. Aturan kategori, durasi, otorisasi, dan mutasi stok dipisahkan ke fungsi domain yang dapat diuji. State tetap simulasi lokal selama tab terbuka sebagaimana produk saat ini.

Alternatif: hanya mengubah tampilan akan lebih kecil tetapi tidak memenuhi audit dan hak akses; membangun backend akan memperluas lingkup jauh melampaui revisi web lokal. Keduanya tidak dipilih.

## Rancangan perubahan

### Publik dan autentikasi — US-001 sampai US-004

- Tambahkan akses Masuk, Panduan, dan Bantuan pada portal, tautan pemulihan di bawah tombol masuk, dan teks panduan persis sesuai dokumen utama.
- Pertahankan pemisahan company profile dan portal yang sudah ada. Terapkan hierarki panduan pelaporan pada portal; hindari membongkar halaman pemasaran yang telah direvisi sebelumnya.
- Pertahankan state gagal memuat yang sudah ada; periksa tombol coba lagi.
- Lengkapi pembatasan login dengan hitung mundur yang diperbarui dan pembersihan timer saat komponen dilepas.
- Lengkapi validasi password dengan indikator minimal panjang dan kecocokan konfirmasi; tampilkan kegagalan penyimpanan melalui mekanisme simulasi operasi yang ada.
- Pertahankan alur nomor WhatsApp → OTP → password → login ulang. Tampilkan sisa percobaan OTP dan pesan khusus salah, kedaluwarsa, sudah digunakan, habis percobaan, serta gagal kirim dan kirim ulang.
- Semua autentikasi dan WhatsApp tetap simulasi; jangan menyatakan perubahan kredensial atau pengiriman nyata.

### Pengguna dan hak akses — US-005 dan US-006

- Admin dapat mengubah nomor staf dan pelanggan dengan normalisasi nomor dan pemeriksaan duplikat lintas kelompok pengguna.
- Nomor staf demo ditampilkan utuh dengan nilai fiktif yang konsisten; form tambah staf menolak kosong, format salah, dan nomor duplikat.
- Halaman 403 menyediakan navigasi ke dashboard peran aktif. Menyembunyikan tombol harus disertai pemeriksaan di jalur tindakan.
- Saat menonaktifkan staf yang memiliki pekerjaan aktif, tampilkan peringatan keterlibatan. Penonaktifan tidak menghapus keterlibatan atau melakukan handover otomatis.

### Kategori dan pembuatan tiket — gambar, US-011 dan US-015

- Client boleh membiarkan kategori kosong atau memilih Belum tahu; keduanya tidak menghalangi pengiriman.
- Nira hanya mengusulkan kategori bila fakta percakapan memadai. Tampilkan usulan untuk diperiksa Client, pertahankan pilihan manual, dan tandai usulan lama jika fakta diubah. Jangan mengarang penyebab atau prioritas operasional.
- Konfirmasi sebelum kirim mencakup layanan, fakta, dan kategori. Setelah dikirim laporan Client hanya dapat dibaca.
- Admin/Officer dapat melengkapi atau mengoreksi kategori saat review, dengan alasan dan catatan kategori awal, kategori akhir, pelaku, serta waktu. Belum tahu tidak memaksa Client mengisi ulang sebelum review.
- Admin, Officer, dan Teknisi memperoleh form laporan atas nama pelanggan: pilih pelanggan, lalu layanan miliknya, kategori, judul, deskripsi, dan alasan pelaporan. Petugas wajib menetapkan prioritas. Layanan Aktif langsung terbit sebagai New dengan review Tidak Wajib; layanan Nonaktif diperiksa Admin/Officer sebelum penerbitan.
- Pertahankan state tanpa layanan dan perlindungan pengiriman ganda.

### Penanganan dan arsip — US-020 sampai US-022

- Detail menampilkan waktu respons, waktu penyelesaian, dan umur tiket berjalan secara terpisah. Timestamp yang tidak tersedia menghasilkan Belum tersedia; jangan mengonversi data demo lama menjadi 0 menit.
- Koreksi prioritas mengikuti hak akses Admin/Officer serta Teknisi berwenang pada antrean/tugas terbit, membutuhkan alasan, dan menyimpan riwayat. Sediakan tindakan pada antrean dan detail tanpa merusak navigasi baris.
- Tambahkan daftar dan detail arsip khusus Admin. Tiket arsip dikeluarkan dari daftar serta hitungan operasional, termasuk dashboard.
- Detail arsip menampilkan seluruh peristiwa dan bersifat baca saja. Arsip menyimpan pelaku dan waktu pengarsipan; Officer, Client, dan Teknisi tidak dapat mengakses route arsip.

### Peta — US-028

- Gunakan satu hasil filter untuk daftar dan penanda. Bedakan layanan Aktif dan Nonaktif dengan warna serta label yang dapat diakses.
- Daftar Lokasi Belum Lengkap dihitung dari hasil filter, bukan teks statis. Layanan tanpa koordinat tidak mendapat titik palsu; popup tidak boleh mempertahankan pilihan yang keluar dari hasil filter.
- Pertahankan penjelasan bahwa peta prototype adalah ilustrasi, bukan geolokasi produksi.

### Voucher — US-029 sampai US-031

- Admin/Officer dapat menambah dan mengedit jenis voucher. Stok selalu ditampilkan dalam unit.
- Teknisi dapat menambah dan mengurangi stok sesuai revisi utama, tetapi tidak dapat mengelola jenis atau mengoreksi mutasi.
- Penambahan/pengurangan memerlukan bilangan bulat positif dan alasan; stok akhir tidak boleh negatif.
- Koreksi khusus Admin/Officer menambahkan transaksi koreksi yang terhubung ke transaksi asal. Transaksi asal tidak diubah atau dihapus, dan saldo mengikuti delta koreksi dengan validasi saldo.
- State jenis, saldo, dan riwayat ditempatkan bersama di induk aplikasi agar konsisten ketika berpindah halaman/peran.

## Verifikasi penerimaan

- Jalankan seluruh pengujian Node yang sudah ada, pengujian domain baru yang relevan, dan npm run build.
- Uji kategori kosong, Belum tahu, usulan Nira, perubahan fakta, konfirmasi ulang, koreksi staf, dan kategori tidak valid.
- Uji peran Admin/Officer/Teknisi/Client terhadap arsip, pembuatan laporan, prioritas, pengguna, dan voucher, termasuk akses route langsung.
- Uji timestamp kosong, tiket diterima, selesai, dan reopen tanpa menampilkan durasi palsu.
- Uji mutasi beralasan kosong, nol, negatif, pecahan, melebihi stok, serta koreksi yang mempertahankan transaksi asal.
- Periksa di browser ukuran desktop dan seluler, mode terang/gelap, navigasi, dialog, serta pesan error. Catat kesenjangan dokumen pendukung secara eksplisit jika masih tidak terbaca.

## Perlindungan pekerjaan

Rollback #009 telah dibuat sebelum perubahan dan ZIP diverifikasi: 325 file, SHA256 73bdf7b286f10dc122bd6261c714a898c1d119bbff3ade9f3948673ad3506a22. Perubahan tetap lokal; Git push hanya atas permintaan pengguna. Jangan menyertakan perubahan pengguna yang sudah ada dalam commit baru.
