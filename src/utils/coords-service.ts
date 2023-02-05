export function getBottomCenterOfElement(x: number, y: number, width: number, height: number) {
    return { x: x + (width / 2), y: y + height };
}

export function getTopCenterOfElement(x: number, y: number, width: number, height: number) {
    return { x: x + (width / 2), y: y };
}
export function getLeftCenterOfElement(x: number, y: number, width: number, height: number) {
    return { x: x, y: y + (height / 2) };
}
export function getRightCenterOfElement(x: number, y: number, width: number, height: number) {
    return { x: x + width, y: y + (height / 2) };
}
