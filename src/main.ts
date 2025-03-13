import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import { createPinia } from "pinia";
import { handleError } from "@/helpers/handleError";
import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/i18n";
import quasarIconSet from "quasar/icon-set/material-icons";
import registerGlobalComponents from "@/helpers/global-components";
import "quasar/src/css/index.sass";
import "@/css/platform.scss";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar, {
  plugins: { Notify },
  iconSet: quasarIconSet,
});

app.use(router);
app.use(i18n);
app.use(pinia);
registerGlobalComponents(app);

app.config.errorHandler = async (err) => {
  handleError(err);
};

app.mount("#app");
