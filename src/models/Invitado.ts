import { Timestamp } from "firebase/firestore";

export interface Invitado {
  id: string;
  nombre: string;
  cuposAsignados: number;
  cuposConfirmados: number | null;
  confirmado: boolean | null;
  fechaConfirmacion: Timestamp | null;
  token: string;
  canalEnvio?: "whatsapp" | "email";
  enviado?: boolean;
  fechaEnvio?: Timestamp;
  telefono?: string;
}
