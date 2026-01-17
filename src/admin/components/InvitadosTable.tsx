import type { Invitado } from "../../models/Invitado";
import { generarLinkWhatsApp } from "../services/whatsapp.service";

interface Props {
  invitados: Invitado[];
  loadingData: boolean;
  onEdit: (invitado: Invitado) => void;
}

export default function InvitadosTable({
  invitados,
  loadingData,
  onEdit,
}: Props) {
  return (
    <>
      { !loadingData && invitados.length > 0 && (
          <table className="table-invitados">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Cupos</th>
                <th>Confirmados</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {invitados.map(inv => (
                <tr key={inv.id}>
                  <td className="column column--name">{inv.nombre}</td>
                  <td className="column column--telephone">
                    <label className="column__label">Teléfono</label>
                    {inv.telefono}
                  </td>
                  <td className="column column--assignedQuotas">
                    <label className="column__label">Cupos</label>
                    {inv.cuposAsignados}
                  </td>
                  <td className="column column--confirmedQuotas">
                    <label className="column__label">Confirmados</label>
                    {inv.cuposConfirmados ?? "-"}
                  </td>
                  <td className="column column--status">
                    <label className="column__label">Estado</label>
                    {inv.confirmado === true && "✅ Confirmado"}
                    {inv.confirmado === true && inv.cuposConfirmados <= 0 && "❌ No asistirá"}
                    {inv.confirmado === false && "⏳ Pendiente"}
                  </td>
                  <td className="column column--confirmed">{inv.cuposConfirmados}<span className="divisor">/</span>{inv.cuposAsignados}</td>
                  {inv.confirmado === false
                    ? ( <td className="column column--options">
                          {inv.id && (
                            <button onClick={() => onEdit(inv)} className="option-btn option-btn--outline">
                              Editar
                            </button>
                          )}
                          {inv.telefono && (
                            <a
                              href={generarLinkWhatsApp(
                                inv.telefono,
                                inv.nombre,
                                inv.id
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="option-btn"
                            >
                              Enviar
                            </a>
                          )}
                        </td>
                      )
                    : (<td className="column column--options"></td>)
                  }
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </>
  );
}
