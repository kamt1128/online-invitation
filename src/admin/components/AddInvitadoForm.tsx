import { useState } from "react";
import { crearInvitado } from "../services/invitados.service";

interface Props {
  onCreated: () => void;
}

export default function AddInvitadoForm({ onCreated }: Props) {
  const [nombre, setNombre] = useState("");
  const [cupos, setCupos] = useState(1);
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) return;

    try {
      setLoading(true);

      await crearInvitado(nombre.trim(), cupos, telefono.trim());

      setNombre("");
      setCupos(1);
      setTelefono("");
      onCreated(); 
    } catch (error) {
      console.error("Error creando invitado", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Nombre del invitado</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Juan Pérez"
          required
        />
      </div>

      <div className="form-group">
        <label>Cupos asignados</label>
        <input
          type="number"
          min={1}
          max={10}
          value={cupos}
          onChange={(e) => setCupos(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Teléfono del invitado</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Agregar invitación"}
      </button>
    </form>
  );
}
