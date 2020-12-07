import {
	applyColor,
	applyControl,
	IRCColor,
	IRCControlCode,
} from './formatting';

const DIRECTIVE_RE = /<([a-zA-Z:]+)>([^\n]+)<\/\1>/gm;

export function extractDirectives(str: string): [string, string][] {
	const results: [string, string][] = [];
	const matches = str.matchAll(DIRECTIVE_RE);

	for (const match of matches) {
		const directive = match[1];
		const body = match[2];
		const subDirectives = extractDirectives(body);

		results.push([directive, body]);

		if (subDirectives.length > 0) {
			results.push(...subDirectives);
		}
	}

	return results;
}

const ColorDirectives: Record<string, IRCColor> = {
	transparent: IRCColor.Transparent,
	white: IRCColor.White,
	black: IRCColor.Black,
	blue: IRCColor.Blue,
	green: IRCColor.Green,
	red: IRCColor.Red,
	brown: IRCColor.Brown,
	purple: IRCColor.Purple,
	orange: IRCColor.Orange,
	yellow: IRCColor.Yellow,
	limegreen: IRCColor.LimeGreen,
	cyan: IRCColor.Cyan,
	lightcyan: IRCColor.LightCyan,
	lightblue: IRCColor.LightBlue,
	pink: IRCColor.Pink,
	grey: IRCColor.Grey,
	lightgrey: IRCColor.LightGrey,
};

const FormatDirectives: Record<string, IRCControlCode> = {
	bold: IRCControlCode.Bold,
	italic: IRCControlCode.Italic,
	strike: IRCControlCode.StrikeThrough,
	underline: IRCControlCode.Underline,
};

function applyDirective(str: string, directiveTuple: [string, string]): string {
	const [directive, body] = directiveTuple;
	const replaceTarget = `<${directive}>${body}</${directive}>`;
	const [fg, bg] = directive.split(':');
	let result: string = body;

	if (ColorDirectives.hasOwnProperty(fg)) {
		result = applyColor(body, ColorDirectives[fg], ColorDirectives[bg]);
	} else if (FormatDirectives.hasOwnProperty(fg)) {
		result = applyControl(body, FormatDirectives[fg]);
	}

	return str.replace(replaceTarget, result);
}

export function formatStr(message: string): string {
	return extractDirectives(message).reduce(
		(str, directive) => applyDirective(str, directive),
		message,
	);
}
