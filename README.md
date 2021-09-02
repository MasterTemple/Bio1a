# Biola Discord Bot
I made this because I was bored.

View student created Student Canvas API Documentation [here](./canvasStudentAPI.md)

# Use
## View Upcoming Events at Biola
![](https://cdn.discordapp.com/attachments/877298310078140426/878744753313824848/unknown.png)
## Get DMed About Assignments Due Very Soon
notifies you when more urgent than 2 days, however this is the closest assignment i have
![](https://cdn.discordapp.com/attachments/877298310078140426/878744611978350652/unknown.png)

## Get DMed About New Messages on Canvas
No one has sent me any messages yet so I can't screenshot :(
<!-- ![]() -->
## Get DMed About Recently Graded Items on Canvas
(In my defense, the **Knowledge Check: IT and ID Cards** was 3 questions, and the two I got right were worth 0 points)

![](https://cdn.discordapp.com/attachments/877298310078140426/878862655828410398/unknown.png)

## Get Harmonized Gospel Events (unrelated to Biola but i thought it was cool to add)
![](https://media.discordapp.net/attachments/704211849230549012/880330653147754506/unknown.png)

# Setup
### Please Note
- This bot will work for any Canvas domain. However you will need to change some data such as the domain, the profile picture, the name, the color, and other bot related data to customize it to your school.
- This bot also contains features specific to Biola University such as Community Events which are taken from Biola's website, not Canvas, so it is not automatically applied to other schools when the domain name is changed.
### Required files
1. This project
2. Node Packages
3. Config files
### Guide
1. In terminal run `git clone https://github.com/MasterTemple/Bio1a`
2. Type `cd Bio1a` to move into the proper directory
3. Run `npm install`
4. To create the directory for the config files type `mkdir data`
5. Add 3 files named `channels.json`, `config.json`, and `discordIdToApiKey.json`
6. Fill the config files with the corresponding data. For very in depth explanation of setting up the config files, what to put in them, and examples, please click [here](./configSetup.md).
### `channels.json`
```json
{
    "eventChannels": []
}
```
### `discordIdToApiKey.json`
```json
{}
```
### `config.json`
```json
{
    "bot":{
        "ownerId": "ENTER_YOUR_DISCORD_ID_HERE",
        "discordAuthToken": "ENTER_YOU_KEY_HERE",
        "color" : "ENTER_SCHOOL_HEX_COLOR_HERE",
        "version": 1.0,
        "footer": "This application is not affiliated with or endorsed by either Canvas or YOUR_UNIVERSITY.",
        "status": "Christ!",
        "inviteUrl": "URL_TO_INVITE_YOUR_DISCORD_BOT_TO_SERVERS"
    },
    "encryption": "YOUR_ENCRYPTION_KEY_HERE",
    "githubAuthToken": "YOUR_GITHUB_AUTH_TOKEN_HERE",
    "canvasDomain": "YOUR_CANVAS_DOMAIN_HERE",
    "canvasToken": "YOUR_CANVAS_API_TOKEN_HERE"
}
```
7. Run `node .` or `node index.js`.

# Contact Me
Discord `blake#3656` (Discord ID is `703120460023463986` just in case I change my name. Look up my username from my ID [here](https://discord.id/).)


# USLESS FEATURES
> ## These were just seeing if i could do it, it is a pretty bad navigating this way. I will only be using it to view tasks and unread canvas messages through discord.

> ## In other words: This bot can do many things that are pointless, see below

![Slash Commands](https://media.discordapp.net/attachments/725055794755665930/876335138605236235/unknown.png)
![Classes](https://cdn.discordapp.com/attachments/725055794755665930/876335199745634364/unknown.png)
![Modules](https://cdn.discordapp.com/attachments/725055794755665930/876335233643991050/unknown.png)
![Lessons](https://cdn.discordapp.com/attachments/725055794755665930/876335320566759444/unknown.png)
![Readings](https://cdn.discordapp.com/attachments/725055794755665930/876335350107242576/unknown.png)
![Quizzes](https://cdn.discordapp.com/attachments/725055794755665930/876335380784365578/unknown.png)
![Tasks](https://cdn.discordapp.com/attachments/725055794755665930/876335409037185084/unknown.png)

