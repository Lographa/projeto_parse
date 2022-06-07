const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.login(config.BOT_TOKEN);

client.on('interactionCreate', async interaction => {
	// ...
	if (commandName === 'cat') {
		await interaction.deferReply();
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		interaction.editReply({ files: [file] });
	}
});

