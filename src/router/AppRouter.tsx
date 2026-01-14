import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invitacion from "../pages/Invitacion";
import AdminGuard from "./AdminGuard";
import Dashboard from "../admin/pages/Dashboard";
import Login from "../pages/Login";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:token" element={<Invitacion />} />
        <Route path="/login" element={<Login />} />
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
