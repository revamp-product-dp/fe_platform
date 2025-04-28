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

const reload = (originalMessage: string, actionButtonLabel: string, cancelButtonLabel: string) => {
  const message = originalMessage.replace(/\\n/g, "<br>");
  return Notify.create({
    message: message,
    color: "white",
    textColor: "primary",
    position: "top",
    classes: "dp-notify info reload-notify",
    timeout: 0,
    html: true,
    actions: [
      {
        label: cancelButtonLabel,
        color: "text",
        style: "margin-right: 8px;",
      },
      {
        label: actionButtonLabel,
        color: "white",
        style: "background-color: #1a2a7b; color: white; transition: background-color 0.3s;",
        class: "reload-action-btn",
        handler: () => {
          localStorage.setItem("lastReload", Date.now().toString());
          window.location.reload();
        },
      },
    ],
  });
};

export default {
  success,
  negative,
  reload,
};
