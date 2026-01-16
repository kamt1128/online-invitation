import { motion } from "framer-motion";
import "../styles/_tarjeta.scss";
import marianaIsabel from "../assets/mariana-isabel.png";

export default function TarjetaInvitacion() {
  return (
    <motion.div 
      className="tarjeta"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={marianaIsabel} alt="Mariana Isabel" className="tarjeta__nombre" />
      <h2 className="tarjeta__motivo motivo">
        <span className="motivo--capitalize">M</span>is
        <span className="motivo--capitalize"> Q</span>uince 
        <span className="motivo--capitalize"> A</span>ños
      </h2>

      <div className="content">
        <p className="tarjeta__mensaje">
          "Todo tiene su tiempo, y hoy es el de agradecer  a Dios, por el don de la vida."
        </p>
        <p className="tarjeta-detalle__text" style={{maxWidth: "350px", margin: "0 auto 1rem", lineHeight: "1.3", fontWeight: "600"}}>
          Tengo la alegría de invitarte a celebrar mis quince años.
        </p>

        <div className="tarjeta-detalle">
          <div className="detalle-date">
            <span className="detalle-date__month">Enero</span>
            <span className="detalle-date__day">29</span>
            <span className="detalle-date__year">2026</span>
          </div>
          <p className="tarjeta-regalo" style={{fontSize: "1.2rem", fontWeight: "500", marginBottom: "0.5rem"}}>
            Eucaristía de Acción de Gracias
          </p>
          <p className="tarjeta-detalle__text"><strong>Hora:</strong> 6:00 p.m.</p>
          <p className="tarjeta-detalle__text"><strong>Lugar:</strong> Parroquia San Juan Bosco</p>

          <p className="tarjeta-regalo" style={{fontSize: "1.05rem", fontWeight: "500", maxWidth: "360px", margin: "1rem auto 1rem", lineHeight: "1.3"}}>
            Al terminar la misa, te espero en mi casa para compartir el tradicional brindis y corte de la torta
          </p>
          <p className="tarjeta__direccion">
            Barrio San Fernando,<br />
            Calle Kalamary No. 01, Mz 06, Lote 03
          </p>
        </div>

        <div className="tarjeta__final">
          <p>Tu compañía es muy importante para mí.</p>
          <p className="tarjeta__final--italic">
            ¡Te esperamos!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
