import {customers} from './data.js';

// Local UI simulation only. No credential, token or OTP is written to storage.
export const DEMO_PHONE='081234567890';
export const DEMO_PASSWORD='Nirwana2026!';
export const normalizePhone=value=>String(value||'').replace(/[\s()+-]/g,'').replace(/^62/,'0');
let failures=[],lockedUntil=0,session=null,otp=null;
export const DEMO_CLIENT_ID=1;
const clientStatus=()=>customers.find(customer=>customer.id===DEMO_CLIENT_ID)?.status;
export const getDemoSession=()=>clientStatus()==='Aktif'?session:null;
export const setDemoSession=role=>{session=clientStatus()==='Aktif'?role:null};
export function revokeDemoClientAccess(){
  session=null;
  otp=null;
}
export const getDemoLock=(now=Date.now())=>({lockedUntil,remainingSeconds:Math.max(0,Math.ceil((lockedUntil-now)/1000))});
export const getDemoOtpState=(now=Date.now())=>({remainingAttempts:otp?Math.max(0,5-otp.attempts):0,expires:otp?.expires||0,expired:!!otp&&now>=otp.expires,used:!!otp?.used});
export function loginDemo(phone,password,accountState='Aktif',now=Date.now()){
  if(now<lockedUntil)return {error:'Login ditunda sementara. Terlalu banyak percobaan masuk yang gagal. Silakan coba kembali setelah masa penundaan berakhir.',lockedUntil};
  if(lockedUntil){failures=[];lockedUntil=0}
  if(clientStatus()!=='Aktif'||accountState!=='Aktif'||normalizePhone(phone)!==DEMO_PHONE||password!==DEMO_PASSWORD){
    failures=failures.filter(time=>now-time<15*60000);failures.push(now);
    if(failures.length>=5){lockedUntil=now+15*60000;return {error:'Login ditunda sementara. Lima percobaan gagal. Silakan coba kembali setelah masa penundaan berakhir.',lockedUntil}}
    return {error:'Nomor WhatsApp atau password tidak cocok. Periksa kembali isian Anda.'};
  }
  failures=[];session='client';return {ok:true};
}
export function issueDemoOtp(phone,now=Date.now(),accountState='Aktif'){
  const eligible=normalizePhone(phone)===DEMO_PHONE&&accountState!=='Nonaktif'&&clientStatus()!=='Nonaktif';
  otp={expires:now+5*60000,attempts:0,used:false,eligible};return {ok:true,expires:otp.expires};
}
export function checkDemoOtp(code,now=Date.now()){
  if(!otp)return 'Kode tidak tersedia. Minta kode baru.';
  if(otp.used)return 'Kode telah digunakan. Minta kode baru.';
  if(now>=otp.expires)return 'Kode sudah kedaluwarsa. Minta kode baru.';
  if(otp.attempts>=5)return 'Batas percobaan demo tercapai. Minta kode baru.';
  otp.attempts++;
  if(otp.eligible&&clientStatus()!=='Nonaktif'&&code==='123456'){otp.used=true;return null}
  return otp.attempts>=5?'Batas percobaan demo tercapai. Minta kode baru.':'Kode verifikasi tidak cocok. Periksa enam digit kode Anda.';
}
export function finishDemoRecovery(now=Date.now()){
  if(!otp?.used||!otp.eligible||otp.completed||now>=otp.expires||clientStatus()==='Nonaktif')return false;
  otp.completed=true;
  session=null;
  failures=[];
  lockedUntil=0;
  return true;
}
export function resetDemoLock(){failures=[];lockedUntil=0}
