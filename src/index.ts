import { Client, Intents, Message } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
import config from '../config.json'
const getGuild = async () => {
    return await client.guilds.fetch("747955932834693273")
}
client.on('ready', () => {
    console.log("ready as ", client.user?.username)
})
client.on('interactionCreate', async (e) => {
    if(e.isMessageComponent()) {
        if(e.customId === "role-select" && e.componentType === "SELECT_MENU") {
            console.log(e)
            if(!e.guildId || !e.member) return console.log("no member or guild")
            let guild = await client.guilds.fetch(e.guildId)
            let member = guild.members.cache.get(e.member.user.id);
            if(!member) return console.log("no member")
            let role = guild.roles.cache.find(r => r.id == e.values[0]);
            if(!role) return console.log("no role")
            console.log(guild, member, role);
            member.roles.add(role);
            e.reply("DONE")
           
        }
    }
    
})
client.on('messageCreate', async (message: Message) => {
    if(message.content === "!hehe") {
        const guild = await getGuild()
        console.log(guild)
        message.channel.send({
            content: "bruh",
            components: [
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "SELECT_MENU",
                            customId: "role-select",
                            options: guild ? guild.roles.cache.filter(s => s.name !== "@everyone").filter(s => !s.tags).map(role => {
                                return {label: role.name,value: role.id}
                            }) : [
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