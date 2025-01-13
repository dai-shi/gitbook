import { Suspense } from 'react';
import { createPages } from 'waku';
import type { PathsForPages } from 'waku/router';

import SiteCatchAllLoading from './app/(site)/(content)/[[...pathname]]/loading';
// import SiteCatchAllPage from './app/(site)/(content)/[[...pathname]]/page';
// import SiteCatchAllNoteFound from './app/(site)/(content)/[[...pathname]]/not-found';
import SiteContentLayout from './app/(site)/(content)/layout';
import SiteLayout from './app/(site)/layout';
// import SiteError from './app/(site)/error';
// import SiteFetch from './app/(site)/fetch';

const pages = createPages(async ({ createPage, createLayout, createRoot }) => [
    createRoot({
        render: 'dynamic',
        component: SiteLayout,
    }),

    createLayout({
        render: 'dynamic',
        path: '/',
        component: SiteContentLayout,
    }),

    createPage({
        render: 'dynamic',
        path: '/[...pathname]',
        component: ({ pathname }) => (
            <Suspense fallback={<SiteCatchAllLoading />}>
                <h1>Hello GitBook-Waku</h1>
                <p>/{pathname.join('/')}</p>
            </Suspense>
        ),
    }),
    /*
    createPage({
        render: 'dynamic',
        path: '/[...pathname]',
        component: ({ pathname }) => (
            <Suspense fallback={<SiteCatchAllLoading />}>
                <SiteCatchAllPage params={{ pathname }} searchParams={{}} />
            </Suspense>
        ),
    }),
    */
]);

declare module 'waku/router' {
    interface RouteConfig {
        paths: PathsForPages<typeof pages>;
    }
    interface CreatePagesConfig {
        pages: typeof pages;
    }
}

// export default pages;

// TEMP to disable ssr
export default {
    handleRequest: async (input: any, utils: any) => {
        if (input.type === 'custom') {
            return null; // no ssr
        }
        return pages.handleRequest(input, utils);
    },
    handleBuild: (utils: any) => {
        return pages.handleBuild(utils);
    },
};
