import { Client, Intents } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
import config from '../config.json'


client.on('ready', () => {
    console.log("ready as ", client.user?.username)
} )

client.login(config.token);