import { Client, Intents, Message, SelectMenuInteraction  } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
import {roleArray} from './types'
import http from 'http'
client.on('ready', () => {
    console.log("ready as ", client.user?.username)
})
client.on('interactionCreate', async (e) => {
    if(e.isMessageComponent()) {
        if(e.customId.includes("role-select") && e.componentType === "SELECT_MENU") {
            console.log(e)
            if(!e.guildId || !e.member) return console.log("no member or guild")
            let guild = await client.guilds.fetch(e.guildId)
            let member = guild.members.cache.get(e.member.user.id);
            if(!member) return console.log("no member")
            let role = guild.roles.cache.find(r => r.id == (e as SelectMenuInteraction).values[0]);
            if(!role) return console.log("no role")
            member.roles.add(role);
            e.reply({content: 'nice', ephemeral: true})
           
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
            "embeds": [
                {
                  "type": "rich",
                  "title": `Self Role Colors`,
                  "description": `hehehe`,
                  "color": 0xc91b2f,
                  "image": {
                    "url": `https://media.discordapp.net/attachments/772427014366822451/804941315426877441/af3b27b4-e783-47b1-9ebf-8bf2abf1d92e.png?width=521&height=375`,
                    "height": 0,
                    "width": 0
                  },
                  "footer": {
                    "text": `gang gang`
                  }
                }
              ],
              components: [
                {
                    type: "ACTION_ROW",
                    components: [{type: "SELECT_MENU", customId: "role-select-2", options: splitedRoles[1].map(item => {return {label: item.role.name, value: item.id}})}]
                },
                {
                    type: "ACTION_ROW",
                    components: [{type: "SELECT_MENU", customId: "role-select-1", options: splitedRoles[0].map(item => {return {label: item.role.name, value: item.id}})}]
                },
            ]
        })
    }
})
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen();
client.login(process.env['token']);
//splitedRoles.map((item, index) => {return {type: "SELECT_MENU", customId: "role-select"+index, options: item.map(hehe => {return {label: hehe.role.name, value: hehe.id}})}})