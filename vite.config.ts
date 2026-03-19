import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig(_configEnv => {
    return {
        base: process.env.BASE_PATH || '/',
        plugins: [react()],
        server: {
            port: 3000,
        },
        resolve: {
            alias: {
                '@public': resolve(__dirname, 'public'),
                '@assets': resolve(__dirname, 'src/assets'),
                '@components': resolve(__dirname, 'src/components'),
                '@constants': resolve(__dirname, 'src/constants'),
                '@contexts': resolve(__dirname, 'src/contexts'),
                '@models': resolve(__dirname, 'src/models'),
                '@pages': resolve(__dirname, 'src/pages'),
                '@routers': resolve(__dirname, 'src/routers'),
                '@utils': resolve(__dirname, 'src/utils'),
                '@i18n': resolve(__dirname, 'src/i18n'),
            },
        },
        optimizeDeps: {include: ['@mui/material']},
    };
});
