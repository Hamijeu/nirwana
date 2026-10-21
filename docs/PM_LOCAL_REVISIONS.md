# Revisi PM — prototype lokal, 21 Oktober 2026

## Cara mencoba
- Company profile: http://127.0.0.1:5173/
- Portal layanan: http://127.0.0.1:5173/portal
- Login: http://127.0.0.1:5173/login
- Client demo: nomor 081234567890, password Nirwana2026!
- Mode demo menyediakan Company Profile, Portal Layanan, Login, Client, Admin, Officer, Teknisi.
- Aktivasi/pemulihan: kode contoh 123456, berlaku 5 menit. Semua proses visual/lokal.

## Diterapkan
- Company profile tanpa tautan login atau chat AI publik; harga tetap ilustrasi.
- Portal layanan terpisah dengan panduan tiga langkah, aktivasi, kontak belum tersedia, dan gagal muat/coba lagi.
- Login salah, akun Nonaktif/Belum Aktif, lima kegagalan dalam 15 menit menghasilkan penundaan 15 menit. Parameter reset tersedia hanya di kontrol demo.
- Aktivasi/pemulihan dengan OTP diminta Client, OTP salah/kedaluwarsa, simulasi WhatsApp gagal, password 8–128 karakter dan konfirmasi. Setelah selesai kembali ke login.
- Client: formulir atau asisten tanya jawab empat tahap; fakta tidak diketahui tetap ada; form dapat diperbaiki sebelum Kirim; perubahan membuat penilaian lama tidak berlaku; fallback AI mempertahankan keluhan.
- Pengiriman menampilkan nomor tiket, New, Menunggu Review, tanpa akses Teknisi.
- Review Admin/Officer: prioritas dan alasan wajib; catatan tindak lanjut append-only; keputusan teknis/administratif untuk layanan Nonaktif.
- Tiket terbit tidak otomatis ditugaskan atau diterima. Klaim multi-Teknisi, penugasan/handover dan Terima terpisah.
- Progress/pending/selesai/reopen memakai catatan; lampiran metadata maksimal 5 foto per pembaruan, masing-masing 5 MB. Arsip read-only dengan pembatasan tampilan per peran.
- Dashboard operasional memakai data demo, pelanggan aktif unik, periode WIB; antrean review/pekerjaan saat ini terpisah dari periode pengajuan.

## Verifikasi
- Delapan tes Node: lockout/status akun/normalisasi/OTP/password serta review/publikasi/klaim/multi-Teknisi/Nonaktif/handover/arsip.
- Browser: login salah dan berhasil; AI empat jawaban termasuk Tidak tahu; submit dan detail read-only; review tanpa prioritas ditolak; review valid menghasilkan New/Disetujui tanpa Teknisi; klaim tetap New; Terima menghasilkan Open.
- Browser: skenario respons AI gagal lalu fallback; teks keluhan tetap berada dalam formulir.
- Portal diperiksa desktop/light dan mobile 390 px/dark; tidak ada overflow horizontal pada portal mobile.

## Batasan dan keputusan tertunda
- Tidak ada backend, autentikasi produksi, enkripsi server, AI, WhatsApp atau Telegram asli. Gate Client dan peran hanya simulasi UI; Mode demo sengaja dapat membuka peran.
- Data tiket hanya di memori tab dan kembali ke contoh awal saat reload. Draf dan percakapan tidak disimpan lintas kunjungan. File foto tidak diunggah/disimpan, hanya metadata.
- Password baru yang diketik tidak disimpan dan tidak mengubah akun asli. Login tetap memakai kredensial contoh. OTP 123456 hanyalah fixture demo.
- Jumlah percobaan OTP lima kali adalah parameter demo sementara, bukan keputusan bisnis final. Batas resend resmi masih menunggu PM/SRS.
- Alur Ditolak dan pengiriman klarifikasi kepada Client belum ditetapkan; tidak dibuat asumsi baru.
- US-034/035 privasi, harga resmi, domain/repo terpisah ditunda.
- Tidak ada perubahan Figma, commit atau push GitHub dalam pekerjaan ini.
