export function Row(boxes) {
  const row = document.createElement("div");
  row.className = "row";
  row.append(...boxes);
  return row;
}
