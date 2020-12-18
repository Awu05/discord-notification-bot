module.exports = {
  name: "spam",
  description: "This is the spam command!",
  execute(message, args) {
    const dateFns = require("date-fns");
    const moment = require("moment");

    const messageConents = message.content;
    const mentions = message.mentions.members
    let mentionsIndex = 0;

    var numbCount = messageConents.substring(
      messageConents.lastIndexOf('"') + 3,
      messageConents.lastIndexOf("@") - 1
    );

    var text = messageConents.substring(
      messageConents.indexOf('"') + 1,
      messageConents.lastIndexOf('"')
    );

    console.log(`Message: ${JSON.stringify(message)}`);

    function replaceWithMentions (txt) {
      var messageArr = txt.split(" ");

      for(let i = 0; i < messageArr.length; i++) {
        console.log(`Message Array index ${i}: ${messageArr[i]}`);
        if(messageArr[i].includes('@')) {
          console.log(`Mentions Array: ${mentions[mentionsIndex]}`);
          console.log(`Mentions Array length: ${mentions.length}`);
          messageArr[i] = mentions[mentionsIndex].mention;
          mentionsIndex += 1;
        }
      }

      return messageArr.join(" ");
    }

    function getUserFromMention(mention) {
      if (!mention) return;
    
      if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
    
        if (mention.startsWith('!')) {
          mention = mention.slice(1);
        }
    
        return client.users.cache.get(mention);
      }
    }

    // console.log(`User: ${getUserFromMention(text).username}`)

    const messageBody = replaceWithMentions(text);

    console.log(`Message: ${messageBody}`);

    var time = messageConents.substring(
      messageConents.lastIndexOf("@") + 1,
      messageConents.length
    );

    let offset = 5;

    const dtdate = moment(new Date());
    var curDst = dtdate.isDST();
    var prevDst = moment(dtdate).clone().subtract(1, "day").isDST();
    var nextDst = moment(dtdate).clone().add(1, "day").isDST();
    var isDstChangeDate =
      (curDst !== nextDst) === true || (curDst === prevDst) !== true;

    if (isDstChangeDate) {
      offset = 4;
    }

    const curTime = dateFns.format(
      new Date(dateFns.addHours(new Date(time), offset)),
      "yyyy-MM-dd'T'HH:mm"
    );
    console.log(`Current time: ${curTime}`);

    const now = dateFns.format(new Date(), "yyyy-MM-dd'T'HH:mm");
    console.log(`Now: ${now}`);

    var timeTillAction = dateFns.differenceInMilliseconds(
      new Date(curTime),
      new Date(now)
    );

    console.log(`Time till action: ${timeTillAction}\n`);

    if (timeTillAction < 0) {
      timeTillAction = 0;
    }

    setTimeout(function () {
      for (let i = 0; i < Number(numbCount); i++) {
        message.channel.send(messageBody);
      }
    }, timeTillAction);

    message.delete(message).catch(console.error);
  },
};