# Reactor
A Discord Bot which tracks reactions on messages in the server.

## Configuration
* Open the `.env` file
* Add your Bot Token
* Either add your Webhook URL for the Logging Channel or the Channel ID of the Logging Channel.
If you choose to use the Channel ID: Be aware that the reaction tracking will slow down if you receive many reactions at a time.
* Add the Server ID
* If you want to ignore reactins in some channels, add the Channel IDs in a comma separated list.
* Update the emojis which should be ignored by the bot.

## Installing
* Run `npm ci`

## Starting the Bot
* Simply run `node .`