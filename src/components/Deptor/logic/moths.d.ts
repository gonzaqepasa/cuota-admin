import { type typesMonthNames } from "../../../types/types-user";

export const arrayMonth: typesMonthNames[] = [
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
export const dateMonth: number = new Date().getMonth();

export const monthOfPay = (month: string): number => arrayMonth.indexOf(month);

export const mesActual = () => arrayMonth[dateMonth];
