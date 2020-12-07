import { extractDirectives } from '../../src/irc/markup_parser';

describe('Markup Parser', () => {
    it('should extract nested directives', () => {
        const input = 'Just a simple test from <green><bold>me</bold></green>!';
        const directives = extractDirectives(input);

        expect(directives).toEqual([
            ['bold', 'me'],
            ['green', '<bold>me</bold>'],
        ]);
    });
});
