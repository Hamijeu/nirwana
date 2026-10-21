# Revisi PM — web lokal

Tanggal: 21 Oktober 2026. Plan disetujui dalam percakapan.

## Cakupan
- Company profile `/`: informasi dan harga ilustrasi; tanpa login dan AI publik. Konsultasi paket menjadi dialog demo tanpa pengiriman.
- Portal `/portal`: identitas, akses login, panduan tiga langkah, kontak belum tersedia, gagal muat/coba lagi.
- Auth: akun demo, salah kredensial, Nonaktif, Belum Aktif, lockout, OTP dan password 8–128 karakter. Semua lokal, bukan keamanan produksi.
- Laporan Client: pilih layanan, formulir/asisten simulasi, fakta tidak diketahui, rangkuman editable, fallback tanpa kehilangan input, konfirmasi kirim, status review terpisah.
- Staf: antrean review, prioritas dan alasan wajib, publikasi terpisah dari klaim/Terima; pemeriksaan layanan Nonaktif; penugasan multi-Teknisi dan handover.
- Ditunda: alur penolakan/klarifikasi Client, privasi, harga resmi, integrasi asli, domain/repo terpisah.

## Implementasi dan verifikasi
1. Tambah fungsi aturan workflow dan tes Node: review, publikasi, klaim, Terima, layanan Nonaktif, akses Client/arsip.
2. Tambah PortalLanding dan dialog konsultasi; ubah CompanyLanding dan entry Mode demo.
3. Tambah AuthPages dan demoAuth; gate Client bersifat simulasi.
4. Tambah ReportComposer dan TicketWorkflow; integrasikan state pada App tanpa menyimpan rahasia atau percakapan ke storage.
5. Periksa tes, build, browser desktop/mobile light/dark dan end-to-end Client → review → claim → Terima.
6. Simpan bukti preview dan laporan batasan. Tidak commit/push/Figma.
