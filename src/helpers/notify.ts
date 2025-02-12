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

const error = (message: string) => {
  return Notify.create({
    message: message.replace(/\\n/g, "<br>"),
    color: "errorbg",
    textColor: "error",
    position: "top",
    classes: "dp-notify error",
    timeout: 5000,
    html: true,
  });
};

export default {
  success,
  error,
};
