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
  return array
}
