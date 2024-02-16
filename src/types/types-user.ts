export interface typesUser {
  // Información personal
  // Se genera a travez de inputs
  name: string;
  phone?: string;
  email?: string;
  dni?: number;
  description?: string;

  // Información de actividad que realiza y modalidad
  // Se genera con el select agarrando información de los estados
  active: boolean;
  activity: typesActivity;
  activityId: number;

  // Información de pago
  // Se genera de forma automatica
  calendar: typesCalendar;

  id?: string;
}

export type typesEditName = Pick<typesUser, "id" | "name">;

export interface typesActivity {
  nameActivity: string;
  modality: string;
  color: string;
  price: number;
  id: number;
  User?:typesUser[]
}

export interface typesCalendar {
  months: typesMonth[];
  id: number;
  User: typesUser;
}

export interface typesMonth {
  monthName: string;
  comment?: string;
  addData?: string;
  addAdmin?: string;
  isPay: boolean;
  mothodPay: String;
  pricePay: number;
  id: number;
  calendar: typesCalendar;
}

export type typesMonthNames =
  | "Enero"
  | "Febrero"
  | "Marzo"
  | "Abril"
  | "Mayo"
  | "Junio"
  | "Julio"
  | "Agosto"
  | "Septiembre"
  | "Octubre"
  | "Noviembre"
  | "Diciembre";
