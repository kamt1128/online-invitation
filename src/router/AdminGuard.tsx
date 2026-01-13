import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import type { JSX } from "react";

export default function AdminGuard({
  children,
}: {
  children: JSX.Element;
}) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
