from pathlib import Path
import json,csv,re,zipfile,xml.etree.ElementTree as E
p=Path('docs/audits/2026-10-21-figma-stage-1'); rows=json.loads((p/'route-parity.json').read_text(encoding='utf-8'))
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
f=Path('C:/Users/Hamijeu/Downloads/Acceptance_Criteria_NMS_Final_UU_PDP.docx')
a=[''.join(x.itertext()) for x in E.fromstring(zipfile.ZipFile(f).read('word/document.xml')).findall('.//w:p',ns)]
counts={i:[] for i in range(1,36)}
for text in a:
 m=re.match(r'(AC-US(\d{3})-\d{2}) (.+)',text)
 if m:counts[int(m[2])].append(m[1])
routeByUs={1:['/','/portal'],2:['/login'],3:['/client/profile','/forgot-password'],4:['/first-login','/forgot-password','/reset-password'],5:['/admin/users'],6:['/admin/users'],7:['/admin/customers/new','/officer/customers/new','/admin/customers/:id/edit','/officer/customers/:id/edit'],8:['/admin/customers/:id/edit','/officer/customers/:id/edit'],9:['/client/profile'],10:['/admin/services/new','/admin/services/:id/edit','/officer/services/new','/officer/services/:id/edit'],11:['/client/services','/client/services/:id'],12:['/client/tickets/create'],13:['/client/tickets/create'],14:['/client/tickets','/client/tickets/:id'],15:[],16:['/admin/tickets','/admin/tickets/:id','/officer/tickets','/officer/tickets/:id'],17:['/admin/tickets/:id','/officer/tickets/:id'],18:['/technician/tickets','/technician/tickets/:id'],19:['/admin/tickets/:id','/officer/tickets/:id'],20:['/admin/tickets/:id','/officer/tickets/:id','/technician/tickets/:id'],21:['/admin/tickets/:id','/officer/tickets/:id','/technician/tickets/:id'],22:['/admin/tickets/:id'],23:['/client/tickets/:id'],24:['/technician/tickets'],25:['/admin/dashboard','/officer/dashboard'],26:['/technician/dashboard'],27:['/client/dashboard'],28:['/admin/map','/officer/map','/technician/map'],29:['/admin/vouchers','/officer/vouchers','/technician/vouchers'],30:['/admin/vouchers','/officer/vouchers','/technician/vouchers'],31:['/admin/vouchers','/officer/vouchers'],32:['/admin/data','/officer/data'],33:['/admin/data','/officer/data'],34:[],35:[]}
gaps={3:'Profil membuka recovery, belum alur change-password sesi aktif penuh.',5:'Unik nomor dan server RBAC belum lengkap; prototype.',6:'Status akun belum sinkron dengan auth/sesi/OTP; prototype.',7:'Form pelanggan masih opsi akun/status lama; gate privasi ditunda.',8:'Verifikasi nomor baru belum ada di web.',10:'Format nomor dan snapshot tiket lama belum dibuktikan.',13:'Percakapan dan penilaian simulasi, tidak ada model AI asli.',15:'Belum ada UI membuat tiket atas nama pelanggan bagi staf/Teknisi.',21:'Waktu respons/penyelesaian belum ditampilkan dari peristiwa nyata.',22:'Tindakan arsip ada; halaman daftar arsip khusus belum ada.',23:'Hanya catatan simulasi; status delivery/retry tidak ada.',24:'Telegram tidak terhubung; retry/pengiriman tidak ada.',28:'Peta ilustrasi dan batas data rinci Teknisi belum lengkap.',29:'Pengelolaan jenis belum ada.',30:'Teknisi masih baca saja, bertentangan hak tambah/kurangi pada AC.',31:'Mutasi koreksi tertaut asal belum ada.',32:'Impor validasi dasar, tidak menyimpan atomik/menjaga relasi nyata.',33:'Ekspor per layanan termasuk Nonaktif; belum pelanggan aktif unik.',34:'Menunggu keputusan PM; tidak didesain.',35:'Menunggu keputusan PM; tidak didesain.'}
mapping=[]
for i in range(1,36):
 routes=routeByUs[i];found=[row for row in rows if row['route'] in routes]
 mapping.append({'US':f'US-{i:03d}','AC':';'.join(counts[i]),'routes':';'.join(routes),'figma_existing_ids':';'.join(sorted(set(x for row in found for x in row['figma_ids'].split(';') if x))),'status':'DITUNDA_PM' if i>=34 else 'GAP_WEB' if i in gaps and i!=13 else 'SIMULASI_WEB','caution':gaps.get(i,'Pemetaan UI, bukan bukti semua AC lulus.')})
with (p/'us-ac-screen-map.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(mapping[0]));w.writeheader();w.writerows(mapping)
# Existing frames are retained as editing targets, never removed in audit.
root=E.parse(p/'figma-screens-live.xml').getroot();frameRows=[]
for section in root:
 for node in section:
  if node.tag!='frame':continue
  name=node.get('name');ref=node.get('id')
  frameRows.append({'id':ref,'name':name,'section':section.get('name'),'width':node.get('width'),'height':node.get('height'),'action':'REVISI_DI_TEMPAT','preserve':'ID dan rujukan prototype dipertahankan bila memungkinkan','archive_rule':'Versi duplikat/state lama dipindah Archive hanya setelah pengganti dan links diverifikasi'})
with (p/'frame-disposition.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(frameRows[0]));w.writeheader();w.writerows(frameRows)
print('Mapped US:',len(mapping),'AC:',sum(map(len,counts.values())),'Existing screen frames:',len(frameRows))
