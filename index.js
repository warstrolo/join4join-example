const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('./request')
const config = require('./config.json')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('guildMemberRemove', async member => {
  let res = await request.leave(message.author.id, message.guild.id)
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
        msg = msg + "\n"+ element.name + " : " + element.invite
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
      console.log(invite.code)
    let res = await request.buy(message.author.id, message.guild.id,invite.code, array[1] )
    console.log("test")
    if (res == false)
    {
      return message.reply("An error occured")
    }
    return message.reply(res)
    //message.reply("No ads currently here so you cant get a join4join join code")
  }
  
  
});

client.login(config.bottoken);