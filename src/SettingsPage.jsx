import React, {useState} from 'react';

export default function SettingsPage({notify}){
  const [values,setValues]=useState({company:'PT Nirwana Akses Teknologi',help:'',publicContact:'',timezone:'WIB (UTC+7)'});
  const [saved,setSaved]=useState(false);
  const update=(key,value)=>{setValues(current=>({...current,[key]:value}));setSaved(false)};
  return <><div className="page-heading"><div><div className="eyebrow">ADMINISTRATION</div><h1>Pengaturan</h1><p>Informasi perusahaan dan kontak yang tampil dalam prototype.</p></div></div><form className="panel form-panel" onSubmit={e=>{e.preventDefault();setSaved(true);notify('Pengaturan demo disimpan')}}><h2>Informasi perusahaan</h2><label className="field"><span>Nama perusahaan</span><input required value={values.company} onChange={e=>update('company',e.target.value)}/></label><label className="field"><span>Zona waktu</span><input value={values.timezone} readOnly/></label><h2>Kontak</h2><label className="field"><span>Kontak bantuan pelanggan</span><input value={values.help} onChange={e=>update('help',e.target.value)} placeholder="Belum dikonfirmasi"/></label><label className="field"><span>Kontak website publik</span><input value={values.publicContact} onChange={e=>update('publicContact',e.target.value)} placeholder="Belum dikonfirmasi"/></label><p className="small-note">Kontak resmi perlu dikonfirmasi sebelum publikasi.</p><button className="btn" type="submit">Simpan perubahan</button>{saved&&<p role="status" className="small-note">Perubahan tersimpan selama halaman terbuka.</p>}</form></>
}
