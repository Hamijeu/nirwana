# Peran dan Izin

| Kemampuan | Client | Admin | Officer | Technician |
|---|---:|---:|---:|---:|
| Lihat layanan dan tiket sendiri | Ya | — | — | — |
| Buat laporan gangguan untuk layanan sendiri | Ya | — | — | — |
| Kelola pelanggan dan layanan | — | Ya | Ya | — |
| Terima, tugaskan, dan perbarui tiket | — | Ya | Ya | Tiket tugas sendiri / klaim |
| Arsipkan tiket selesai | — | Ya | — | — |
| Koreksi saldo voucher | — | Ya | Ya | — |
| Lihat saldo voucher | — | Ya | Ya | Ya |
| Import / export demo | — | Ya | Ya | — |
| Kelola pengguna dan pengaturan | — | Ya | — | — |

Status tiket: `NEW → OPEN → IN PROGRESS / PENDING → SELESAI`. Tiket selesai dapat dibuka lagi menjadi `OPEN` selama belum diarsipkan. Tiket arsip hanya baca. Status layanan dan status akun adalah konsep terpisah.

Izin ini adalah perilaku UI prototype. Belum ada autentikasi server atau pengamanan API.
