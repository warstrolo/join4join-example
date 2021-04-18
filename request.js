const config = require('./config.json')
var url = require('url')
const axios = require('axios').default
module.exports.join = async function (userid, guildid)
{
    let response;
    try {
        response = await axios.post('https///join4join.xyz/farm/API/join/'+userid+'/'+guildid+'?botid='+config.botid+'&Authorization='+config.botkey);
        //console.log(response.data);
      } catch (error) {
        //console.error(error);
        return [false]
      }
    return [true, response.data]
}
module.exports.leave = async function (userid, guildid)
{
  let response;
    try {
        
        response = await axios.post('https///join4join.xyz/farm/API/left/'+userid+'/'+guildid+'?botid='+config.botid+'&Authorization='+config.botkey);
        //console.log(response);
      } catch (error) {
        //console.error(error);
      }
      return [true, response.data]
}
module.exports.guilds = async function ()
{
    try {
        
        const response = await axios.post('https///join4join.xyz/server/APIguild/?botid='+config.botid+'&Authorization='+config.botkey);
        return response.data
        console.log(response);
      } catch (error) {
        console.error(error);
        return false
      }
}
module.exports.farm = async function (userid)
{
    try {
        
        const response = await axios.get('https///join4join.xyz/farm/API/farm/'+userid+'?botid='+config.botid+'&Authorization='+config.botkey);
        return response.data
        console.log(response);
      } catch (error) {
        console.error(error);
        return false
      }
}
module.exports.buy = async function (userid, guildid, invitecode, buy_number)
{
  
    try {
        const response = await axios.post('https///join4join.xyz/server/API/'+guildid+'/'+userid+'/'+invitecode+'/'+buy_number+'/?botid='+config.botid+'&Authorization='+config.botkey);
        //console.log('https://join4join.xyz/server/API/'+guildid+'/'+userid+'/'+invitecode+'/'+buy_number+'/?botid='+config.botid+'&Authorization='+config.botkey)
        //console.log("test: " + response);
        return response.data
        
      } catch (error) {
        //console.log(error);
        return false
      }
}