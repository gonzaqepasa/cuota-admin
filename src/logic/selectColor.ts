export function selectColor(act: String): string {
  if (act.toLowerCase() === "gimnasio") return `#FF2E00`;
  if (act.toLowerCase() === "taekwondo") return `#1155DB`;
  if (act.toLowerCase() === "power box") return `#128300`;
  if (act.toLowerCase() === "zumba") return `#DB0135`;
  if (act.toLowerCase() === "kick boxing") return `#FF9501`;
  if (act.toLowerCase() === "ritmo kids") return `#AD00DB`;
  if (act.toLowerCase() === "jiu jitzu") return `#f3e300`;
  if (act.toLowerCase() === "gap funcional") return `#30E3DF`;
  return 'white'
}
