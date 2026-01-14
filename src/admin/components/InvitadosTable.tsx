import type { Invitado } from "../../models/Invitado";
import { generarLinkWhatsApp } from "../services/whatsapp.service";

interface Props {
  invitados: Invitado[];
}

export default function InvitadosTable({
  invitados,
}: Props) {
  return (
    <div className="table-wrapper">
      <table className="table-invitados">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cupos</th>
            <th>Confirmados</th>
            <th>Estado</th>
            <th>WhatsApp</th>
          </tr>
        </thead>

        <tbody>
          {invitados.map(inv => (
            <tr key={inv.id}>
              <td>{inv.nombre}</td>
              <td>{inv.cuposAsignados}</td>
              <td>{inv.cuposConfirmados ?? "-"}</td>
              <td>
                {inv.confirmado === true && "✅ Confirmado"}
                {inv.confirmado === true && inv.cuposConfirmados <= 0 && "❌ No asistirá"}
                {inv.confirmado === false && "⏳ Pendiente"}
              </td>
              <td>
                {inv.telefono && (
                  <a
                    href={generarLinkWhatsApp(
                      inv.telefono,
                      inv.nombre,
                      inv.id
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ➜ Enviar
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
