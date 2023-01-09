# Reactor
A Discord Bot which tracks reactions on messages in the server. This Bot is for Selfhosters only.

## Configuration
* Rename the file `.env.example` to `.env`
* Open the `.env` file in a Text Editor
* Add your Bot Token
* Either add your Webhook URL for the Logging Channel or the Channel ID of the Logging Channel.
If you choose to use the Channel ID: Be aware that the reaction tracking will slow down if you receive many reactions at a time.
* Add the Server ID
* If you want to ignore reactins in some channels, add the Channel IDs in a comma separated list.
This is highly recommended for Channels where Users are not able to add custom reactions.
* Update the emojis which should be ignored by the bot.

## Installing
* Run `npm ci`

## Starting the Bot
* Simply run `node .`

## Or using PM2
* Start the Bot via `pm2 start index.js -n Reactor`