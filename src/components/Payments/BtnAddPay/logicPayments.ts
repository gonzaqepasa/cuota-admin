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
