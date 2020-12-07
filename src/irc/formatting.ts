// Using Colors and Control Codes from
//   https://modern.ircdocs.horse/formatting.html

export enum IRCColor {
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
	Cyan = 10,
	LightCyan = 11,
	LightBlue = 12,
	Pink = 13,
	Grey = 14,
	LightGrey = 15,
}

export enum IRCControlCode {
	Bold = 0x02,
	Color = 0x03,
	Italic = 0x1d,
	StrikeThrough = 0x1e,
	Reset = 0x0f,
	Underline = 0x1f,
	Reverse = 0x16,
}

function padNumber(value: number, size: number, padding = '0'): string {
	return (padding.repeat(size) + String(value)).substr(-size);
}

export function applyColor(
	message: string,
	foreground: IRCColor,
	background?: IRCColor,
): string {
	if (background == null) {
		return applyControl(
			`${padNumber(foreground, 2)}${message}`,
			IRCControlCode.Color,
		);
	}

	return applyControl(
		`${padNumber(foreground, 2)},${padNumber(background, 2)}${message}`,
		IRCControlCode.Color,
	);
}

export function applyControl(message: string, control: IRCControlCode): string {
	return (
		String.fromCharCode(control) +
		message +
		String.fromCharCode(IRCControlCode.Reset)
	);
}
