import { useCallback, useMemo, useState } from "react";
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
import FiltersList from "../components/filtersList";
import { useDebounce } from "../../hooks/useDebounce";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [updatingTable, setUpdatingTable] = useState(false);

  const [allInvitados, setAllInvitados] = useState<Invitado[]>([]);
  const [filteredInvitados, setFilteredInvitados] = useState<Invitado[]>([]);

  const [invEdit, setInvEdit] = useState<Invitado | null>(null);

  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // 🔥 debounce aplicado
  const debouncedSearch = useDebounce(searchFilter, 400);

  // 🔹 Fetch explícito (evento)
  const fetchInvitados = useCallback(
    async (status: string, search: string | null) => {
      setUpdatingTable(true);

      const data = await obtenerInvitados(status, search);

      if ((search && search?.length > 0) || status.length > 0) {
        setFilteredInvitados(data);
      } else {
        setAllInvitados(data);
        setFilteredInvitados(data);
      }
      setLoading(false);
      setUpdatingTable(false);
    },
    []
  );

  // 🔹 Carga inicial (UNA sola vez)
  useState(() => {
    fetchInvitados("", debouncedSearch);
  });

  // 🔹 Métricas memorizadas
  const stats = useMemo(
    () => calcularMetricas(allInvitados),
    [allInvitados]
  );

  const editInvitado = useCallback((inv: Invitado) => {
    setInvEdit(inv);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔹 Filtros = eventos
  const onSearch = useCallback(
    (search: string | null) => {
      setSearchFilter(search);
      fetchInvitados(statusFilter, search);
    },
    [fetchInvitados, statusFilter]
  );

  const onStatus = useCallback(
    (status: string) => {
      setStatusFilter(status);
      fetchInvitados(status, debouncedSearch);
    },
    [fetchInvitados, debouncedSearch]
  );

  if (loading) return <LoadingAdmin />;

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <AdminHeader />

      <div className="stats">
        <StatsCard label="Invitaciones creadas" value={stats.totalInvitados} color="blue" />
        <StatsCard label="Invitaciones confirmadas" value={stats.confirmados} color="purple" />
        <StatsCard label="Invitaciones rechazadas" value={stats.rechazados} color="gray" />
        <StatsCard label="Invitaciones pendientes" value={stats.pendientes} color="orange" />
        <StatsCard label="Cupos confirmados" value={stats.cuposConfirmados} color="green" />
        <StatsCard label="Cupos pendientes" value={stats.cuposPendientes} color="red" />
        <StatsCard label="Cupos liberados" value={stats.cuposLiberados} color="brown" />
      </div>

      <AddInvitadoForm
        invitado={invEdit}
        onCreated={() => {setStatusFilter(""); setSearchFilter(null); fetchInvitados(statusFilter, debouncedSearch)}}
      />

      <div className="table-wrapper">

        <FiltersList onSearch={onSearch} onStatus={onStatus}/>

        {updatingTable && (
          <p className="loading-data-message">Cargando datos...</p>
        )}

        {!updatingTable && filteredInvitados.length === 0 && (
          <p className="loading-data-message">¡No hay invitaciones!</p>
        )}

        <InvitadosTable
          invitados={filteredInvitados}
          loadingData={updatingTable}
          onEdit={editInvitado}
        />
      </div>
    </motion.div>
  );
}
