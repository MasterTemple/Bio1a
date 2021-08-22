# Setting Up Config Files
## Examples
## `channels.json`
This data is used to store all the channels the bot will broadcast events too. You can update this manually or with the built in `/seteventchannel`
```json
{
    "eventChannels": [
        "877630366855360622",
        "745140744053850112"
    ]
}
```

## `discordIdToApiKey.json`
A valid API key should look somehting like `1872~3W72HdKuFbgs77kSISduWgsCwWDX4035A0ETGtC9Bef0MtY3z06GAZEpf71wu6B7` but they are encrypted for security reasons, so it should look something like `aeb20f29ebccf1d5026f5cfd70f4086484c51d58f3a8b55843a401e633550d85311e9f5cfe6e471477e242e1c2d82baf8cd5cc4588e3c19aa28792253bd7e5a970e19bfa10883ae9de1e0851c858dca90af5dc2a8a9d7ef7ebe257fcccbcb533d0271497d97055a85ff14d2688317af2c80e02eef7f67e1d2d2347508f96d737d4cb459b64e3b928fa3483fe1fa700b6b78d5ef030cf56ed504b64c783a1fbff9ccede056f`. This file pairs a Discord Account with an Encrypted API Key
```json
{
    "703120460023463986": "aeb20f29ebccf1d5026f5cfd70f4086484c51d58f3a8b55843a401e633550d85311e9f5cfe6e471477e242e1c2d82baf8cd5cc4588e3c19aa28792253bd7e5a970e19bfa10883ae9de1e0851c858dca90af5dc2a8a9d7ef7ebe257fcccbcb533d0271497d97055a85ff14d2688317af2c80e02eef7f67e1d2d2347508f96d737d4cb459b64e3b928fa3483fe1fa700b6b78d5ef030cf56ed504b64c783a1fbff9ccede056f"
}
```

## `config.json`
Everything in `bot` is information related to the bot. Get your own unique Discord Auth Token [here](https://discord.com/developers/applications). Create your own encryption key, which is used to encrypt user API keys. `githubAuthToken` is not currently used yet, but it will likely be in future if I plan to do something with [Gists](https://www.youtube.com/watch?v=wc2NlcWjQHw). The `canvasDomain` can look like `canvas.biola.edu` or `vcccd.instructure.com` and so on.
```json
{
    "bot":{
        "ownerId": "703120460023463986",
        "discordAuthToken": "dfjg09j0a9fgj097FHGJ.9j09G.Jg09h4dfds4xGFgwgkla1dfKLUgy5",
        "color" : "#cc1122",
        "version": 1.0,
        "footer": "This application is not affiliated with or endorsed by either Canvas or Biola University.",
        "status": "Christ!",
        "inviteUrl": "https://discord.com/api/oauth2/authorize?client_id=876215060110917692&permissions=122406619200&scope=applications.commands%20bot"
    },
    "encryption": "MY_ENCRYPTION_KEY",
    "githubAuthToken": "fjg_fjgaifo49g2847dfgjdg",
    "canvasDomain": "canvas.biola.edu"
}
```