export const isUserWithinPaymentMonth = (paymentDate: string): boolean => {
  // Obtener la fecha actual
  const currentDate = new Date();

  // Convertir la fecha de pago a objeto Date
  const paymentDateTime = new Date(paymentDate);

  // Calcular la fecha límite como un mes después de la fecha de pago
  const limitDate = new Date(
    paymentDateTime.getFullYear(),
    paymentDateTime.getMonth(),
    paymentDateTime.getDate()
  );
  limitDate.setMonth(limitDate.getMonth() + 1);

  // Verificar si la fecha actual está después de la fecha de pago y antes de un mes después de la fecha de pago
  // console.log(
  //   `${currentDate} >= ${paymentDateTime} && ${currentDate} < ${limitDate})`
  // );
  return currentDate >= paymentDateTime && currentDate < limitDate;
};

export const getTimeRemaining = (
  endDate: Date
): { days: number; hours: number; minutes: number; seconds: number } => {
  const totalMilliseconds = endDate.getTime() - new Date().getTime();
  const totalSeconds = Math.floor(totalMilliseconds / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds };
};

export const displayTimeRemaining = (time: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return `${time.days}  ${time.hours}:${time.minutes}:${time.seconds}`;
};

// // Uso:
// const paymentDate = new Date("2022-06-15");
// const remainingTime = getTimeRemaining(paymentDate);
// const formattedTime = displayTimeRemaining(remainingTime);
// console.log("Tiempo restante:", formattedTime);
