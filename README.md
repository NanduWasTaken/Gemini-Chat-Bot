# Gemini Chat Bot

This is a simple Discord chat bot built using discord.js and the gemini-pro model from Google. This model seems to be destroying chat gpt-4 in every benchmark but don't believe the blue glowing box try it out by yourself.


## How to setup

[![Run on Repl.it](https://repl.it/badge/github/NanduWasTaken/Gemini-Chat-Bot)](https://replit.com/@NanduWasTaken/Gemini-Discord-Chat-Bot?v=1)

>>> if you are running on replit make sure u set up the secret named 'API_TOKEN' & 'TOKEN'. AND ALSO PUT THE CHANNEL ID IN THE 'config.js' FILE.



1. Clone the repository to the current directory

```powershell
git clone https://github.com/nanduwastaken/Gemini-Chat-Bot.git
```

2. Install all the dependencies

- Using npm
```powershell
npm install
```

3. Update `config.js` with your own credentials.
```js
module.exports = {
  API_KEY: process.env.API_KEY,
 	TOKEN: process.env.TOKEN,
  CHANNEL_ID: '1151451183047770164',
}
```
- Get the [Api Token Here](https://makersuite.google.com/app/apikey)
- Get the [Bot Token Here](https://discord.com/developers/applications)
- Copy the [Channel ID](https://discord.com/app)

4. Start your bot

- Using npm
```powershell
npm run start
```

