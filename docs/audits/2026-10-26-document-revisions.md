# Verifikasi revisi web lokal — 26 Oktober 2026

## Sumber

- Dokumen utama Revisi Figma.docx: enam halaman revisi dibaca di Word Online.
- Gambar tabel kategori: kategori opsional, usulan Nira, pemeriksaan Client sebelum kirim, dan koreksi staf dengan audit.
- User_Story_NMS_Final_UU_PDP.docx: Word Online berhasil dimuat. Ketentuan terkait diperiksa menggunakan salinan lokal dengan judul, identitas dan jumlah kata yang cocok (7.795). Lihat [catatan sumber](2026-10-26-supporting-source.md).

## Cakupan yang diterapkan

| Acuan | Hasil |
|---|---|
| US-001 | Navigasi portal Panduan/Bantuan/Masuk, pemulihan di bawah CTA, Cara Lapor Gangguan, teks tiga langkah sesuai dokumen, state gagal muat tetap tersedia, teks tombol rata tengah. Company profile dipertahankan. |
| US-002–004 | Error kredensial, hitung mundur pembatasan login, checklist password, aktivasi/pemulihan, sisa percobaan OTP, error kedaluwarsa/digunakan/habis percobaan, gagal kirim dan kirim ulang. |
| US-005–006 | Nomor staf fiktif utuh, Admin mengubah nomor staf/pelanggan, validasi format/duplikat lintas akun, 403 dengan navigasi keluar, peringatan pekerjaan aktif tanpa handover otomatis. State staf diangkat ke App. |
| Gambar kategori | Client dapat mengirim tanpa kategori atau Belum tahu. Nira menawarkan usulan berbasis fakta yang bisa diterapkan/diubah sebelum kirim. Perubahan fakta membatalkan penilaian lama; fakta tidak dapat diedit saat respons tertunda. Staf melengkapi/mengoreksi dengan alasan dan audit internal. |
| US-011/015 | State tanpa layanan; form laporan pelanggan untuk Admin/Officer/Teknisi, pembatasan layanan milik pelanggan, prioritas wajib. Layanan Aktif: New, Tidak Wajib, terbit; Nonaktif: diperiksa sebelum penerbitan. |
| US-020/021 | Waktu respons pertama, penyelesaian terakhir dan umur berjalan dipisahkan; data waktu kosong menjadi Belum tersedia. Koreksi prioritas beralasan tersedia di antrean/detail sesuai kewenangan staf/Teknisi. |
| US-022 | Dialog konfirmasi arsip; daftar/detail arsip hanya Admin; tidak ada tindakan mutasi di arsip; daftar dan hitungan operasional mengabaikan arsip. Riwayat/pelaku/waktu pengarsipan dipertahankan. |
| US-028 | Peta staf bersama, pencarian/filter konsisten, legenda Aktif/Nonaktif, popup mengikuti hasil filter, lokasi belum lengkap dinamis tanpa titik palsu. |
| US-029–031 | Tambah/edit jenis khusus Admin/Officer, mutasi oleh staf/Teknisi, bilangan bulat positif dan alasan wajib, saldo tidak negatif, saldo sebelum/sesudah, koreksi tertaut sebagai catatan baru tanpa mengubah asal. Ledger bertahan saat navigasi/pergantian peran. |

## Bukti otomatis

Perintah dijalankan setelah perubahan kode terakhir:

```text
node --test src/*.test.js
44 tests, 44 pass, 0 fail

npm run build
Vite 6.4.3 — 1616 modules transformed — build successful

git diff --check
exit 0; hanya peringatan normalisasi LF/CRLF
```

Pengujian baru mencakup kategori opsional/usulan konservatif, koreksi kategori dan audit internal, durasi hilang/reopen, hak arsip, kewenangan prioritas, kepemilikan layanan dan publikasi laporan petugas, pelaku review/handover, filter/koordinat, nomor unik lintas kelompok, pekerjaan aktif, login/OTP, dan ledger/koreksi voucher. Aturan baru diuji gagal sebelum implementasi lalu dijalankan kembali sampai lulus.

