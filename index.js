const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('./request')
const config = require('./config.json')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('guildMemberJoin', async member => {
  let res = await request.join(member.id, member.guild.id)
})
client.on('guildMemberRemove', async member => {
  let res = await request.leave(member.id, member.guild.id)
})
client.on('message', async message => {
  let array = message.content.split(' ')
  if (message.content === config.prefix+'join') {
    let res = await request.join(message.author.id, message.guild.id)
    if (res[0] == false && !res[1])
    {
      return message.reply("Error occured")
    }
    if (res[0] == true)
    {
      if (res[1][0] == false)
      {
        return message.reply("You have a code or a message waiting for you \n" + "||"+res[1][1]+"||")
      } 
      if (res[1][0] == true)
      {
        return message.reply("A new code is waiting for you  \n" + "||"+res[1][1]+"||")
      } 
    }
    //message.reply("No ads currently here so you cant get a join4join join code")
  }
  // For dev purpose only
  /*
  if (message.content === config.prefix+'left') {
    let res = await request.leave(message.author.id, message.guild.id)
    if (res[0] == false && !res[1])
    {
      return message.reply("Error occured")
    }
    if (res[0] == true)
    {
      if (res[1][0] == false)
      {
        return message.reply("You have a code or a message waiting for you \n" + "||"+res[1][1]+"||")
      } 
      if (res[1][0] == true)
      {
        return message.reply("A new code is waiting for you  \n" + "||"+res[1][1]+"||")
      } 
    }
    //message.reply("No ads currently here so you cant get a join4join join code")
  }*/
  if (message.content === config.prefix+'farm') {
    let res = await request.farm(message.author.id)
    if (res == false)
    {
      return message.reply("An error occured")
    }
    if (res[0] == "ok")
    {
      let msg = "Farm this servers to get coins \n";
      res[1].forEach(element => {
        msg = msg + "\n"+ element.name + " : https://discord.gg/" + element.invite
      });
      return message.reply(msg)
    }
    if (res[0] == "error")
    {
     message.reply(res[1])
    }
    //message.reply("No ads currently here so you cant get a join4join join code")
  }
  
  if (array[0]=== config.prefix+'buy') {
   
    if (!array[1] || isNaN(array[1]) || !parseInt(array[1]))
    {
      return message.reply("You must specify the buy number")
    }
    let invite = await message.channel.createInvite(
      {
        maxAge: 0, // maximum time for the invite, in milliseconds
        maxUses: 0 // maximum times it can be used
      });
      //console.log(invite.code)
    let res = await request.buy(message.author.id, message.guild.id,invite.code, array[1] )
    //console.log("test")
    if (res == false)
    {
      return message.reply("An error occured")
    }
    return message.reply(res)
    //message.reply("No ads currently here so you cant get a join4join join code")
  }
  if (array[0]=== config.prefix+'help') {
   
    const embed = {
      "title": "New system :",
      "description": "Here the docs of the new system",
      "url": "https://join4join.xyz",
      "color": 1,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/765632451509878804/768943766794666034/9ef9b5a1d6219ba96ace92e2cc3f69d1.png",
        "text": "join4join.xyz"
      },
      "author": {
        "name": "join4join",
        "url": "https://join4join.xyz",
        "icon_url": "https://cdn.discordapp.com/attachments/765632451509878804/768943766794666034/9ef9b5a1d6219ba96ace92e2cc3f69d1.png"
      },
      "fields": [
        {
          "name": "New farm / buy system ",
          "value": ":one: Login to the dashboard, then join our support servers  \n:two: in <#830034378213949440> (bots-that-use-the-join4join-system) you will see community bots to invite     \n:three: when you have invited 1 of all the bots you can use the ?buy command  \n:four: when you have join a server with ?farm go to the dashboard and validate the join to get your coin if no join are waiting, then do ?join and check the dashboard \n:five: then you will receve your coins"
        },
        {
          "name": "If you are a bot owner :",
          "value": ":one: join the support server \n:two: enter the bot id on https://join4join/bots \n:three: download the example on https://github.com/warstrolo \n:four:  rename config-example.json and fill the vars of config.json with key from join4join.xyz site and token from discord.com   \n:five: host-it, and then you will gain 0.25 coin / members joining guild that buy with you bot"
        },
        {
          "name": "Avaliable CMD :",
          "value": ":one: ?farm \n:two: ?join \n:three: ?buy"
        }
      ]
    };
     message.channel.send({ embed });
     return message.channel.send("https://join4join.xyz \n https://discord.gg/ZC87upd3z8 ")
    //message.reply("No ads currently here so you cant get a join4join join code")
  }
  
  
});

client.login(config.bottoken);
