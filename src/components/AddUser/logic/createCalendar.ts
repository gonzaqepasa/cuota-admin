export function createCalendar2023() {
  const calendar = [];
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const date = new Date();
  for (let i = 0; i < 12; i++) {
    calendar.push({
      monthName: monthNames[i],
      comment: "",
      addData: "",
      addAdmin: "",
      isPay: false,
    });
  }
  return calendar;
}
