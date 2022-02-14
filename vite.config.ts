import { defineConfig } from "vite";
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        target: "esnext",
        polyfillDynamicImport: false,
    },
    resolve: {
        alias: [
            { find: '@components', replacement: '/src/components' }
        ]
    },
    server: {
        port: 3000,
    }
});

