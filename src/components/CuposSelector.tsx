import { motion } from "framer-motion";

interface Props {
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export default function CuposSelector({
  max,
  value,
  onChange,
}: Props) {
  return (
    <div className="cupos">
      <p className="cupos__label">
        ¿Cuántas personas asistirán?
      </p>

      <div className="cupos-botones">
        {Array.from({ length: max }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => onChange(i + 1)}
            className={"cupos-botones__btn " + (value === i + 1 ? "cupos-botones__btn--activo" : "")}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
