export function sortedByDate(array) {
  return [...array].sort((a, b) => Date.parse(a) - Date.parse(b));
}
