module.exports = {
  name: "spam",
  description: "This is the spam command!",
  execute(message, args) {
    const dateFns = require("date-fns");
    const moment = require("moment");

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
        message.channel.send(text);
      }
    }, timeTillAction);

    message.delete(message).catch(console.error);
  },
};