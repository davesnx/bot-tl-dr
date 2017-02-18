// @flow

const { RtmClient, CLIENT_EVENTS } = require('@slack/client')
const debug = require('debug')('bot-tl-dr')
require('dotenv').config()

// const channel = {
//   name: 'tl-dr-test',
//   id: 'C3N62U56Z'
// }

const rtm = new RtmClient(process.env.TOKEN)

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (startData) => {
  debug(`Logged in as ${startData.self.name} of team ${startData.team.name}, but not yet connected to a channel`)
})

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  debug('RTM IS ON')
})

// TODO: Implement from API get all the messages until last connection
// TODO: Implement get last connection
const getMessages = (channel) => {
  return [
    'Appending a few old messages to analyze...',
    'to channel',
    channel
  ]
}

// TODO: Process a few parameters:
//      - since
//      - tags
//      - ignoreUser
//      - verbosity?

const processParameters = (command) => {
  return ''
}

// TODO: Use a simple implementation of summarize, the fun part!
const sumarize = (messages, options) => {
  return messages.join(`
    $
  `)
}

// TODO: Check how tests runners prints the messages and try to use different ones
// for now, just raw messages are fine.
const formatMessages = (messages) => {
  return `Formatted -> ${messages}`
}

rtm.on(CLIENT_EVENTS.RTM.RAW_MESSAGE, (dataMessage) => {
  const data = JSON.parse(dataMessage)

  if (data.type === 'message') {
    // TODO: Detect when user inovokes the bot
    debug('I received a message: ', data.text)
    const options = processParameters(data.text)
    const messages = getMessages(data.channel)
    const summarizedMessages = sumarize(messages, options)
    const response = formatMessages(summarizedMessages)
    rtm.sendMessage(response, data.channel)
  }
})

rtm.start()

// TODO: Implement subscriptions on the bot.
// Listen user connects or joins a channel, send them the resume.
