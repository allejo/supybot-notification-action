import { applyColor, applyControl, Color, ControlCode } from "./formatting";

const DIRECTIVE_RE = /<([a-zA-Z:]+)>([^\n]+)<\/\1>/gm;

export function extractDirectives(str: string): [string, string][] {
    const results: [string, string][] = [];
    let matches = str.matchAll(DIRECTIVE_RE);

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

const ColorDirectives: Record<string, Color> = {
    transparent: Color.Transparent,
    white: Color.White,
    black: Color.Black,
    blue: Color.Blue,
    green: Color.Green,
    red: Color.Red,
    brown: Color.Brown,
    purple: Color.Purple,
    orange: Color.Orange,
    yellow: Color.Yellow,
    limegreen: Color.LimeGreen,
    cyan: Color.Cyan,
    lightcyan: Color.LightCyan,
    lightblue: Color.LightBlue,
    pink: Color.Pink,
    grey: Color.Grey,
    lightgrey: Color.LightGrey,
};

const FormatDirectives: Record<string, ControlCode> = {
    bold: ControlCode.Bold,
    italic: ControlCode.Italic,
    strike: ControlCode.StrikeThrough,
    underline: ControlCode.Underline,
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

export function formatStr(str: string): string {
    return extractDirectives(str).reduce(
        (str, directive) => applyDirective(str, directive),
        str,
    );
}
