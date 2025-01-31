import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import i18n from "@/plugins/i18n";
import quasarIconSet from "quasar/icon-set/material-icons";
import registerGlobalComponents from "@/helpers/global-components";
import "quasar/src/css/index.sass";
import "@/css/app.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet,
});

app.use(router);
app.use(i18n);
registerGlobalComponents(app);

app.mount("#app");
