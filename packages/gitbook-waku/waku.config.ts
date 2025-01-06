import { defineConfig } from 'waku/config';

export default defineConfig({
    middleware: () => [
        import('waku/middleware/context'),
        import('./src/middleware/gitbook.js'),
        import('waku/middleware/dev-server'),
        import('waku/middleware/handler'),
    ],
    unstable_viteConfigs: {
        'dev-rsc': () => ({
            ssr: {
                optimizeDeps: {
                    include: ['ts-essentials'],
                },
            },
        }),
    },
});
