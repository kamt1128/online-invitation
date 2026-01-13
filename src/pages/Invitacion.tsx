import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TarjetaInvitacion from "../components/TarjetaInvitacion";
import CuposSelector from "../components/CuposSelector";
import Confirmacion from "../components/Confirmacion";
import type { Invitado } from "../models/Invitado";
import { confirmarAsistencia, obtenerInvitadoPorToken, rechazarAsistencia } from "../firebase/firestore";
import MusicPlayer from "../components/MusicPlayer";

export default function Invitacion() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [invitado, setInvitado] = useState<Invitado | null>(null);
  const [cupos, setCupos] = useState<number>(1);

  useEffect(() => {
    if (token) obtenerInvitadoPorToken(token).then(setInvitado);
  }, [token]);

  if (!invitado) return <p>Cargando invitación...</p>;

  if (invitado.confirmado !== null) {
    return <p>Esta invitación ya fue respondida 💜</p>;
  }

  return (
    <div className="pagina-invitacion">
      {/* TARJETA */}
      <MusicPlayer />
      <TarjetaInvitacion nombreInvitado={invitado.nombre} />

      {/* CONFIRMACIÓN */}
      <div className="panel-confirmacion">
        <p className="panel-confirmacion__info">
          Tienes {invitado.cuposAsignados} cupos reservados
        </p>

        <CuposSelector
          max={invitado.cuposAsignados}
          value={cupos}
          onChange={setCupos}
        />

        <Confirmacion
          onConfirmar={async () => {
            await confirmarAsistencia(invitado.id, cupos);
            navigate("/confirmado");
          }}
          onRechazar={async () => {
            await rechazarAsistencia(invitado.id);
            navigate("/confirmado");
          }}
        />
      </div>
    </div>
  );
}
