import * as core from '@actions/core';
import * as github from '@actions/github';
import * as Webhooks from '@octokit/webhooks';

interface Condition {
	condition: boolean | string;
	message: string;
	channel?: string;
}

function getServerUrl(): string {
	// Stolen from @actions/checkout
	//   https://github.com/actions/checkout/blob/c952173edf28a2bd22e1a4926590c1ac39630461/src/url-helper.ts
	return (
		process.env['GITHUB_SERVER_URL'] ||
		process.env['GITHUB_URL'] ||
		'https://github.com'
	);
}

export function getMessagesToSend(): [string, string][] {
	const messages: [string, string][] = [];

	let msg, channel;

	if (
		(msg = core.getInput('message')) &&
		(channel = core.getInput('channel', { required: true }))
	) {
		messages.push([msg, channel]);
	} else if ((msg = core.getInput('messages'))) {
		const parsedMessages: Condition[] = JSON.parse(msg) as Condition[];

		if (!Array.isArray(parsedMessages)) {
			throw new Error(
				'The `messages` input expects an array of objects.',
			);
		}

		for (const definition of parsedMessages) {
			const rawCondition = definition.condition;
			const message = definition.message;
			const tgtChannel =
				definition.channel ??
				core.getInput('channel', { required: true });
			let condition = true;

			if (typeof rawCondition === 'string') {
				condition = rawCondition === 'true';
			} else {
				condition = rawCondition;
			}

			if (condition) {
				messages.push([message, tgtChannel]);
			}
		}
	} else {
		const isExplicit = core.getInput('default_message');

		if (!isExplicit) {
			core.warning('Defaulting to `default_message` is true.');
		}

		const context = github.context;
		const {
			actor,
			repo: { owner, repo: repoName },
			runId,
		} = context;
		const ref = context.ref.replace(/refs\/\w+\//, '');
		const sha = context.sha.substring(0, 6);
		const actionsURL = `${getServerUrl()}/${owner}/${repoName}/actions/runs/${runId}`;
		const job = core.getInput('status', { required: true });
		let commitMessage = '';
		let status: string;

		if (job === 'success') {
			status = '<green>passed</green>';
		} else if (job === 'failure') {
			status = '<red>failed</red>';
		} else if (job === 'cancelled') {
			status = '<grey>cancelled</grey>';
		} else {
			status = 'status unknown';
		}

		if (context.eventName === 'push') {
			const pushPayload = context.payload as Webhooks.EventPayloads.WebhookPayloadPush;
			const message = pushPayload.commits?.[0].message;

			if (message) {
				commitMessage = `${message} - `;
			}
		}

		const message = `<blue>${ref}</blue> @ ${repoName}: <green>${actor}</green> ${sha}: build ${status} [${commitMessage}${actionsURL}]`;

		messages.push([message, core.getInput('channel', { required: true })]);
	}

	return messages;
}
