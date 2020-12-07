import { extractDirectives, formatStr } from '../../src/irc/markup_parser';

describe('Markup Parser', () => {
	describe('extractDirectives', () => {
		it('should extract nested directives', () => {
			const input =
				'Just a <green>simple</green> test from <yellow:black><bold>me</bold></yellow:black>!';
			const directives = extractDirectives(input);

			expect(directives).toEqual([
				['green', 'simple'],
				['yellow:black', '<bold>me</bold>'],
				['bold', 'me'],
			]);
		});
	});

	describe('formatStr function', () => {
		it('should color code a blue word', () => {
			const actual = formatStr("I'm <blue>blue</blue> da ba dee");

			expect(actual).toEqual("I'm \u000302blue\u000f da ba dee");
		});

		it('should handle foreground and background colors', () => {
			const actual = formatStr(
				'Was #TheDress <white:yellow>white and gold</white:yellow> or <lightblue:black>black and blue</lightblue:black>',
			);

			expect(actual).toEqual(
				'Was #TheDress \u000300,08white and gold\u000f or \u000312,01black and blue\u000f',
			);
		});

		it('should bold a word with <bold>', () => {
			const actual = formatStr(
				"It's a <bold>bold</bold> strategy Cotton. Let's see if it pays off for him.",
			);

			expect(actual).toEqual(
				"It's a \u0002bold\u000f strategy Cotton. Let's see if it pays off for him.",
			);
		});

		it('should handle italics with <italic>', () => {
			const actual = formatStr(
				'Ugh fine, I guess you <italic>are</italic> my little PogChamp',
			);

			expect(actual).toEqual(
				'Ugh fine, I guess you \u001dare\u000f my little PogChamp',
			);
		});

		it('should bold and color a word', () => {
			const actual = formatStr(
				'OOPSIE WOOPSIE!! Uwu We made a <white:pink><bold>fudgy wudgy!!</bold></white:pink> A wittle pucko boingo!',
			);

			expect(actual).toEqual(
				'OOPSIE WOOPSIE!! Uwu We made a \u000300,13\u0002fudgy wudgy!!\u000f\u000f A wittle pucko boingo!',
			);
		});
	});
});
