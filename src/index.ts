import { Client, Intents, Message } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
import config from '../config.json'

client.on('ready', () => {
    console.log("ready as ", client.user?.username)
})
client.on('interaction', (e) => {
    console.log(e)
})
client.on('messageCreate', (message: Message) => {
    if(message.content === "!hehe") {
        message.channel.send({
            content: "bruh",
            components: [
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "SELECT_MENU",
                            customId: "role-select",
                            options: [
                                {
                                    label: "Nigga Role",
                                    value: "897938535762522183"
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    }
})
client.login(config.token);