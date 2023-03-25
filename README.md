# Discord Notification bot

This is a simple Discord notification bot made using Nodejs.

Requirements: NodeJS, Docker (Optional)

## **To get started**:
1. Go to https://discord.com/developers/applications and create a new application
2. Copy client id and go to https://discordapi.com/permissions.html
3. Select all necessary roles. I selected all the Text Permissions and Administrator (just in case it didn't have permission to delete the command message)
4. Click the generated link at the bottom and add the bot to your server
5. Go back to the discord bot application window and click on Bot from the side drawer
6. Click on the Copy button to copy the token for the bot
6. Create a new file in the home directory of this project and name it "secret.js"
7. Copy and paste this into secret.js:
   ```javascript
   module.exports = {
    key : "KEY_GOES_HERE"
   };
   ```
8. Replace KEY_GOES_HERE with the key you have just copied
9. You can start the discord spam bot server by running ```node . ``` in the terminal
10. Once the bot is up and running, you should see "Spam bot is online!" outputted to the terminal window

## **Optional steps to dockerize app**:
1. Run ```docker-compose build``` and it should download all the necessary files and build the docker image for you
2. Run ```docker-compose up -d ``` and it should start the docker image for you
3. Docker image should be up and running now. You can check that it is running by typing ```javascript docker container ls``` into the terminal to see all active docker containers (or use the docker interface).

    

## **Commands**:
* **!help** - Displays list of commands and their usage
* **!spam** 
  * Definition: !spam "Insert message between quotes" #Number of times to repeat message @Specify the time to spam message in 24hr format
   * Usage: !spam "Hello" #5 @2020-10-19T18:55
