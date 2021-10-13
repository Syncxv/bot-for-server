import { Client, Intents, Message } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
import config from '../config.json'
import {roleArray} from './types'
client.on('ready', () => {
    console.log("ready as ", client.user?.username)
})
client.on('interactionCreate', async (e) => {
    if(e.isMessageComponent()) {
        if(e.customId = "")
        if(e.customId === "role-select" && e.componentType === "SELECT_MENU") {
            console.log(e)
            if(!e.guildId || !e.member) return console.log("no member or guild")
            let guild = await client.guilds.fetch(e.guildId)
            let member = guild.members.cache.get(e.member.user.id);
            if(!member) return console.log("no member")
            let role = guild.roles.cache.find(r => r.id == e.values[0]);
            if(!role) return console.log("no role")
            member.roles.add(role);
            e.reply(":D")
           
        }
    }
    
})
client.on('messageCreate', async (message: Message) => {
    if(message.content === "!hehe") {
        if(!message.guildId) return
        const guild = await client.guilds.fetch(message.guildId)
        //guild.roles.cache is a map so we need to convert it to an array. then we need to sort it by the postion it is on discord so we can get the correct indicies hehee
        const rolesArray = [...guild.roles.cache].map(([id, role, ...shesh]) => ({ id, role, ...shesh })).sort((a, b) => {
            if(a.role.position < b.role.position) return 1
            else return -1
        })
        //ALL the color roles are next to each other so we just have to slice them of the rest :D so we getting the index of these and then we slice
        const firstColorRole = rolesArray.map(e => e.role.name).indexOf("Burgundy Red")
        const lastColorRole = rolesArray.map(e => e.role.name).indexOf("IndianRed")
        console.log(firstColorRole, lastColorRole)
        const allColorRoles = rolesArray.slice(firstColorRole, lastColorRole);
        const splitedRoles = allColorRoles.reduce((resultArray: roleArray[][], item, index) => { 
            const chunkIndex = Math.floor(index/25)
          
            if(!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [] // start a new chunk
            }
          
            resultArray[chunkIndex].push(item)
          
            return resultArray
          }, []);
        (global as any).rolesArray = rolesArray;
        (global as any).guild = guild;
        (global as any).splitedRoles = splitedRoles
        message.channel.send({
            content: "bruh",
            components: [
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "SELECT_MENU",
                            customId: "role-select",
                            options: guild ? (guild.roles.cache.filter(s => s.name !== "@everyone").filter(s => !s.tags).map(role => {
                                return {label: role.name,value: role.id}
                            })).slice(0, 25) : [
                                {
                                    label: "Nigga Role",
                                    value: "897938535762522183",
                                    
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