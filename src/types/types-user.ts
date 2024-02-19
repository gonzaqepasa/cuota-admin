export interface typesUser {
  // Información personal
  // Se genera a travez de inputs
  name: string;
  phoneNumber?: string;
  email?: string;

  description?: string;

  // Información de actividad que realiza y modalidad
  // Se genera con el select agarrando información de los estados
  status:'activo'|'inactivo';
  activity?: typesActivity;
  

  // Información de pago
  // Se genera de forma automatica
 months?:typesMonth[]

  _id?: string;
}


export interface typesActivity {
  nameActivity: string;
  modality: string;
  description?: string;
  color: string;
  price: number;
  _id: string;
  users?: typesUser[];
  months?: typesMonth[];
  updatedAt: string;
  CreatedAt: string;
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
