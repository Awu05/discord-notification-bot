module.exports = {
  name: "spam",
  description: "This is the spam command!",
  execute(message, args) {
    const dateFns = require("date-fns");
    
    const messageConents = message.content;

    var numbCount = messageConents.substring(
      messageConents.lastIndexOf('"') + 3,
      messageConents.lastIndexOf("@") - 1
    );

    var text = messageConents.substring(
      messageConents.indexOf('"') + 1,
      messageConents.lastIndexOf('"')
    );

    var time = messageConents.substring(
      messageConents.lastIndexOf("@") + 1,
      messageConents.length
    );

    const curTime = dateFns.format(new Date(dateFns.addHours(new Date(time), 4)), "yyyy-MM-dd'T'HH:mm");
    const now = dateFns.format(new Date(), "yyyy-MM-dd'T'HH:mm");

    var timeTillAction = dateFns.differenceInMilliseconds(
      new Date(curTime),
      new Date(now)
    );

    if (timeTillAction < 0) {
      timeTillAction = 0;
    }

    setTimeout(function () {
      for (let i = 0; i < Number(numbCount); i++) {
        message.channel.send(text);
      }
    }, timeTillAction);

    message.delete(message).catch(console.error);
  },
};
