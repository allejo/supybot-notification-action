import * as core from '@actions/core';
import { sendIRCMessage } from './irc/messaging';
import { formatStr } from './irc/markup_parser';
import { getMessagesToSend } from './configuration';

async function run(): Promise<void> {
	try {
		const messages = getMessagesToSend();

		for (const [msg, channel] of messages) {
			await sendIRCMessage(formatStr(msg), channel);
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
