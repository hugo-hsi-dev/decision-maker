// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";
var ReactCompilerConfig = {
  target: "19"
};
var app_config_default = defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"]
      })
    ]
  },
  server: {
    experimental: {
      websocket: true
    }
  },
  react: {
    babel: {
      plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]
    }
  }
}).addRouter({
  name: "websocket",
  type: "http",
  handler: "./app/ws/handler.ts",
  // the file we created above
  target: "server",
  base: "/ws"
});
export {
  app_config_default as default
};
