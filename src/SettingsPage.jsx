import React, {useState} from 'react';
import {useSupportContact} from './SupportContact';
import {validateAccountPhone} from './accountValidation';

export default function SettingsPage({notify}){
  const support=useSupportContact();
  const [error,setError]=useState('');
  const [values,setValues]=useState({company:'PT Nirwana Akses Teknologi',help:support.phone,publicContact:support.email,timezone:'WIB (UTC+7)'});
  const [saved,setSaved]=useState(false);
  const update=(key,value)=>{setValues(current=>({...current,[key]:value}));setSaved(false)};
  return <><div className="page-heading"><div><div className="eyebrow">ADMINISTRATION</div><h1>Pengaturan</h1><p>Informasi perusahaan dan kontak yang tampil dalam prototype.</p></div></div><form className="panel form-panel" onSubmit={e=>{e.preventDefault();const invalid=values.help.trim()?validateAccountPhone(values.help,[]):null;if(invalid){setError(invalid);return}setError('');support.setPhone(values.help.trim());setSaved(true);notify('Pengaturan demo disimpan')}}><h2>Informasi perusahaan</h2><label className="field"><span>Nama perusahaan</span><input required value={values.company} onChange={e=>update('company',e.target.value)}/></label><label className="field"><span>Zona waktu</span><input value={values.timezone} readOnly/></label><h2>Kontak</h2><label className="field"><span>Nomor WhatsApp bantuan pelanggan</span><input value={values.help} onChange={e=>update('help',e.target.value)} placeholder="Belum dikonfirmasi"/></label><label className="field"><span>Email publik (mengikuti company profile)</span><input value={values.publicContact} readOnly/></label><p className="small-note">Kontak bantuan awal mengikuti kontak publik yang sudah dikonfirmasi. Kosongkan nomor untuk menonaktifkan tombol bantuan. Perubahan berlaku selama tab aplikasi terbuka.</p>{error&&<p role="alert" className="pm-inline-error">{error}</p>}<button className="btn" type="submit">Simpan perubahan</button>{saved&&<p role="status" className="small-note">Kontak bantuan tersimpan selama tab aplikasi terbuka.</p>}</form></>
}
