import { getMessagesToSend } from '../src/configuration';
import { clearInputs, setInput } from './utilities';

describe('Configuration Options', () => {
	describe('getMessagesToSend', () => {
		afterEach(() => {
			clearInputs();
		});

		it('should be able to get single message and channel', () => {
			setInput('message', 'I am a <green>green</green> message!');
			setInput('channel', '#awesome-channel');

			const actual = getMessagesToSend();

			expect(actual).toEqual([
				['I am a <green>green</green> message!', '#awesome-channel'],
			]);
		});

		it('should be able to handle an array of messages', () => {
			const messages = [
				{
					condition: true,
					message: 'I will be sent!',
				},
				{
					condition: false,
					message: "I won't be sent",
				},
				{
					condition: 'true',
					message: "I have a string condition of 'true'",
				},
			];
			setInput('messages', JSON.stringify(messages));
			setInput('channel', '#awesome-channel');

			const actual = getMessagesToSend();

			expect(actual).toEqual([
				['I will be sent!', '#awesome-channel'],
				["I have a string condition of 'true'", '#awesome-channel'],
			]);
		});
	});
});
