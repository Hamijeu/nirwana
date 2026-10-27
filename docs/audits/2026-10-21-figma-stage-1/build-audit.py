from pathlib import Path
import csv,json,xml.etree.ElementTree as E,subprocess,hashlib
root=Path.cwd(); out=root/'docs/audits/2026-10-21-figma-stage-1'
old=json.loads((root/'docs/audits/2026-10-20/routes.json').read_text(encoding='utf-8-sig'))
r=E.parse(out/'figma-screens-live.xml').getroot()
nodes={n.attrib['id']:n for n in r.iter() if 'id' in n.attrib}
frames=[n for section in r for n in section if n.tag=='frame']
rows=[]
for role,route,ids,previous_states in old:
 source='main.jsx'; states=previous_states; us=''; priority='Medium'; notes='Revisi shell, tema, konten dan interaksi sesuai web. Periksa visual saat tahap layar.'; stage=6
 if role=='Public':
  source='Landing.jsx; Pricing.jsx; plans.js'; states='Rumah; Bisnis & Custom; dialog konsultasi; kontak belum tersedia; tanpa login dan AI publik';us='US-001 (informasi umum); harga adalah ilustrasi di luar AC'; notes='Pisahkan company profile dari portal. Revisi frame 13:2 dan 13:52; hilangkan promosi/login/testimonial lama.';stage=3
 elif role=='Auth':
  source='AuthPages.jsx; demoAuth.js';us='US-002; US-003; US-004; US-027; AC-PDP-10 (UI saja)';priority='High';stage=4
  states='Normal; validasi; nomor/password salah; Belum Aktif; Nonaktif; lockout; gagal jaringan; demo credentials' if route=='/login' else 'Nomor; permintaan OTP; kode salah/kedaluwarsa; WhatsApp gagal; password 8-128 dan konfirmasi; sukses/kembali login'
  notes='Revisi layout logo terpusat, teks pemulihan di login, tema atas. Aktivasi/recovery memakai wizard yang sama; /reset-password kini alias mulai verifikasi, bukan form mandiri.'
 elif role=='Client':
  stage=5;us='US-009; US-011; US-014; US-027';priority='High' if '/tickets' in route else 'Medium'
  if route=='/client/tickets/create':
   source='ReportComposer.jsx; main.jsx';us='US-012; US-013';notes='Tambah alur asisten dan form rangkuman; revisi success ke New + Menunggu Review. Tidak simpan draf lintas kunjungan.';states='Form; asisten 4 pertanyaan; Tidak tahu; mengetik; rangkuman; diedit/penilaian lama batal; nilai ulang; AI gagal; fallback; foto invalid; validasi; konfirmasi; submit gagal; sukses'
  elif route=='/client/tickets/:id':
   source='TicketWorkflow.jsx; workflow.js';notes='Pisahkan badge review dan penanganan; setelah Kirim read-only; sembunyikan audit internal dan akses tiket lain/arsip.';states='Menunggu Review; Disetujui/New; Open/In Progress/Pending/Selesai; administratif; read-only; akses ditolak'
  elif route=='/client/dashboard':states='Ringkasan data sendiri; review waiting pada kartu tiket; launcher Asisten pelaporan; light/dark; menu mobile'
 elif role in ('Admin','Officer'):
  if route.endswith('/dashboard'):
   source='OpsDashboard.jsx; TicketWorkflow.jsx';us='US-025';states='Bulan berjalan WIB; wilayah; periode; pelanggan aktif unik; antrean review saat ini; distribusi dinamis; kosong';notes='Ganti dashboard statis lama; angka/grafik dan antrean review mengikuti data web.'
  elif '/tickets/:id' in route:
   source='TicketWorkflow.jsx; workflow.js';us='US-016; US-017; US-019; US-020; US-021; US-022';priority='High';states='Menunggu Review; prioritas/alasan wajib; catatan; keputusan Nonaktif teknis/administratif; terbit tetap New; assign multi/handover; Terima; progress/foto; reopen; arsip Admin; gagal simpan';notes='Revisi detail besar; tambah state review dan penerbitan terpisah. Ditolak/klarifikasi Client ditunda.'
  elif route.endswith('/tickets'):us='US-016; US-025';priority='High';states='Antrean review; list operasional; filter; pencarian; kosong; badge review/status terpisah';notes='Revisi list dan tambahkan review queue. Arsip tidak masuk hitungan operasional.'
  elif '/customers' in route:source='main.jsx; ExtraPages.jsx';us='US-007; US-008; US-009';priority='High';notes='Ikuti tampilan web; catat gap AC: create akun opsional/status lama, verifikasi nomor belum ada, gate KTP/PDP belum ada.'
  elif '/services' in route:source='main.jsx; ExtraPages.jsx';us='US-010';priority='High';notes='Ikuti web; snapshot historis dan format nomor unik belum dibuktikan oleh prototype.'
  elif route.endswith('/map'):us='US-028';states='Peta demo; pencarian/filter; lokasi belum lengkap; loading; gagal/coba lagi';notes='Cocokkan peta ilustrasi dengan web; jangan menampilkan sebagai pemantauan koneksi langsung.'
  elif route.endswith('/vouchers'):source='VoucherPage.jsx; domain.js';us='US-029; US-030; US-031';notes='Tambah/kurangi, saldo dan riwayat web. Koreksi tertaut dan pengelolaan jenis belum ada: catat sebagai gap web, jangan nyatakan AC selesai.'
  elif route.endswith('/data'):source='ImportExport.jsx; domain.js';us='US-032; US-033';priority='High';notes='Ikuti wizard simulasi web. Ekspor sekarang per layanan, belum pelanggan aktif unik sesuai AC; impor hanya validasi dasar.'
  elif route.endswith('/users'):source='UsersPage.jsx';us='US-005; US-006';priority='High';notes='Staf/peran/status berupa simulasi. Sinkron akun login, pembatalan sesi dan unik nomor belum lengkap.'
  elif route.endswith('/settings'):source='SettingsPage.jsx';us='US-001 (konfigurasi kontak), konfigurasi demo';notes='Form pengaturan belum menyuplai kontak publik secara nyata.'
 elif role=='Technician':
  stage=7;us='US-018; US-020; US-021; US-026';priority='High' if '/tickets' in route else 'Medium'
  if route.endswith('/dashboard'):states='Tugas sendiri; tiket terbit tersedia; stok unit perusahaan; kosong';notes='Revisi dashboard; tambah desktop karena hanya mobile ada di Figma.'
  elif route.endswith('/tickets'):states='Tugas saya; antrean terbit; multi-teknisi; kosong';notes='Revisi daftar dan tambahkan desktop; tidak menampilkan pengajuan sebelum review/publikasi.'
  elif '/tickets/:id' in route:source='TicketWorkflow.jsx; workflow.js';states='Sebelum klaim; sudah klaim tetap New; Terima/Open; progress; pending; selesai; read-only/akses ditolak';notes='Pisahkan Klaim dan Terima; tambah desktop dan state penanganan.'
  elif route.endswith('/vouchers'):source='VoucherPage.jsx';us='US-029; US-030';states='Saldo perusahaan; riwayat baca saja';notes='Web masih baca saja; AC-US030 mengizinkan Teknisi menambah/mengurangi. Jangan diam-diam menambahkan perilaku yang belum ada di web.'
  elif route.endswith('/map'):us='US-028';notes='Hanya mobile tersedia; samakan peta ilustrasi dan daftar dengan cakupan web, catat batas akses sebagai gap.'
  elif route.endswith('/profile'):source='ExtraPages.jsx';us='Profil staf / akun';notes='Samakan profil Teknisi dan buat desktop; pemulihan akun staf belum ditentukan.'
 ids_list=[x for x in ids.split(';') if x];found=[x for x in ids_list if x in nodes]
 rows.append({'role':role,'route':route,'source':source,'figma_ids':';'.join(found),'action':'REVISI' if found else 'TAMBAH','stage':stage,'priority':priority,'references':us,'web_states':states,'notes':notes,'evidence':'kode web @141ddff + metadata Figma live; bukan verifikasi visual semua state'})
