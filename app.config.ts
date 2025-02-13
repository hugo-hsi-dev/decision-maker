import { defineConfig } from '@tanstack/start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

const ReactCompilerConfig = {
  target: '19',
};

const config = defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
  server: {
    experimental: {
      websocket: true,
    },
  },
  react: {
    babel: {
      plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
    },
  },
});

export default (await config).addRouter({
  name: 'websocket',
  type: 'http',
  handler: './app/ws/decision.ts', // the file we created above
  target: 'server',
  base: '/ws/decision',
});
