import { useEffect, useState } from "react";
import { actualizarInvitado, crearInvitado } from "../services/invitados.service";
import type { Invitado } from "../../models/Invitado";

interface Props {
  invitado: Invitado | null;
  onCreated: () => void;
}

export default function AddInvitadoForm({ invitado, onCreated }: Props) {
  const [nombre, setNombre] = useState("");
  const [cupos, setCupos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (invitado) {
      setIdEdit(invitado.id);
      setNombre(invitado.nombre);
      setCupos(String(invitado.cuposAsignados));
      setTelefono(String(invitado.telefono));
    }
  }, [invitado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) return;

    try {
      setLoading(true);

      if (idEdit) {
        await actualizarInvitado(
          idEdit,
          {
            nombre: nombre.trim(),
            cuposAsignados: Number(cupos),
            telefono: telefono.trim(),
          }
        );
      } else {
        await crearInvitado(
          nombre.trim(),
          Number(cupos),
          telefono.trim(),
        );
      }

      setNombre("");
      setCupos("");
      setTelefono("");
      setIdEdit("");
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
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Cupos asignados</label>
        <input
          type="text"
          value={cupos}
          disabled={loading}
          required
          onChange={(e) => setCupos(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Teléfono del invitado</label>
        <input
          type="text"
          value={telefono}
          disabled={loading}
          required
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <div className="buttons-form-set">
        <button type="button"
          disabled={loading}
          onClick={() => {
            setNombre("");
            setCupos("");
            setTelefono("");
            setIdEdit("");
          }}
          className="buttons-form-set__btn buttons-form-set__btn--outline">
            {idEdit === "" ? "Resetear" : "Cancelar"}
        </button>
        <button type="submit" disabled={loading} className="buttons-form-set__btn">
          {loading ? "Guardando..." : (idEdit === "" ? "Agregar invitación" : "Editar invitación")}
        </button>
      </div>
    </form>
  );
}
