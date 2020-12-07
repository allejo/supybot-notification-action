const DIRECTIVE_RE = /<(\w+)>([^\n]+)<\/\1>/m;

function hasDirectives(str: string): boolean {
    return DIRECTIVE_RE.test(str);
}

export function extractDirectives(str: string): [string, string][] {
    const results: [string, string][] = [];
    let matches = str.matchAll(DIRECTIVE_RE);

    for (const match of matches) {
        const directive = match[1];
        const body = match[2];

        if (hasDirectives(body)) {
            results.push(...extractDirectives(body));
        }

        results.push([directive, body]);
    }

    return results;
}

export function applyFormatting(str: string): string {
    return "";
}
