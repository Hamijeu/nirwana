import React from 'react';
import {criticalNetworkResults} from './workflow.js';

export default function CriticalEvidenceFields({value,onChange}){
 const change=(field,content)=>onChange({...value,[field]:content});
 return <fieldset className="pm-note">
   <legend>Empat konfirmasi Critical</legend>
   <p className="small-note">Kriteria FS 06 masih berupa usulan. Catat fakta yang mendasari keputusan.</p>
   <label className="field"><span>Hasil pemeriksaan jaringan</span>
     <select required value={value.network||''} onChange={e=>change('network',e.target.value)}>
       <option value="">Pilih hasil pemeriksaan</option>
       {criticalNetworkResults.map(result=><option key={result}>{result}</option>)}
     </select>
   </label>
   {[
     ['impact','Cakupan dan berat dampak'],
     ['coordination','Kebutuhan koordinasi'],
     ['basis','Dasar penetapan'],
   ].map(([field,label])=><label className="field" key={field}><span>{label}</span>
     <textarea required rows={2} value={value[field]||''} onChange={e=>change(field,e.target.value)}/>
   </label>)}
 </fieldset>;
}
