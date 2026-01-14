import { motion } from "framer-motion";

interface Props {
  onConfirmar: () => void;
  onRechazar: () => void;
}

export default function Confirmacion({
  onConfirmar,
  onRechazar,
}: Props) {
  return (
    <div className="confirmacion">
      <motion.button 
        className="confirmacion__btn confirmacion__btn--no" 
        onClick={onRechazar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        No podré asistir
      </motion.button>
      
      <motion.button 
        className="confirmacion__btn confirmacion__btn--ok" 
        onClick={onConfirmar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Confirmar asistencia
      </motion.button>
    </div>
  );
}
