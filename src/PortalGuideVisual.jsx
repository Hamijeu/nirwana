import React from 'react';

export default function PortalGuideVisual({step}){
  const labels=['Layar masuk akun dengan nomor WhatsApp dan password','Formulir untuk memilih layanan dan menulis laporan gangguan','Linimasa untuk memantau perkembangan penanganan laporan'];
  return <svg className="portal-guide-visual" viewBox="0 0 360 210" role="img" aria-label={labels[step]}>
    <rect width="360" height="210" rx="14" fill="#e8eef3"/>
    <circle cx="340" cy="5" r="125" fill="#d6e3ec"/>
    <rect x="46" y="24" width="268" height="162" rx="12" fill="#fff" stroke="#c8d4de"/>
    <path d="M46 52H314" stroke="#e2e9ef"/>
    <g fill="#a7bac9"><circle cx="62" cy="38" r="3"/><circle cx="73" cy="38" r="3"/><circle cx="84" cy="38" r="3"/></g>
    {step===0?<>
      <circle cx="180" cy="76" r="14" fill="#e8eef3"/><circle cx="180" cy="73" r="4" fill="#7c96ab"/><path d="M173 82Q180 72 187 82" fill="#7c96ab"/>
      <rect x="97" y="98" width="166" height="22" rx="5" fill="#f2f5f8" stroke="#d6e1e9"/><rect x="108" y="107" width="76" height="4" rx="2" fill="#a7bac9"/>
      <rect x="97" y="128" width="166" height="22" rx="5" fill="#f2f5f8" stroke="#d6e1e9"/><g fill="#a7bac9">{[111,121,131,141,151,161].map(x=><circle key={x} cx={x} cy="139" r="2"/>)}</g>
      <rect x="97" y="158" width="166" height="17" rx="8.5" fill="#142638"/><text x="180" y="170" fill="#fff" textAnchor="middle" fontSize="9">Masuk</text>
    </>:step===1?<>
      <text x="69" y="75" fill="#243b50" fontSize="11">Buat laporan</text>
      <rect x="69" y="86" width="222" height="23" rx="5" fill="#f2f5f8" stroke="#d6e1e9"/><text x="80" y="101" fill="#72899c" fontSize="9">Pilih layanan</text><path d="M272 95L277 100L282 95" stroke="#72899c" fill="none" strokeWidth="2"/>
      <rect x="69" y="117" width="222" height="34" rx="5" fill="#f2f5f8" stroke="#d6e1e9"/><path d="M80 130H241M80 139H210" stroke="#b6c8d6" strokeWidth="3" strokeLinecap="round"/>
      <rect x="193" y="160" width="98" height="17" rx="8.5" fill="#142638"/><text x="242" y="172" fill="#fff" textAnchor="middle" fontSize="9">Ajukan laporan</text>
    </>:<>
      <text x="69" y="75" fill="#243b50" fontSize="11">Perkembangan laporan</text>
      <path d="M84 98V160" stroke="#c5d5df" strokeWidth="3"/><path d="M84 98V128" stroke="#438573" strokeWidth="3"/>
      {[['Diajukan',98],['Ditinjau',128],['Penanganan',158]].map(([label,y],i)=><g key={label}><circle cx="84" cy={y} r="7" fill={i<2?'#438573':'#d9e4eb'}/>{i<2&&<path d={`M81 ${y}l2 2 4-4`} stroke="#fff" fill="none" strokeWidth="1.5"/>}<text x="103" y={y+3} fill="#536d81" fontSize="10">{label}</text><rect x="220" y={y-3} width="55" height="5" rx="2.5" fill="#e0e8ee"/></g>)}
    </>}
  </svg>;
}
