const { Client, IntentsBitField, Events } = require("discord.js");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { API_KEY, TOKEN, CHANNEL_ID } = require("./config");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

client.on(Events.ClientReady, () => {
  console.log("The bot is online!");
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== CHANNEL_ID) return;
  if (message.content.startsWith("!")) return;

  let conversationLog = [];
  let prevRole = "model";

  try {
    await message.channel.sendTyping();
    let prevMessages = await message.channel.messages.fetch({ limit: 5 });
    prevMessages.reverse();

    prevMessages.forEach((msg, index, array) => {
      if (msg.content.startsWith("!")) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;

      if (index === array.length - 1) {
        return;
      }

      if (msg.author.id == client.user.id && prevRole === "user") {
        prevRole = "model";
        conversationLog.push({
          role: "model",
          parts: [{ text: msg.content }],
        });
      }

      if (msg.author.id == message.author.id && prevRole === "model") {
        prevRole = "user";
        conversationLog.push({
          role: "user",
          parts: [{ text: msg.content }],
        });
      }
    });
		console.log(conversationLog)
    const result = await model.generateContent({
      contents: conversationLog,
      generationConfig,
      safetySettings,
    });

    const finalText = result.response.text();
    const chunkSize = 2000;
    const stringArray = [];
    
    for (let i = 0; i < finalText.length; i += chunkSize) {
      stringArray.push(finalText.substring(i, chunkSize));
    }

    for (string of stringArray) {
      message.reply(string);
    }
  } catch (error) {
    console.log(error);
    message.reply("Something went wrong in the procedure....");
  }
});

client.login(TOKEN);
