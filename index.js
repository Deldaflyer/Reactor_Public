require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'REACTION'],
});
if(process.env.WEBHOOK_URL) {
	var myWebHook = new Discord.WebhookClient({ url: process.env.WEBHOOK_URL});
}
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageReactionAdd', async (reaction, user) => {
	const guild = client.guilds.cache.get(process.env.MAIN_GUILD);
	const chan = guild.channels.resolve(process.env.LOG_CHANNEL);
	const ignore_channels = process.env.IGNORE_CHANNEL.split(',');
	const ignore_reactions = process.env.IGNORE_REACTION.split(',');
	if (!chan) {
		console.log('Channel not found!');
		return;
	}
	
	if (guild != reaction.message.guildId) {
	//	console.log(`Reaction from another Guild: ${reaction.message.guildId}`);
		return;
	}

	if (user.bot) {
		console.log(`<User is a Bot.>`);
		return;
	}

	if (ignore_channels.find(c => c === reaction.message.channelId)) {
	//	console.log(`Channel ${reaction.message.channelId} will be ignored!`);
		return;
	}
	if (ignore_reactions.find(r => r === reaction.emoji.name)) {
	//	console.log(`Reaction ${reaction.emoji.name} will be ignored!`);
		return;
	}

	const log_message = `Reaction ${reaction.emoji} (Count: ${reaction.count}) added by <@!${user.id}> (**${user.tag}**, \`${user.id}\`) in ${reaction.message.channel} to ${reaction.message.url}`; // Count has to be updated. For uncached Messages the number will be NULL.
	
	if(process.env.WEBHOOK_URL) {
	//	const myWebHook = new Discord.WebhookClient({ url: process.env.WEBHOOK_URL});
		myWebHook.send({ 
			content: log_message,
			allowedMentions: { parse: [] }
		});
	}
	else {
		await chan.send({
			content: log_message,
			allowedMentions: { parse: [] },
		});
	}
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
