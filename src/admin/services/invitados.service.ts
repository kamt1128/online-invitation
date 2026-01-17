import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { Invitado } from "../../models/Invitado";

export const crearInvitado = async (
  nombre: string,
  cuposAsignados: number,
  telefono: string
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
  data: Pick<Invitado, "nombre" | "cuposAsignados" | "telefono">
): Promise<void> => {
  await updateDoc(doc(db, "invitados", id), data);
};

export const obtenerInvitados = async (
  status: string,
  search: string | null
): Promise<Invitado[]> => {

  const constraints: QueryConstraint[] = [];

  // ---- STATUS ----
  if (status === "confirmado") {
    constraints.push(
      where("confirmado", "==", true),
      where("cuposConfirmados", ">", 0),
      orderBy("cuposConfirmados", "asc")
    );
  }

  if (status === "rechazado") {
    constraints.push(
      where("confirmado", "==", true),
      where("cuposConfirmados", "<=", 0),
      orderBy("cuposConfirmados", "asc")
    );
  }

  if (status === "pendiente") {
    constraints.push(
      where("confirmado", "==", false)
    );
  }

  // ---- ORDEN SECUNDARIO ----
  constraints.push(orderBy("nombre", "asc"));

  // ---- SEARCH ----
  if (search?.trim()) {
    const name = search.charAt(0).toUpperCase() + search.slice(1)
    constraints.push(
      where("nombre", ">=", name),
      where("nombre", "<=", name + "\uf8ff")
    );
  }

  const q = query(collection(db, "invitados"), ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Invitado, "id">),
  }));
};

export const calcularMetricas = (invitados: Invitado[]) => {
  return invitados.reduce(
    (acc, i) => {
      acc.totalInvitados++;

      acc.cuposAsignados += i.cuposAsignados;

      if (i.confirmado) {
        acc.confirmados++;

        acc.cuposConfirmados += i.cuposConfirmados ?? 0;

        const liberados = i.cuposAsignados - (i.cuposConfirmados ?? 0);
        acc.cuposLiberados += liberados > 0 ? liberados : 0;

        if ((i.cuposConfirmados ?? 0) <= 0) {
          acc.rechazados++;
        }
      } else {
        acc.pendientes++;
      }

      return acc;
    },
    {
      totalInvitados: 0,
      confirmados: 0,
      rechazados: 0,
      pendientes: 0,
      cuposAsignados: 0,
      cuposConfirmados: 0,
      cuposLiberados: 0,
      cuposPendientes: 0,
    }
  );
};
