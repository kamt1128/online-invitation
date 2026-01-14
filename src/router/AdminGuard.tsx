import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import type { JSX } from "react";
import LoadingAdmin from "../admin/components/LoadingAdmin";

export default function AdminGuard({
  children,
}: {
  children: JSX.Element;
}) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <LoadingAdmin />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
