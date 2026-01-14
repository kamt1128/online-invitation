import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TarjetaInvitacion from "../components/TarjetaInvitacion";
import CuposSelector from "../components/CuposSelector";
import Confirmacion from "../components/Confirmacion";
import type { Invitado } from "../models/Invitado";
import { confirmarAsistencia, obtenerInvitadoPorToken, rechazarAsistencia } from "../firebase/firestore";
import Loading from "../components/loading";
import ConfirmModal from "../components/ConfirmModal";
import backgroundCard from "../assets/background-card.svg";
import MusicPlayer from "../components/MusicPlayer";


export default function Invitacion() {
  const { token } = useParams<{ token: string }>();

  const [invitado, setInvitado] = useState<Invitado | null>(null);
  const [cupos, setCupos] = useState<number>(1);

  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [modalRechazar, setModalRechazar] = useState(false);

  useEffect(() => {
    if (!token) return;

    const loadInvitado = async () => {
      const data = await obtenerInvitadoPorToken(token);

      if (!data) return;

      setInvitado(data);
      setCupos(data.cuposAsignados);
    };

    loadInvitado();
  }, [token]);

  const reloadInvitado = async () => {
    const updated = await obtenerInvitadoPorToken(token!);
    setInvitado(updated);
  };

  if (!invitado) return <Loading />;

  return (
    <div className="pagina-invitacion container">
      <div className="fondo-radial-top float-element"></div>
      <div className="background-card float-element">
        <img src={backgroundCard} alt="Background Card" className="background-card__image" />
      </div>
      <div className="border-vintage float-element"></div>
      <MusicPlayer />
      <TarjetaInvitacion nombreInvitado={invitado.nombre} />

      {!invitado.confirmado && (
          <div className="panel-confirmacion">
            <p className="panel-confirmacion__info">
              Tienes {invitado.cuposAsignados} cupo(s) reservado(s)
            </p>

            {invitado.cuposAsignados > 1 && (
              <CuposSelector
                max={invitado.cuposAsignados}
                value={cupos}
                onChange={setCupos}
              />)
            }

            <Confirmacion
              onConfirmar={async () => {
                setModalConfirmar(true);
              }}
              onRechazar={async () => {
                setModalRechazar(true)
              }}
            />
          </div>
        )
      }

      {invitado.confirmado && invitado.cuposConfirmados > 0 && (
          <div className="confirmed-invitation">
            <h1 className="confirmed-invitation__title">
              ¡Gracias por confirmar!
            </h1>

            <p className="confirmed-invitation__message">
              Te esperamos con mucho cariño
            </p>
          </div>
        )
      }
      
      {invitado.confirmado && invitado.cuposConfirmados <= 0 && (
          <div className="confirmed-invitation">
            <h1 className="confirmed-invitation__title">
              ¡Entendemos que no puedas acompañarnos!
            </h1>

            <p className="confirmed-invitation__message">
              Te enviamos un abrazo y esperamos poder<br />verte en otra ocasión
            </p>
          </div>
        )
      }

      {/* MODAL CONFIRMAR */}
      <ConfirmModal
        open={modalConfirmar}
        title="Confirmar asistencia"
        message={`¿Deseas confirmar la asistencia de ${cupos} persona(s)?`}
        confirmText="Sí, confirmar"
        onCancel={() => setModalConfirmar(false)}
        onConfirm={async () => {
          await confirmarAsistencia(invitado.id, cupos);
          setModalConfirmar(false);
          await reloadInvitado();
        }}
      />

      {/* MODAL RECHAZAR */}
      <ConfirmModal
        open={modalRechazar}
        title="No podré asistir"
        message="¿Estás seguro de que no podrás asistir al evento?"
        confirmText="Sí, confirmar"
        onCancel={() => setModalRechazar(false)}
        onConfirm={async () => {
          await rechazarAsistencia(invitado.id);
          setModalRechazar(false);
          await reloadInvitado();
        }}
      />
    </div>
  );
}
