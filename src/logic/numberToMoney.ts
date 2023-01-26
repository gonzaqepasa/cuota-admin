export function numberToMoney(number: number): string {
  return new Intl.NumberFormat("es-AR", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: 'ARS'
  }).format(number);
}
