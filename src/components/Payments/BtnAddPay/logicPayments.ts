import { typesUser } from "../../../types/types-user";

export const calculateExpirationDate = (
  creationDate: Date,
  monthsToAdd: number
): Date => {
  // Crear una nueva fecha basada en la fecha de creación
  const expirationDate = new Date(creationDate);

  // Agregar la cantidad de meses especificada
  expirationDate.setMonth(expirationDate.getMonth() + monthsToAdd);

  return expirationDate;
};

export const getByLastPay = (user: typesUser) => {
  // Ordenar los meses por fecha de creación en orden descendente
  const sortedMonths = user.months.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Tomar el primer elemento, que será el último pago
  return sortedMonths[0];
};
