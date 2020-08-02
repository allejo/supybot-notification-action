export enum Color {
    Transparent = -1,
    White = 0,
    Black = 1,
    Blue = 2,
    Green = 3,
    Red = 4,
    Brown = 5,
    Purple = 6,
    Orange = 7,
    Yellow = 8,
    LimeGreen = 9,
    Turquise = 10,
    Cyan = 11,
    LightBlue = 12,
    Pink = 13,
    Grey = 14,
    LightGrey = 15,
}

export enum ControlCode {
    Bold          = 0x02,
    Color         = 0x03,
    Italic        = 0x09,
    StrikeThrough = 0x13,
    Reset         = 0x0f,
    Underline2    = 0x15,
    Underline     = 0x1f,
    Reverse       = 0x16,
}

function padNumber(value: number, size: number, padding: string = '0'): string {
    return (padding.repeat(size) + String(value)).substr(-size);
}

export function applyColor(message: string, foreground: Color, background?: Color): string {
    if (background == null) {
        return applyControl(`${padNumber(foreground, 2)}${message}`, ControlCode.Color);
    }

    return applyControl(`${padNumber(foreground, 2)},${padNumber(background, 2)}${message}`, ControlCode.Color);
}

export function applyControl(message: string, control: ControlCode): string {
    return String.fromCharCode(control) + message + String.fromCharCode(ControlCode.Reset);
}
