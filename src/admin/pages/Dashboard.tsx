import { useEffect, useState } from "react";
import type { Invitado } from "../../models/Invitado";
import {
  obtenerInvitados,
  calcularMetricas,
} from "../services/invitados.service";
import StatsCard from "../components/StatsCard";
import InvitadosTable from "../components/InvitadosTable";
import AdminHeader from "../components/AdminHeader";
import "../../styles/_dashboard.scss";
import AddInvitadoForm from "../components/AddInvitadoForm";
import { motion } from "framer-motion";
import LoadingAdmin from "../components/LoadingAdmin";

export default function Dashboard() {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchInvitados = async () => {
      const data = await obtenerInvitados();

      if (!isMounted) return;

      setInvitados(data);
      setLoading(false);
    };

    fetchInvitados();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <LoadingAdmin />;

  const stats = calcularMetricas(invitados);

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AdminHeader />

      <div className="stats">
        <StatsCard label="Invitados" value={stats.totalInvitados} color="red" />
        <StatsCard label="Confirmados" value={stats.confirmados} color="blue" />
        <StatsCard label="Pendientes" value={stats.pendientes} color="green" />
        <StatsCard label="No asisten" value={stats.rechazados} color="gray" />
        <StatsCard
          label="Personas confirmadas"
          value={stats.personasConfirmadas}
          color="purple"
        />
        <StatsCard label="Cupos libres" value={stats.cuposLibres} color="orange" />
      </div>
      <AddInvitadoForm
        onCreated={async () => {
          setLoading(true);
          const data = await obtenerInvitados();
          setInvitados(data);
          setLoading(false);
        }}
      />
      <InvitadosTable invitados={invitados} />
    </motion.div>
  );
}
