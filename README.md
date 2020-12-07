<p align="center">
  <a href="https://github.com/allejo/supybot-notification-action/actions"><img alt="typescript-action status" src="https://github.com/allejo/supybot-notification-action/workflows/build-test/badge.svg"></a>
</p>

# Supybot Notification Action

A GitHub Actions action that lets you send notifications to a [Limnoria (fka Supybot)](https://github.com/ProgVal/Limnoria) instance.

## Usage

```yaml
- uses: allejo/supybot-notification-action@v1
  with:
    hostname: 'supybothost.com:8090' # Optional custom port
    credentials: ${{ secrets.SUPYBOT_PASSWORD }}
    channel: '#my-channel'
    message: 'Build by ${{ github.actor }} <green>passed</green>'
```

### Message Formatting

You can control how the formatting of messages will appear with HTML-like markup (e.g. `<directive>content</directive>`).

#### Colors

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

#### Format

The following formatting directives are available:

- `<bold>`
- `<italic>`
- `<strike>`
- `<underline>`

## License

[MIT](./LICENSE)
