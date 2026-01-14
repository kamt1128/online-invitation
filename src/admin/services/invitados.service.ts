import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { Invitado } from "../../models/Invitado";

export const crearInvitado = async (
  nombre: string,
  cuposAsignados: number,
  telefono: string
) => {
  await addDoc(collection(db, "invitados"), {
    nombre,
    cuposAsignados,
    cuposConfirmados: 0,
    confirmado: false,
    telefono
  });
};

export const obtenerInvitados = async (): Promise<Invitado[]> => {
  const q = query(
    collection(db, "invitados"),
    orderBy("nombre", "asc")
  );
  const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Invitado, "id">),
  }));
};

export const calcularMetricas = (invitados: Invitado[]) => {
  const confirmados = invitados.filter(i => i.confirmado === true);
  const rechazados = invitados.filter(i => i.confirmado === true && i.cuposConfirmados <= 0);
  const pendientes = invitados.filter(i => i.confirmado === false);

  const personasConfirmadas = confirmados.reduce(
    (acc, i) => acc + (i.cuposConfirmados ?? 0),
    0
  );

  const cuposAsignados = invitados.reduce(
    (acc, i) => acc + i.cuposAsignados,
    0
  );

  return {
    totalInvitados: invitados.length,
    confirmados: confirmados.length,
    rechazados: rechazados.length,
    pendientes: pendientes.length,
    personasConfirmadas,
    cuposLibres: cuposAsignados - personasConfirmadas,
  };
};
