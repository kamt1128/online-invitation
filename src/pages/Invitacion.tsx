import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TarjetaInvitacion from "../components/TarjetaInvitacion";
import type { Invitado } from "../models/Invitado";
import { obtenerInvitadoPorToken } from "../firebase/firestore";
import Loading from "../components/loading";
import backgroundCard from "../assets/background-card.svg";

export default function Invitacion() {
  const { token } = useParams<{ token: string }>();

  const [invitado, setInvitado] = useState<Invitado | null>(null);

  useEffect(() => {
    if (!token) return;

    const loadInvitado = async () => {
      const data = await obtenerInvitadoPorToken(token);

      if (!data) return;

      setInvitado(data);
    };

    loadInvitado();
  }, [token]);


  if (!invitado) return <Loading />;

  return (
    <div className="pagina-invitacion container">
      <div className="fondo-radial-top float-element"></div>
      <div className="background-card float-element">
        <img src={backgroundCard} alt="Background Card" className="background-card__image" />
      </div>
      <div className="border-vintage float-element"></div>
      <TarjetaInvitacion />
    </div>
  );
}
