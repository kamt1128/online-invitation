import { logoutAdmin } from "../../firebase/auth";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <h2>Dashboard – Mis 15 Años</h2>
      <button onClick={logoutAdmin}>Cerrar sesión</button>
    </header>
  );
}
