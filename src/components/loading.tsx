import { motion } from "framer-motion";
import "../styles/_loading.scss";
import backgroundCard from "../assets/background-card.svg";
import marianaIsabel from "../assets/mariana-isabel.png";



type LoadingProps = {
    delay?: number;
};

export default function Loading({ delay = 0.5 }: LoadingProps) {
  return (
    <div className="container loading">
        <div className="fondo-radial-center float-element"></div>
        <div className="background-card float-element">
            <img src={backgroundCard} alt="Background Card" className="background-card__image" />
        </div>
        <div className="border-vintage float-element"></div>
        <motion.img 
            className="loading__image"
            src={marianaIsabel} alt="Mariana Isabel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "linear", delay }}
        />
        <motion.p 
            className="loading__motivo motivo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "linear", delay }}
        >
            <span className="motivo--capitalize">M</span>is
            <span className="motivo--capitalize"> Q</span>uince 
            <span className="motivo--capitalize"> A</span>ños
        </motion.p>
    </div>
  );
}