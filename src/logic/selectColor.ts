export function selectColor(act: String): string {
  if (act.toLowerCase() === "funcional") return `red`;
  if (act.toLowerCase() === "taekwondo") return `skyblue`;
  if (act.toLowerCase() === "power box") return `green`;
  if (act.toLowerCase() === "zumba") return `violet`;
  if (act.toLowerCase() === "kick boxing") return `orange`;
  if (act.toLowerCase() === "ritmo kids") return `pink`;
  return 'white'
}
