import { motion } from "framer-motion";
import "../styles/_tarjeta.scss";
import MapaButton from "./MapaButton";

interface Props {
  nombreInvitado: string;
}

export default function TarjetaInvitacion({
  nombreInvitado,
}: Props) {
  return (
    <motion.div 
      className="tarjeta"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="tarjeta__nombre">Mariana Isabel</h1>
      <h2 className="tarjeta__motivo">Quince Años</h2>

      <p className="tarjeta__mensaje">
        Bajo el amparo del Altísimo y en compañía de mis padres tenemos el gran
        honor de invitarles a celebrar con nosotros
      </p>

      <p className="tarjeta__invitado">
        Querido/a <strong>{nombreInvitado}</strong>
      </p>

      <div className="tarjeta__detalle">
        <p><strong>Día:</strong> Enero 31 de 2026</p>
        <p><strong>Hora:</strong> 7:00 p.m.</p>
        <p><strong>Lugar:</strong> Salón de eventos CHELISHA</p>
        <p className="tarjeta__direccion">
          Barrio Los Alpes CLL 31D #71E34<br />
          (Entrando por el antiguo fogón cartagenero)
        </p>
        <MapaButton />
      </div>

      <div className="tarjeta__vestuario">
        <p><strong>Código de vestuario:</strong> Formal</p>
        <p className="tarjeta__colores">
          Colores reservados: Tonos de morado
        </p>
      </div>

      <div className="tarjeta__regalo">
        <span>✉️</span>
        <p>Lluvia de sobres</p>
      </div>

      <div className="tarjeta__final">
        <p>¡Eres parte de mi historia!</p>
        <p className="tarjeta__final--italic">
          Acompáñame en esta fecha especial.
        </p>
      </div>
    </motion.div>
  );
}
