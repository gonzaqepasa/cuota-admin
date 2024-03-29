export function fromNameToUrl(name: string): string {
  const arr = name.split(" ");
  return arr.join("%20");
}
  


  export function fromUrlToName(name: string): String {
    const arr = name.split("-");
    if (arr.length > 1) {
      return `${arr[0]} ${arr[1]}`.toLowerCase();
    }
    return name.toLowerCase();
  }