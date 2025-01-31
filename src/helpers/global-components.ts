import type { App } from "vue";

// `src/components/` の .vue ファイルを自動インポート
const requireComponent = import.meta.glob("@/components/**/*.vue", {
  eager: true,
});

export default function registerGlobalComponents(app: App) {
  Object.entries(requireComponent).forEach(([path, module]) => {
    const componentName = path
      .split("/")
      .pop()
      ?.replace(/\.\w+$/, ""); // ファイル名から拡張子を除く

    if (componentName && module) {
      app.component(componentName, (module as any).default);
    }
  });
}
