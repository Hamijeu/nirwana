const failures = {
  offline:{code:'offline',title:'Koneksi terputus',message:'Permintaan belum dikirim. Periksa koneksi internet, lalu coba lagi. Isian form tetap tersedia.',type:'warning'},
  auth:{code:'auth',title:'Login gagal',message:'Nomor telepon atau password tidak cocok. Periksa kembali, lalu coba masuk lagi.',type:'error'},
  timeout:{code:'timeout',title:'Permintaan terlalu lama',message:'Layanan belum merespons. Permintaan belum diproses dalam demo ini. Tunggu sebentar, lalu coba kirim lagi.',type:'warning'},
  save:{code:'save',title:'Perubahan belum tersimpan',message:'Terjadi kendala saat memproses permintaan. Isian Anda tetap tersedia. Silakan coba kirim lagi.',type:'error'},
};

export function submissionFailure({online,scenario,login=false}) {
  if(!online)return failures.offline;
  if(scenario==='auth'&&!login)return null;
  return failures[scenario]||null;
}

export function validateLogin(phone,password) {
  if(!phone.trim()||!password)return 'Isi nomor telepon dan password untuk melanjutkan.';
  if(!/^(?:0|62)8\d{7,12}$/.test(phone.replace(/[\s()+-]/g,'')))return 'Nomor telepon belum valid. Gunakan nomor seperti 081234567890 atau +6281234567890.';
  return null;
}

export function fieldValidationMessage(field) {
  const label=field.label||'Kolom ini', validity=field.validity||{};
  if(validity.valueMissing)return `${label} wajib diisi.`;
  if(validity.rangeUnderflow)return `${label} minimal ${field.min}.`;
  if(validity.rangeOverflow)return `${label} maksimal ${field.max}.`;
  if(validity.tooShort)return `${label} minimal ${field.minLength} karakter.`;
  if(validity.stepMismatch)return `${label} harus menggunakan jumlah yang valid.`;
  return `${label} belum sesuai format. Periksa kembali isian Anda.`;
}

export function validateUpload(file,accept='') {
  if(!file)return null;
  if(file.size>5*1024*1024)return {title:'Berkas terlalu besar',message:'Ukuran maksimal berkas adalah 5 MB. Pilih berkas yang lebih kecil, lalu coba lagi.',type:'warning'};
  const allowed=accept.toLowerCase().split(',').map(value=>value.trim()).filter(Boolean);
  const name=file.name.toLowerCase(),type=(file.type||'').toLowerCase();
  const formatLabel=allowed.includes('.csv')?'CSV (.csv)':allowed.includes('image/*')?(allowed.includes('.pdf')?'gambar atau PDF':'gambar'):accept;
  if(allowed.length&&!allowed.some(rule=>rule.startsWith('.')?name.endsWith(rule):rule.endsWith('/*')?type.startsWith(rule.slice(0,-1)):type===rule))return {title:'Format berkas tidak didukung',message:`Gunakan berkas ${formatLabel}. Berkas belum dipilih; silakan unggah ulang.`,type:'error'};
  return null;
}
