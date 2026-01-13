import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invitacion from "../pages/Invitacion";
import Confirmado from "../pages/Confirmado";
import AdminGuard from "./AdminGuard";
import Dashboard from "../admin/pages/Dashboard";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inv/:token" element={<Invitacion />} />
        <Route path="/confirmado" element={<Confirmado />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <Dashboard />
            </AdminGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