rows.insert(1,{'role':'Portal','route':'/portal','source':'PortalLanding.jsx','figma_ids':'','action':'TAMBAH','stage':3,'priority':'High/Medium','references':'US-001; AC-US001-01..04 + koreksi PM pemulihan di login','web_states':'Normal; panduan 3 langkah; kontak disabled; gagal muat; Coba Lagi; desktop/mobile; light/dark','notes':'Frame baru Portal / Landing, terpisah dari Company Profile. Tautan pemulihan tetap pada login sesuai klarifikasi terbaru.','evidence':'browser lokal + kode web + tidak ada frame portal pada metadata live'})
with (out/'route-parity.csv').open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
(out/'route-parity.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
summary={'baselineCommit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'routeCount':len(rows),'existingFrameCount':len(frames),'routeActions':{action:sum(x['action']==action for x in rows) for action in ['REVISI','TAMBAH']},'byRole':{role:sum(x['role']==role for x in rows) for role in dict.fromkeys(x['role'] for x in rows)},'missingRouteFrames':[x['route'] for x in rows if x['action']=='TAMBAH'],'metadataSha256':hashlib.sha256((out/'figma-screens-live.xml').read_bytes()).hexdigest(),'metadataNodeCount':len(nodes),'note':'Counts are route patterns and existing screen frames, not final frame/state count.'}
(out/'verification.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
