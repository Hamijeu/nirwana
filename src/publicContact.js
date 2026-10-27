// Confirmed by the user on 27 October 2026 against the beta reference.
export const publicContact={
  whatsapp:'6283178351557',phone:'+62 831-7835-1557',email:'waxarsatia@nirwana.id',
  address:'Jl. Medan–Banda Aceh Km 228, Keude Matang Glp Dua, Kec. Peusangan, Kab. Bireuen, Aceh 24261.',
  hours:'Senin–Sabtu, 08.00–17.00 WIB',
  maps:'https://maps.app.goo.gl/547Sy3nzXD3nhkRT7',
  mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.4190105777047!2d96.78577557498257!3d5.196641094780948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30476904bd578ef5%3A0x461f91739ae38e24!2sGerai%20Jaringanku!5e0!3m2!1sid!2sid!4v1792989099692!5m2!1sid!2sid",
};

export function preparePublicInquiry(name,need){
  if(!name.trim()||!need.trim())return {error:'Isi nama dan kebutuhan Anda terlebih dahulu.'};
  const message=`Halo PT Nirwana Akses Teknologi, saya ${name.trim()}.\n\n${need.trim()}`;
  return {message,href:`https://wa.me/${publicContact.whatsapp}?text=${encodeURIComponent(message)}`};
}
