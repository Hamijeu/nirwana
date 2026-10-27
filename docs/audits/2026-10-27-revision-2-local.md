# Revisi 2 — verifikasi lokal

Tanggal: 27 Oktober 2026 (Asia/Jakarta).

## Hasil dan perubahan

- Saat pengerjaan dimulai, perubahan lokal pada TicketWorkflow.jsx dan document-revisions.css sudah menempatkan Simpan catatan sebelum persetujuan dengan susunan vertikal. Perubahan ini dipertahankan, bukan dibuat ulang atau dibatalkan.
- Ditambahkan variabel warna lokal pada `.app-shell .revision-review-actions>.btn.soft` agar Simpan catatan berbingkai dan persetujuan tetap terisi. Menggunakan warna surface/text/muted dari tema, tanpa mengubah gaya tombol lain.
- Tidak menambahkan syarat simpan catatan sebelum persetujuan: dokumen meminta urutan tombol, bukan tahap wajib baru.

## Perlindungan

Rollback #030 dibuat sebelum edit tambahan. ZIP 422 file diperiksa dengan ZipFile.testzip(); tidak ada kerusakan. SHA256: 6b7c6da30f74dd18ba1a1d40b59d8fb4fe28aed5c0c003b44403bbf955af42a5. Menyertakan perubahan lokal yang sudah ada; tidak menyertakan .git, node_modules, dist. Indeks di ../nirwana-rollbacks/INDEX.md.

## Bukti baru

Browser pada http://127.0.0.1:5173:

- Admin: catatan kosong ditolak; catatan valid menambahkan riwayat dengan pelaku/waktu. Status tetap Menunggu Review dan NEW.
- Persetujuan tanpa prioritas/alasan ditolak. Setelah memilih HIGH dan mengisi alasan, layanan Nonaktif tetap ditolak sampai keputusan tindak lanjut dipilih.
- Desktop: Simpan catatan memiliki top 428,06 / bottom 472,06; persetujuan top 481,06. Urutan visual mengikuti urutan DOM.
- Mobile 390 × 844: document width 390, viewport 390; tombol pertama berakhir sebelum tombol kedua dimulai.
- Mode terang: catatan putih, teks gelap; persetujuan gelap, teks putih. Mode gelap: catatan mengikuti surface gelap dengan teks terang; persetujuan putih dengan teks gelap. Override viewport dibersihkan dan tema dikembalikan terang setelah uji.
- Client: laporan kategori kosong berhasil dikirim sebagai TKT-2026-016; detail baca saja tanpa editor.
- Officer: kategori laporan baru dapat dilengkapi menjadi Lainnya dengan alasan; riwayat mencatat Belum dikategorikan → Lainnya, Nadia · Officer, dan waktu. Tidak meminta Client mengisi ulang.
- Nira: empat jawaban menghasilkan usulan Koneksi lambat; kategori tidak diterapkan otomatis. Usulan dapat dipilih. Mengubah fakta menjadi Internet mati total membatalkan penilaian lama dan konfirmasi; pengiriman ditolak sampai konfirmasi ulang. Penilaian ulang menghasilkan Tidak bisa terhubung dan mempertahankan pilihan sebelumnya sampai Client menggantinya.

Perintah otomatis sesudah perubahan CSS:

```text
node --test src/*.test.js
47 tests; 47 pass; 0 fail

npm run build
Vite 6.4.3; 1635 modules; build successful

git diff --check
exit 0
```

Tes yang ada juga mencakup akun/OTP, peran, durasi, arsip, prioritas, laporan petugas, peta, serta ledger/koreksi voucher. Kelompok tersebut tidak diubah pada batch ini. Audit browser lengkap sebelumnya tetap dicatat terpisah dalam 2026-10-26-document-revisions.md; tidak dianggap sebagai uji browser baru hari ini.

## Bukti visual

- ../output/revision-2-local/review-desktop.png (folder output berada di induk proyek).
- ../output/revision-2-local/review-mobile-dark.png.

## Batas dan status

Perubahan tetap lokal pada codex/public-portal-redesign. Tidak ada commit, push, merge, deployment, atau modifikasi SharePoint oleh pengerjaan ini. Sistem tetap frontend simulasi; tes tidak membuktikan backend atau pengiriman WhatsApp/AI nyata. Tidak mengklaim seluruh user story pendukung atau gambar tertanam Word telah diaudit ulang pada batch ini.
