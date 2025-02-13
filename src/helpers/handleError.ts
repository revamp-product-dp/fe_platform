import Notify from "@/helpers/notify";
import router from "@/router/index";
import { useErrorStore } from "@/stores/errorStore";
import { useDisableStore } from "@/stores/disableStore";

export const handleError = async (err: any) => {
  const errorStore = useErrorStore();
  const disableStore = useDisableStore();

  console.log(err);
  disableStore.setIsDisabled(false);

  if (err.response?.data) {
    const errData = err.response?.data;
    if (errData.status == 401) {
      if (errData.type === "Expired") {
        await router.push({ name: "Error", query: { type: "session" } });
      } else {
        errorStore.setError(errData.status, errData.detail);
        Notify.negative(
          `${errorStore.error.code && errorStore.error.code + " : "}${
            errorStore.error.message
          }`
        );
      }
    } else {
      errorStore.setError(errData.status, errData.detail);
      Notify.negative(
        `${errorStore.error.code && errorStore.error.code + " : "}${
          errorStore.error.message
        }`
      );
    }
  } else {
    errorStore.setError(err.code, err.message);
    Notify.negative(
      `${errorStore.error.code ? errorStore.error.code + " : " : ""}${
        errorStore.error.message ? errorStore.error.message : "Error"
      }`
    );
  }
};
