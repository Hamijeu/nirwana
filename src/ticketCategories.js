export const TICKET_CATEGORIES = ['Tidak bisa terhubung', 'Koneksi lambat', 'Koneksi putus-putus', 'Wi-Fi / perangkat', 'Lainnya', 'Belum tahu'];
export const isTicketCategory = value => TICKET_CATEGORIES.includes(value);
export const isSubmissionCategory = value => value === '' || isTicketCategory(value);
export function suggestCategory(text='') {
  const facts=String(text).toLowerCase();
  // Conservative local simulation: ambiguous or negated symptoms stay unclassified.
  if (/\b(tidak|bukan|nggak|gak)\s+(lambat|lemot|putus|mati|bermasalah)/.test(facts)) return '';
  const candidates=[
    ['Tidak bisa terhubung',/mati total|tidak (?:bisa|dapat) (?:terhubung|digunakan)|tidak ada koneksi|internet (?:mati|terputus)/],
    ['Koneksi lambat',/\blambat\b|\blemot\b/],
    ['Koneksi putus-putus',/putus[ -]putus|sering (?:terputus|putus)|koneksi tidak stabil/],
    ['Wi-Fi / perangkat',/wi[ -]?fi (?:tidak muncul|hilang)|(?:router|modem) (?:rusak|tidak menyala)/],
  ].filter(([,pattern])=>pattern.test(facts));
  return candidates.length===1?candidates[0][0]:'';
}
export const categoryLabel = ticket => isTicketCategory(ticket.category) ? ticket.category : 'Belum dikategorikan';
export const matchesCategory = (ticket, filter) => filter === 'all' || (filter === 'uncategorized' ? !isTicketCategory(ticket.category) : ticket.category === filter);
