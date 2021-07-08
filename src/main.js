require('dotenv').config();

// Discord Initializations.
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';

// YouTube Initializations.
const { getSong } = require('./youtube');

// Genius Initializations.
const { getLyric } = require('./genius');


client.once('ready', () => {
  console.log('cap.glo.gang is online');
});


client.on('message', async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'quote') {  // Return lyric as quote.
    await getLyric().then(lyric => {
      msg.channel.send(`> ***"${lyric.body}"***\n *${lyric.title}*`);
    }).catch(error => {
      console.log(error);
    });
  } else if (command === 'song') {
    await getSong().then(url => {
      msg.channel.send(url);
    }).catch(error => {
      console.log(error);
      msg.channel.send('Oh no!\nIt looks like Capo bot has exceeded the daily allotment of YouTube API calls :cry:\nIf you enjoy **capo.glo.gang**, consider donating to help pay hosting costs, api calls, and future projects at https://paypal.me/srdbeatz?locale.x=en_US\n Thanks! :heart_decoration:');
    });
  } else if ('help') {
    // Return valid list of commands.
    msg.channel.send('Valid Commands:\n`-quote` => Returns a lyric from a Capo song.\n`-song` => Returns a YouTube link to a Capo related video.\n`-help`  => Returns this message.\n');
  } else {
    continue;
  }
});


client.login(process.env.DISCORD_TOKEN);
