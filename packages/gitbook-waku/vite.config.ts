import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        tsconfigPaths({
            root: fileURLToPath(new URL('.', import.meta.url)),
        }),
        {
            name: 'custom-optimize-deps',
            enforce: 'pre',
            configResolved(config) {
                // TODO HACK temporary solution until v0.22.0
                if (config.cacheDir.endsWith('node_modules/.vite/waku-dev-server-rsc')) {
                    // config.ssr.optimizeDeps.include!.push('next/font/local');
                }
            },
        },
    ],
});
