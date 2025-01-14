import { Client } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-command";

export const client = new Client({
  intents: [
    "Guilds", // Для получения событий о гильдиях
    "GuildMessages", // Для получения сообщений из гильдий
    "DirectMessages", // Для получения личных сообщений
    "MessageContent", // Для чтения содержимого сообщений
  ],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  console.log(guild);
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction);
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.DISCORD_TOKEN);
