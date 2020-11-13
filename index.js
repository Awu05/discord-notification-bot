const Discord = require("discord.js");
let key = process.env.DISCORD_SPAM_KEY || "";

if (key === "") {
  const temp = require("./secret.js");
  key = temp.key;
}

const client = new Discord.Client();

const prefix = "!";

const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Spam bot is online!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    message.channel.send(
      '!help - Display commands\n!spam  \n\t* Definition: !spam "Your text between quotes" #Number of times to repeat @Specify a certain date and time in 24hr format\n\t* Usage: !spam "Hello!" #5 @2020-10-19T09:54'
    );
  } else if (command === "spam") {
    client.commands.get("spam").execute(message, args);
  }
});

client.login(key);
