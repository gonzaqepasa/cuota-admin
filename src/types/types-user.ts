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
  activity: {
    name: string;
    modality: string;
  };

  // Información de pago
  // Se genera de forma automatica
  installments: {
    2023: {
      monthName: string;
      comment?: string;
      addData?: string;
      addAdmin?: string;
      isPay: boolean;
    }[];
  };
  id?: string;
}
