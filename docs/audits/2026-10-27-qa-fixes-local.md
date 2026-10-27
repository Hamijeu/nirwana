# Perbaikan temuan QA dan pelengkapan bantuan lokal

Tanggal: 27 Oktober 2026 (Asia/Jakarta).

## Lingkup dan sumber

- Empat temuan QA dalam catatan induk docs/superpowers/plans/2026-10-27-qa-before-approval.md menjadi dasar perbaikan.
- Instruksi pengguna terbaru: tombol Masuk pada header portal tetap tidak ditambahkan.
- Dokumen tambahan Acceptance_Criteria_NMS_Final_UU_PDP.docx dibuka lewat link SharePoint pengguna. Word Online menampilkan 8.009 kata. Bagian publik yang dibaca memuat AC-US001-04: kontak bantuan dinonaktifkan bila Admin belum mengaturnya.
- Jira dibuka melalui browser dan berhasil login dengan akun yang diminta, hamizrab@gmail.com. Konektor awal ternyata memakai akun Faishal; setelah diketahui berbeda, penelusuran dilanjutkan melalui browser akun Hamiz. Tidak mengubah issue, komentar, atau dokumen eksternal.
- NMS-15 menyebut kontak bantuan mengikuti pengaturan Admin. NMS-55 dan halaman DEC-07 dibaca melalui browser; isinya menetapkan tanggung jawab perusahaan dan handoff, tidak memberikan nomor teknisi yang dapat dipakai pada profil demo.
- Pencarian Jira/Confluence terkait bantuan mengarah ke kontak landing page. Nomor/email yang dipakai berasal dari src/publicContact.js, yang sudah memuat catatan konfirmasi pengguna pada 27 Oktober: +62 831-7835-1557 dan waxarsatia@nirwana.id. Tidak menyatakan angka tersebut baru ditemukan atau dikonfirmasi ulang oleh Jira. Pencarian web atas angka/email tersebut tidak memberikan hasil tambahan.
- Profil Teknisi memakai 082200001265 dari akun fiktif Andi Saputra pada state staf; tidak mengarang atau mengganti dengan nomor pribadi seseorang. Label profil tetap akun demo.

Sumber terkait:
- https://waxarsatia.atlassian.net/browse/NMS-15
- https://waxarsatia.atlassian.net/browse/NMS-55
- https://waxarsatia.atlassian.net/wiki/spaces/NMS/pages/5177421/DEC-07+Penetapan+PIC+Perusahaan+Insiden+dan+Penerimaan+Handoff
- https://waxarsatia.atlassian.net/wiki/spaces/NMS/pages/3309569/DEC-05+Bootstrap+staf+dan+kontrak+keamanan

## Perlindungan perubahan

Rollback #031 sebelum edit: 423 file, ZIP testzip berhasil, SHA256 7c386803df7d60a395522d850393c57efb814a0d201f21dedc5311debdb9a35b. Termasuk perubahan lokal yang sudah ada, mengecualikan .git, node_modules dan dist. Nomor sudah diinformasikan sebelum edit.

## Perubahan

1. CustomerForm menerima state staf, memanggil validateAccountPhone lintas staf/pelanggan pada tambah dan edit, mengecualikan akun sendiri, dan menyimpan nomor ternormalisasi.
2. recordTicketProgress memeriksa kewenangan, tiket sudah diterima, belum selesai/arsip, catatan dan lampiran. Menambahkan riwayat tanpa mengubah status, laporan awal atau waktu penerimaan. UI menyediakan Simpan progres terpisah dari Simpan perubahan status.
3. matchesTicketDate menggunakan createdAt dan tanggal Asia/Jakarta. Mendukung format tanggal fixture lama; tanggal tidak diketahui tidak dimasukkan sebagai hari ini atau sebelumnya. Sebelumnya hanya hari sebelum tanggal berjalan.
4. matchesTicketTechnician memakai daftar keterlibatan, sehingga filter tiap teknisi menemukan penugasan bersama.
5. SupportContactProvider menyimpan nomor bantuan selama tab terbuka. AccessHelp menampilkan link WhatsApp/email tanpa mengirim pesan. Admin dapat mengubah atau mengosongkan nomor bantuan; nomor kosong menghasilkan tombol disabled. Email mengikuti company profile.
6. Profil Teknisi membaca nomor utuh dari state staf yang sama dengan Pengguna & Akses.

## Verifikasi

TDD: tiga tes baru qaWorkflow.test.js dijalankan lebih dahulu, semuanya gagal karena fungsi yang dibutuhkan belum tersedia. Sesudah implementasi ketiganya lulus. Tes mencakup batas tengah malam WIB, tanggal fixture/numerik, nama teknisi dalam penugasan bersama dan handover, progres mempertahankan status/waktu/laporan, kewenangan, catatan kosong serta batas foto.

Perintah akhir:

```text
node --test src/*.test.js
50 tests, 50 pass, 0 fail

npm run build
Vite 6.4.3; 1636 modules; build successful

git diff --check
exit 0
```

Uji browser lokal baru:

- Nomor Siti diganti ke +62 812-0000-0193 (nomor Admin demo): ditolak sebagai duplikat.
- abcdefghi ditolak sebagai format salah. Nomor Siti sendiri dengan format +62 diterima dan disimpan sebagai 08.
- Progres kosong ditolak. Progres valid oleh Andi menambahkan riwayat pelaku/waktu; status tetap IN PROGRESS walaupun pilihan transisi form PENDING.
- Penugasan Andi + Reza tetap muncul saat filter Andi dipilih.
- Hari ini pada fixture lama kosong. Setelah membuat TKT-2026-016 pada 27 Oktober, Hari ini hanya menampilkan tiket baru tersebut, tidak tiket 4 Oktober.
- Admin mengosongkan nomor bantuan, menyimpan, lalu menuju portal lewat navigasi aplikasi: tombol kontak disabled. Setelah reload, default kontak tampil kembali sesuai batas state prototype.
- Link bantuan menunjuk https://wa.me/6283178351557 dan mailto:waxarsatia@nirwana.id. Tidak membuka/mengirim pesan ke kontak.
- Profil Teknisi menampilkan nomor demo utuh 082200001265.
- Portal dan form progres diperiksa pada viewport 390 × 844. document width = viewport width = 390; tidak ada overflow horizontal. Kontak diperiksa pada mode gelap; tema terang dan viewport normal dipulihkan setelah uji.

Screenshot baru berada di folder induk output/qa-fixes-local: duplicate-rejected.png, progress-status-preserved.png, shared-technician-found.png, today-new-ticket-only.png, help-disabled.png, help-mobile-dark.png, technician-profile.png, progress-mobile.png, progress-desktop.png.

## Batas hasil

Perubahan dan verifikasi tetap lokal. Tidak ada commit/push/deploy atau pembaruan Jira. Ini belum UAT penuh atau bukti pengamanan backend. Verifikasi nomor pelanggan melalui OTP nyata, pengiriman WhatsApp, penyimpanan lintas refresh, serta nomor staf nyata tetap di luar implementasi prototype ini. Kontak bantuan mengikuti sumber company profile lokal; nomor profil tetap fixture yang dinyatakan fiktif.
