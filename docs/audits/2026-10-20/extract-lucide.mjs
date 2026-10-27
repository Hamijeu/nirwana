// Lucide v0.468.0 icons retain their ISC license in node_modules/lucide-react/LICENSE.
import fs from 'node:fs';
import vm from 'node:vm';
const names=['arrow-right','arrow-up','arrow-up-right','sun','moon','search','chevron-down','check','x','loader-circle','message-circle','wifi','building-2','house','menu','ticket','users','map-pin','settings','user-round','layout-dashboard','clock','upload','circle-check','triangle-alert','sparkles','minus','plus','file-text','shield','circle-help'];
const icons={};
for(const name of names){
  const source=fs.readFileSync('node_modules/lucide-react/dist/esm/icons/'+name+'.js','utf8');
  const match=source.match(/createLucideIcon\("[^"]+", ([\s\S]*?)\);/);
  if(!match)throw Error('Icon source not recognized: '+name);
  const nodes=vm.runInNewContext('('+match[1]+')');
  icons[name]='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718098" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+nodes.map(([tag,attrs])=>'<'+tag+' '+Object.entries(attrs).filter(([key])=>key!=='key').map(([key,val])=>key+'="'+val+'"').join(' ')+'/>').join('')+'</svg>';
}
fs.writeFileSync('docs/audits/2026-10-20/lucide-icons.json',JSON.stringify(icons,null,2));
console.log(JSON.stringify({icons:Object.keys(icons).length}));
