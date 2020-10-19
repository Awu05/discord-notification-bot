module.exports = {
  name: "spam",
  description: "This is the spam command!",
  execute(message, args) {
    message.delete(message).catch(console.error);
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

    var now = new Date();
    var timeTillAction =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        time.substring(0, 2),
        time.substring(2, 4),
        0,
        0
      ) - now;

    if (timeTillAction < 0) {
      timeTillAction = 0;
    }

    setTimeout(function () {
      for (let i = 0; i < Number(numbCount); i++) {
        message.channel.send(text);
      }
    }, timeTillAction);
  },
};
