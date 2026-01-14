export const generarLinkWhatsApp = (
  telefono: string,
  nombre: string,
  token: string
): string => {
  const mensaje = `
Hola *${nombre}*.

Acompáñame en esta fecha especial, estás invitado/a a celebrar mis 15 años.

*Fecha:* Enero 31 de 2026
*Hora:* 7:00 p.m.
*Lugar:* Salón de eventos CHELISHA

Confirma tu asistencia aquí:
https://kamt1128.github.io/online-invitation/#/${token}
  `;

  return `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
};
