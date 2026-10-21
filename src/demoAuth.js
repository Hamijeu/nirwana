// Local UI simulation only. No credential, token or OTP is written to storage.
export const DEMO_PHONE='081234567890';
export const DEMO_PASSWORD='Nirwana2026!';
export const normalizePhone=value=>value.replace(/[\s()+-]/g,'').replace(/^62/,'0');
let failures=[],lockedUntil=0,session=null,otp=null;
export const getDemoSession=()=>session;
export const setDemoSession=role=>{session=role};
export function loginDemo(phone,password,accountState='Aktif',now=Date.now()){
  if(now<lockedUntil)return {error:`Terlalu banyak percobaan. Coba lagi dalam ${Math.ceil((lockedUntil-now)/60000)} menit.`,lockedUntil};
  if(accountState==='Belum Aktif')return {activation:true};
  if(accountState==='Nonaktif')return {error:'Akun Nonaktif. Hubungi Admin untuk mengaktifkan kembali akses Anda.'};
  if(normalizePhone(phone)!==DEMO_PHONE||password!==DEMO_PASSWORD){
    failures=failures.filter(time=>now-time<15*60000);failures.push(now);
    if(failures.length>=5){lockedUntil=now+15*60000;return {error:'Lima percobaan gagal. Akses ditunda selama 15 menit.',lockedUntil}}
    return {error:'Nomor WhatsApp atau password tidak cocok. Periksa kembali isian Anda.'};
  }
  failures=[];session='client';return {ok:true};
}
export function issueDemoOtp(phone,now=Date.now()){
  if(normalizePhone(phone)!==DEMO_PHONE)return {error:'Gunakan nomor akun demo yang tercantum di bawah form.'};
  otp={expires:now+5*60000,attempts:0,used:false};return {ok:true,expires:otp.expires};
}
export function checkDemoOtp(code,now=Date.now()){
  if(!otp||otp.used||now>=otp.expires)return 'Kode sudah kedaluwarsa atau tidak tersedia. Minta kode baru.';
  if(otp.attempts>=5)return 'Batas percobaan demo tercapai. Minta kode baru.';
  otp.attempts++;
  return code==='123456'?null:'Kode verifikasi tidak cocok. Periksa enam digit kode Anda.';
}
export function finishDemoRecovery(){if(otp)otp.used=true;session=null;failures=[];lockedUntil=0}
export function resetDemoLock(){failures=[];lockedUntil=0}
