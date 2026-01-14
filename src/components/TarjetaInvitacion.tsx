import { motion } from "framer-motion";
import "../styles/_tarjeta.scss";
import MapaButton from "./MapaButton";
import MusicPlayer from "./MusicPlayer";
import marianaIsabel from "../assets/mariana-isabel.png";
import envelope from "../assets/envelope.svg";



interface Props {
  nombreInvitado: string;
}

export default function TarjetaInvitacion({
  nombreInvitado,
}: Props) {
  return (
    <motion.div 
      className="tarjeta"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MusicPlayer />
      <img src={marianaIsabel} alt="Mariana Isabel" className="tarjeta__nombre" />
      <h2 className="tarjeta__motivo motivo">
        <span className="motivo--capitalize">M</span>is
        <span className="motivo--capitalize"> Q</span>uince 
        <span className="motivo--capitalize"> A</span>ños
      </h2>

      <div className="content">
        <p className="tarjeta__invitado">
          Querido/a<br />
          <strong className="tarjeta__invitado--name">{nombreInvitado}</strong>
        </p>

        <p className="tarjeta__mensaje">
          "Bajo el amparo del Altísimo y en compañía de mis padres tenemos el gran
          honor de invitarles a celebrar con nosotros"
        </p>

        <div className="tarjeta-detalle">
          <div className="detalle-date">
            <span className="detalle-date__month">Enero</span>
            <span className="detalle-date__day">31</span>
            <span className="detalle-date__year">2026</span>
          </div>
          <p><strong>Hora:</strong> 7:00 p.m.</p>
          <p><strong>Lugar:</strong> Salón de eventos <strong>CHELISHA</strong></p>
          <p className="tarjeta__direccion">
            Barrio Los Alpes CLL 31D #71E34<br />
            (Entrando por el antiguo fogón cartagenero)
          </p>
          <MapaButton />
        </div>

        <div className="tarjeta__vestuario">
          <p><strong>Código de vestuario:</strong> Formal</p>
          <p className="tarjeta__colores">
            <strong>Colores reservados:</strong> Tonos de morado
          </p>
        </div>

        <div className="tarjeta-regalo">
          <img src={envelope} alt="Envelope" className="tarjeta-regalo__icon" />
          <span className="tarjeta-regalo__text">Lluvia de sobres</span>
        </div>

        <div className="tarjeta__final">
          <p>¡Eres parte de mi historia!</p>
          <p className="tarjeta__final--italic">
            Acompáñame en esta fecha especial.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
