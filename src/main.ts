import * as core from '@actions/core'
import { sendIRCMessage } from './irc/messaging'
import { applyControl, ControlCode } from './irc/formatting'

async function run(): Promise<void> {
  try {
    await sendIRCMessage(`Just a simple test from ${applyControl('allejo', ControlCode.Bold)}`, '+sujevo-dev');

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
