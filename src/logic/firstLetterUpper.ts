export function firstLetterUpper(str: string): string {
  try {
    const palabras = str.split(" ");
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    }
    return palabras.join(" ");
  } catch (er) {
    return str;
  }
}
