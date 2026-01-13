export const generarLinkWhatsApp = (
  telefono: string,
  nombre: string,
  token: string
): string => {
  const mensaje = `
Hola ${nombre} 💜
Estás invitado/a a celebrar mis 15 años ✨

📅 Enero 31 de 2026
🕖 7:00 p.m.
📍 Salón de eventos CHELISHA

Confirma tu asistencia aquí:
https://tus15.web.app/inv/${token}
  `;

  return `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
};
