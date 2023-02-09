export interface typesUser {
  // Información personal
  // Se genera a travez de inputs
  name: string;
  phone?: number;
  email?: string;
  dni?: number;
  description?: string;

  // Información de actividad que realiza y modalidad
  // Se genera con el select agarrando información de los estados
  active: boolean;
  activity: typesActivity;

  // Información de pago
  // Se genera de forma automatica
  calendar: typesCalendar;

  id?: string;
}
export interface typesActivity {
  nameActivity: string;
  modality: string;
  price: number;
  id: number;
}

export interface typesCalendar {
  months: typesMonth[];
}

export interface typesMonth {
  monthName: string;
  comment?: string;
  addData?: string;
  addAdmin?: string;
  isPay: boolean;
  mothodPay: String;
  pricePay: number;
}
