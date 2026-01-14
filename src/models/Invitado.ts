import { Timestamp } from "firebase/firestore";

export interface Invitado {
  id: string;
  nombre: string;
  cuposAsignados: number;
  cuposConfirmados: number;
  confirmado: boolean;
  fechaConfirmacion: Timestamp | null;
  token: string;
  canalEnvio?: "whatsapp" | "email";
  enviado?: boolean;
  fechaEnvio?: Timestamp;
  telefono?: string;
}
