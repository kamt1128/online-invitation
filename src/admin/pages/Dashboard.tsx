import { useEffect, useState } from "react";
import type { Invitado } from "../../models/Invitado";
import {
  obtenerInvitados,
  calcularMetricas,
} from "../services/invitados.service";
import StatsCard from "../components/StatsCard";
import InvitadosTable from "../components/InvitadosTable";
import AdminHeader from "../components/AdminHeader";

export default function Dashboard() {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerInvitados().then(data => {
      setInvitados(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando dashboard...</p>;

  const stats = calcularMetricas(invitados);

  return (
    <div className="dashboard">
      <AdminHeader />

      <div className="stats">
        <StatsCard label="Invitados" value={stats.totalInvitados} />
        <StatsCard label="Confirmados" value={stats.confirmados} />
        <StatsCard label="Pendientes" value={stats.pendientes} />
        <StatsCard label="No asisten" value={stats.rechazados} />
        <StatsCard
          label="Personas confirmadas"
          value={stats.personasConfirmadas}
        />
        <StatsCard label="Cupos libres" value={stats.cuposLibres} />
      </div>

      <InvitadosTable invitados={invitados} />
    </div>
  );
}
