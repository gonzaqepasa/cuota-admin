import { typesMonth, typesUser } from "../types/types-user";

export function orderByMonth(array: any[]) {
  array.sort((a, b) => {
    const nameA = a.monthNum; // ignore upper and lowercase
    const nameB = b.monthNum; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  return array;
}

export function orderByActive(array: any[]) {
  array.sort((a, b) => {
    const nameA = a.active; // ignore upper and lowercase
    const nameB = b.active; // ignore upper and lowercase
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }

    // names must be equal
    return 0;
  });
  return array;
}
export function orderByName(array: any[]) {
  array.sort((a, b) => {
    const nameA = a.name; // ignore upper and lowercase
    const nameB = b.name; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  return array;
}
export function orderByNameActivity(array: any[]) {
  array.sort((a, b) => {
    const nameA = a.nameActivity; // ignore upper and lowercase
    const nameB = b.nameActivity; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  return array;
}

export function orderById(array: any[]) {
  array.sort((a, b) => {
    const nameA = a.id; // ignore upper and lowercase
    const nameB = b.id; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  return array;
}
export function orderByDate(array: typesMonth[]) {
  array.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime(); // Convertir la fecha a milisegundos
    const dateB = new Date(b.createdAt).getTime(); // Convertir la fecha a milisegundos

    return dateB - dateA; // Ordenar en orden ascendente
    // Para ordenar en orden descendente: return dateB - dateA;
  });
  return array;
}
export function orderByUpdate(array: typesUser[]) {
  array.sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime(); // Convertir la fecha a milisegundos
    const dateB = new Date(b.updatedAt).getTime(); // Convertir la fecha a milisegundos

    return dateB - dateA; // Ordenar en orden ascendente
    // Para ordenar en orden descendente: return dateB - dateA;
  });
  return array;
}
