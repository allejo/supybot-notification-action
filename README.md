# Supybot Notification Action

[![Build Status](https://github.com/allejo/supybot-notification-action/workflows/build-test/badge.svg)](https://github.com/allejo/supybot-notification-action/actions)

A GitHub Actions action that lets you send notifications to a [Limnoria (fka Supybot)](https://github.com/ProgVal/Limnoria) instance using the [supybot-github plugin](https://github.com/kongr45gpen/supybot-github).

## Usage

```yaml
- name: Send IRC notification
  uses: allejo/supybot-notification-action@v1
  if: always()
  with:
    status: ${{ job.status }}
    hostname: 'supybothost.com:8090'
    credentials: ${{ secrets.SUPYBOT_PASSWORD }}
    channel: '#my-channel'
    default_message: true
```

### Parameters

- `status` - The status of the job: `success`, `failure` or `canceled`. Use the `${{ job.status }}` value available in GitHub actions to get this value automatically.
- `hostname` - The host of where the Supybot instance with the "supybot-github" plugin is being hosted.
- `credentials` - The credentials for Basic Authentication; so either `password` or `username:password` depending on how you configure the plugin.
- `channel` - The IRC channel to send notifications to; the `#` needs to be quoted, or you may also use `+`.
- `default_message` - Send the default message to the bot that contains the git ref, repo name, committer, SHA1, commit message, and a URL to the Actions run.
- `message` - A single custom message to send.
- `messages` - A JSON array consisting of multiple possible messages to send.

### Single Custom Message

To send a single IRC message, you may use the `message` parameter and use [message formatting directives](#message-formatting).

```yaml
- name: Send IRC notification
  uses: allejo/supybot-notification-action@v1
  if: always()
  with:
    status: ${{ job.status }}
    hostname: 'supybothost.com:8090'
    credentials: ${{ secrets.SUPYBOT_PASSWORD }}
    channel: '#my-channel'
    message: "I'm <blue>blue</blue> da ba dee da ba die"
```

### Send Multiple Messages

To send multiple messages to separate channels or messages based on conditions, use the `messages` parameter.

```yaml
- name: Send IRC notification
  uses: allejo/supybot-notification-action@v1
  if: always()
  with:
    status: ${{ job.status }}
    hostname: 'supybothost.com:8090'
    credentials: ${{ secrets.SUPYBOT_PASSWORD }}
    messages: |
      [
        {
          "condition": true,
          "message": "I'm <blue>blue</blue> da ba dee da ba die",
          "channel": "#channel-one"
        },
        {
          "condition": true,
          "message": "I'm also <blue>blue</blue> da ba dee da ba die",
          "channel": "#channel-two"
        }
      ]
```

The `channel` property may be omitted from the `messages` array **if** there the top-level `channel` parameter is provided.

## Message Formatting

You can control how the formatting of messages will appear with HTML-like markup (e.g. `<directive>content</directive>`).

### Colors

The following color directives are availale to change the color of messages:

- `<transparent>`
- `<white>`
- `<black>`
- `<blue>`
- `<green>`
- `<red>`
- `<brown>`
- `<purple>`
- `<orange>`
- `<yellow>`
- `<limegreen>`
- `<cyan>`
- `<lightcyan>`
- `<lightblue>`
- `<pink>`
- `<grey>`
- `<lightgrey>`

For background colors, use the optional `:color` syntax. For example, if you would like to have a black background with white text, you would use `<white:black>my white text with a black background</white:black>`.

### Format

The following formatting directives are available:

- `<bold>`
- `<italic>`
- `<strike>`
- `<underline>`

## License

[MIT](./LICENSE)
