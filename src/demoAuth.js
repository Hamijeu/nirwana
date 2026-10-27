// Local UI simulation only. No credential, token or OTP is written to storage.
export const DEMO_PHONE='081234567890';
export const DEMO_PASSWORD='Nirwana2026!';
export const normalizePhone=value=>String(value||'').replace(/[\s()+-]/g,'').replace(/^62/,'0');
let failures=[],lockedUntil=0,session=null,otp=null;
export const getDemoSession=()=>session;
export const setDemoSession=role=>{session=role};
export const getDemoLock=(now=Date.now())=>({lockedUntil,remainingSeconds:Math.max(0,Math.ceil((lockedUntil-now)/1000))});
export const getDemoOtpState=(now=Date.now())=>({remainingAttempts:otp?Math.max(0,5-otp.attempts):0,expires:otp?.expires||0,expired:!!otp&&now>=otp.expires,used:!!otp?.used});
export function loginDemo(phone,password,accountState='Aktif',now=Date.now()){
  if(now<lockedUntil)return {error:'Login ditunda sementara. Terlalu banyak percobaan masuk yang gagal. Silakan coba kembali setelah masa penundaan berakhir.',lockedUntil};
  if(lockedUntil){failures=[];lockedUntil=0}
  if(accountState==='Belum Aktif')return {activation:true};
  if(accountState==='Nonaktif')return {error:'Akun Nonaktif. Hubungi Admin untuk mengaktifkan kembali akses Anda.'};
  if(normalizePhone(phone)!==DEMO_PHONE||password!==DEMO_PASSWORD){
    failures=failures.filter(time=>now-time<15*60000);failures.push(now);
    if(failures.length>=5){lockedUntil=now+15*60000;return {error:'Login ditunda sementara. Lima percobaan gagal. Silakan coba kembali setelah masa penundaan berakhir.',lockedUntil}}
    return {error:'Nomor WhatsApp atau password tidak cocok. Periksa kembali isian Anda.'};
  }
  failures=[];session='client';return {ok:true};
}
export function issueDemoOtp(phone,now=Date.now()){
  if(normalizePhone(phone)!==DEMO_PHONE)return {error:'Gunakan nomor akun demo yang tercantum di bawah form.'};
  otp={expires:now+5*60000,attempts:0,used:false};return {ok:true,expires:otp.expires};
}
export function checkDemoOtp(code,now=Date.now()){
  if(!otp)return 'Kode tidak tersedia. Minta kode baru.';
  if(otp.used)return 'Kode telah digunakan. Minta kode baru.';
  if(now>=otp.expires)return 'Kode sudah kedaluwarsa. Minta kode baru.';
  if(otp.attempts>=5)return 'Batas percobaan demo tercapai. Minta kode baru.';
  otp.attempts++;
  if(code==='123456'){otp.used=true;return null}
  return otp.attempts>=5?'Batas percobaan demo tercapai. Minta kode baru.':'Kode verifikasi tidak cocok. Periksa enam digit kode Anda.';
}
export function finishDemoRecovery(){if(otp)otp.used=true;session=null;failures=[];lockedUntil=0}
export function resetDemoLock(){failures=[];lockedUntil=0}
