import { Notify } from "quasar";

const success = (message: string) => {
  return Notify.create({
    message: message.replace(/\\n/g, "<br>"),
    textColor: "positive",
    position: "top",
    classes: "notify_success",
    timeout: 5000,
    html: true,
  });
};

const negative = (message: string) => {
  return Notify.create({
    message: message.replace(/\\n/g, "<br>"),
    textColor: "negative",
    position: "top",
    classes: "notify_negative",
    timeout: 5000,
    html: true,
  });
};

export default {
  success,
  negative,
};
