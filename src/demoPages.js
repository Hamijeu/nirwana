export const demoPages = [
  {label:'Company Profile', path:'/'},
  {label:'Company Profile Beta Page', path:'/company-profile-beta'},
  {label:'Portal Layanan', path:'/portal'},
  {label:'Login', path:'/login'},
  {label:'Client', path:'/client/dashboard'},
  {label:'Admin', path:'/admin/dashboard'},
  {label:'Officer', path:'/officer/dashboard'},
  {label:'Teknisi', path:'/technician/dashboard'},
];

export function isDemoPageActive(currentPath, targetPath) {
  return currentPath === targetPath || (targetPath.endsWith('/dashboard') && currentPath.startsWith(targetPath.replace('/dashboard', '/')));
}
