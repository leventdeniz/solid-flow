export function getBottomCenterOfElement(x: number, y: number, width: number, height: number, offset: number) {
  return { x: x + (width / 2), y: y + height + offset };
}

export function getTopCenterOfElement(x: number, y: number, width: number, height: number, offset: number) {
  return { x: x + (width / 2), y: y - offset };
}
export function getLeftCenterOfElement(x: number, y: number, width: number, height: number, offset: number) {
  return { x: x - offset, y: y + (height / 2) };
}
export function getRightCenterOfElement(x: number, y: number, width: number, height: number, offset: number) {
  return { x: x + width + offset, y: y + (height / 2) };
}
