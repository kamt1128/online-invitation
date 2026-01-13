import {
  collection,
  getDocs,
  QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { Invitado } from "../../models/Invitado";

export const obtenerInvitados = async (): Promise<Invitado[]> => {
  const snapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, "invitados")
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Invitado, "id">),
  }));
};

export const calcularMetricas = (invitados: Invitado[]) => {
  const confirmados = invitados.filter(i => i.confirmado === true);
  const rechazados = invitados.filter(i => i.confirmado === false);
  const pendientes = invitados.filter(i => i.confirmado === null);

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
