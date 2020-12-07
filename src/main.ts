import * as core from '@actions/core'
import {sendIRCMessage} from './irc/messaging'
import {formatStr} from './irc/markup_parser'

async function run(): Promise<void> {
  try {
    await sendIRCMessage(
      formatStr(core.getInput('message', {required: true})),
      core.getInput('channel', {required: true})
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