## Bukti browser

Browser lokal `http://127.0.0.1:5173`:

- Admin mengarsipkan tiket selesai, melihat arsip baca saja dan tiket hilang dari daftar operasional.
- Dialog arsip final dikenali sebagai dialog, memberi fokus awal pada Batal dan menyediakan konfirmasi.
- Laporan petugas pada layanan Aktif tersimpan New/Tidak Wajib/terbit dengan prioritas, pelaku dan alasan; Terima tetap tindakan terpisah. Durasi awal belum tersedia.
- Koreksi kategori tersimpan dengan kategori awal/akhir dan pelaku pada riwayat.
- Client berhasil mengirim kategori kosong; detail tidak menampilkan kolom edit.
- Empat jawaban Nira menghasilkan usulan kategori; perubahan fakta membatalkan penilaian lama dan penilaian ulang menghasilkan kategori baru. Kolom fakta dan tombol pengiriman nonaktif selama respons tertunda.
- Voucher: 342 → tambah 5 → 347 → koreksi jumlah benar 3 → 345. Riwayat mempertahankan +5 dan koreksi -2 sebagai dua transaksi, lengkap saldo sebelum/sesudah.
- Perpindahan Admin → Teknisi mempertahankan saldo 345; Teknisi melihat tombol mutasi tetapi tanpa pengelolaan jenis/koreksi.
- Filter peta Nonaktif menghasilkan satu layanan tanpa koordinat, daftar Lokasi Belum Lengkap yang cocok, tanpa penanda palsu.
- Nomor staf yang sama dengan nomor pelanggan ditolak; penonaktifan Teknisi yang terlibat pada tiket aktif menampilkan peringatan.
- Route Officer `/officer/archives` menampilkan 403; route Teknisi ke pengajuan Client belum terbit juga menampilkan 403.
- Lima kredensial salah memblokir login; timer final dimulai 15:00. OTP salah mengurangi sisa percobaan 5 → 4; OTP benar menampilkan langkah password beserta checklist.
- Form Client diuji pada viewport 390 × 844, mode gelap, tanpa luapan horizontal (document width 375 ≤ viewport 390). Override viewport dipulihkan dan tema dikembalikan terang.
- Console browser tidak mencatat error pada pemeriksaan akhir portal.

Screenshot di folder saudara `output/revision-2026-10-26`: `portal-final.png`, `nira-desktop.png`, `nira-mobile-dark.png`.

Review kode terpisah menemukan dua masalah: penilaian Nira yang bisa menjadi usang saat respons tertunda dan pelaku generik pada review/handover. Keduanya diperbaiki dan pemeriksaan ulang tidak menemukan masalah high/medium tambahan. Timer awal login yang memakai waktu lama juga diperbaiki dan diverifikasi 15:00 di browser.

## Batas hasil

Ini revisi prototype frontend lokal. Tidak ada backend, pengiriman WhatsApp/Telegram nyata, layanan AI eksternal, peta produksi atau perubahan kredensial nyata. Data demo kembali ke fixture setelah refresh; state aplikasi bertahan selama navigasi/pergantian peran di tab yang sama. Hak akses di sini adalah perilaku prototype, bukan pengamanan server produksi. Fitur user story lain di luar daftar revisi utama tidak dinyatakan selesai.

## Rollback dan Git

Snapshot sebelum revisi: `../nirwana-rollbacks/rollback-009.zip`, 325 file, ZIP integrity test berhasil. SHA256: `73bdf7b286f10dc122bd6261c714a898c1d119bbff3ade9f3948673ad3506a22`.

Pekerjaan tetap lokal pada checkout `codex/public-portal-redesign`. Tidak ada push, merge, atau perubahan dokumen SharePoint. Perubahan dokumen lain yang sudah ada sebelum batch ini dipertahankan.
