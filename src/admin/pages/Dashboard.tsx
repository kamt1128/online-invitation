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
  const [updatingTable, setUpdatingTable] = useState(true);
  const [invEdit, setInvEdit] = useState<Invitado | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchInvitados = async () => {
      const data = await obtenerInvitados();

      if (!isMounted) return;

      setInvitados(data);
      setLoading(false);
      setUpdatingTable(false);
    };

    fetchInvitados();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <LoadingAdmin />;

  const stats = calcularMetricas(invitados);

  const editInvitado = async (inv: Invitado) => {
    setInvEdit(inv);
    window.scrollTo(0, 0);
  }

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AdminHeader />

      <div className="stats">
        <StatsCard label="Invitaciones creadas" value={stats.totalInvitados} color="blue" />
        <StatsCard label="Invitaciones confirmadas" value={stats.confirmados} color="purple" />
        <StatsCard label="Invitaciones rechazadas" value={stats.rechazados} color="gray" />
        <StatsCard label="Invitaciones pendientes" value={stats.pendientes} color="orange" />
        <StatsCard
          label="Cupos confirmados"
          value={stats.cuposConfirmados}
          color="green"
        />
        <StatsCard label="Cupos pendientes" value={stats.cuposPendientes} color="red" />
        <StatsCard label="Cupos liberados" value={stats.cuposLiberados} color="brown" />
      </div>
      <AddInvitadoForm
        invitado={invEdit}
        onCreated={async () => {
          setUpdatingTable(true);
          const data = await obtenerInvitados();
          setInvitados(data);
          setUpdatingTable(false);
        }}
      />
      <InvitadosTable invitados={invitados} loadingData={updatingTable} onEdit={editInvitado} />
    </motion.div>
  );
}
