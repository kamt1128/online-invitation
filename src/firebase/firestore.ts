import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { Invitado } from "../models/Invitado";


export const obtenerInvitadoPorToken = async (
  token: string
): Promise<Invitado | null> => {
  const ref = doc(db, "invitados", token);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Invitado, "id">) };
};

export const confirmarAsistencia = async (
  id: string,
  cupos: number
): Promise<void> => {
  await updateDoc(doc(db, "invitados", id), {
    confirmado: true,
    cuposConfirmados: cupos,
    fechaConfirmacion: serverTimestamp()
  });
};

export const rechazarAsistencia = async (id: string): Promise<void> => {
  await updateDoc(doc(db, "invitados", id), {
    confirmado: false,
    cuposConfirmados: 0,
    fechaConfirmacion: serverTimestamp()
  });
};
