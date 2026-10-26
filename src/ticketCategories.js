export const TICKET_CATEGORIES = ['Tidak bisa terhubung', 'Koneksi lambat', 'Koneksi putus-putus', 'Wi-Fi / perangkat', 'Lainnya', 'Belum tahu'];
export const isTicketCategory = value => TICKET_CATEGORIES.includes(value);
export const categoryLabel = ticket => isTicketCategory(ticket.category) ? ticket.category : 'Belum dikategorikan';
export const matchesCategory = (ticket, filter) => filter === 'all' || (filter === 'uncategorized' ? !isTicketCategory(ticket.category) : ticket.category === filter);
