export const TICKETS_KEY = "ticketapp_tickets_v1";
export function loadTickets() {
  return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
}
export function saveTickets(t) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(t));
}
