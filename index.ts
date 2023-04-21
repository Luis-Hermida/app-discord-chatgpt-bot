import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Configuration, OpenAIApi } from "openai";
import { GatewayIntentBits, Collection } from "discord.js";
import { defaultMode } from "./configuration/modes";
import MyClient from "./utils/Client";
dotenv.config();

// Discord connection
const client = new MyClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = new Collection();

// OpenAI API connection
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

// Check for mmesage event
client.on("messageCreate", async function (message) {
  if (message.author.bot) return;
  const messageContent = message.content.split(" ");
  if (!messageContent[0].startsWith("!!")) return;

  // Text cleanup
  const messageCommand = messageContent[0];
  messageContent.shift();
  const messageText = messageContent.join(" ");

  switch (messageCommand) {
    case "!!question":
      openAICompletion(message, messageText);
      break;
    default:
      break;
  }
});

// Handle Completition AI
const openAICompletion = async (message: any, content: string) => {
  try {
    const response = await openai.createCompletion({
      prompt: content,
      ...defaultMode,
    });

    message.reply(
      response.data.choices[0]?.text ?? "I couldn't get an answer for that."
    );
  } catch (error) {
    console.log(error);
  }
};

// Connection
client.login(process.env.DISCORD_TOKEN);
console.log("Successfully Started");
