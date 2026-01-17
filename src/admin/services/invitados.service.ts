import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { Invitado } from "../../models/Invitado";

export const crearInvitado = async (
  nombre: string,
  cuposAsignados: number,
  telefono: string,
): Promise<void> => {
  await addDoc(collection(db, "invitados"), {
    nombre,
    telefono,
    cuposAsignados,
    cuposConfirmados: 0,
    confirmado: false,
  });
};

export const actualizarInvitado = async (
  id: string,
  data: Pick<Invitado, "nombre" | "cuposAsignados" | "telefono">,
): Promise<void> => {
  await updateDoc(doc(db, "invitados", id), data);
};

export const obtenerInvitados = async (
  status: string,
  search: string | null,
): Promise<Invitado[]> => {
  const constraints: QueryConstraint[] = [];

  // ---- STATUS ----
  if (status === "confirmado") {
    constraints.push(
      where("confirmado", "==", true),
      where("cuposConfirmados", ">", 0),
      orderBy("cuposConfirmados", "asc"),
    );
  }

  if (status === "rechazado") {
    constraints.push(
      where("confirmado", "==", true),
      where("cuposConfirmados", "<=", 0),
      orderBy("cuposConfirmados", "asc"),
    );
  }

  if (status === "pendiente") {
    constraints.push(where("confirmado", "==", false));
  }

  // ---- ORDEN SECUNDARIO ----
  constraints.push(orderBy("nombre", "asc"));

  // ---- SEARCH ----
  if (search?.trim()) {
    const name = search.charAt(0).toUpperCase() + search.slice(1);
    constraints.push(
      where("nombre", ">=", name),
      where("nombre", "<=", name + "\uf8ff"),
    );
  }

  const q = query(collection(db, "invitados"), ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Invitado, "id">),
  }));
};

export const calcularMetricas = (invitados: Invitado[]) => {
  const confirmados = invitados.filter((i) => i.confirmado === true);
  const rechazados = invitados.filter(
    (i) => i.confirmado === true && i.cuposConfirmados <= 0,
  );
  const pendientes = invitados.filter((i) => i.confirmado === false);
  const cuposConfirmados = confirmados.reduce(
    (acc, i) => acc + (i.cuposConfirmados ?? 0),
    0,
  );
  const cuposAsignados = invitados.reduce(
    (acc, i) => acc + i.cuposAsignados,
    0,
  );
  const cuposLiberados = invitados.reduce(
    (acc, i) =>
      i.confirmado ? acc + (i.cuposAsignados - i.cuposConfirmados) : acc,
    0,
  );
  return {
    totalInvitados: invitados.length,
    confirmados: confirmados.length,
    rechazados: rechazados.length,
    pendientes: pendientes.length,
    cuposConfirmados,
    cuposPendientes: cuposAsignados - cuposConfirmados - cuposLiberados,
    cuposLiberados,
  };
};
