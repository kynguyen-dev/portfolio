import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import checker from 'vite-plugin-checker';
import EnvironmentPlugin from 'vite-plugin-environment';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig(_configEnv => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@public': resolve(__dirname, 'public'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@components': resolve(__dirname, 'src/components'),
        '@constants': resolve(__dirname, 'src/constants'),
        '@contexts': resolve(__dirname, 'src/contexts'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@models': resolve(__dirname, 'src/models'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@routers': resolve(__dirname, 'src/routers'),
        '@services': resolve(__dirname, 'src/services'),
        '@tests': resolve(__dirname, 'src/tests'),
        '@utils': resolve(__dirname, 'src/utils'),
      },
    },
    optimizeDeps: { include: ['node_modules/@mui/material'] },
  };
});
