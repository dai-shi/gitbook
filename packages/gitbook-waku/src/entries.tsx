// import { Suspense } from 'react';
import { createPages } from 'waku';
import type { PathsForPages } from 'waku/router';

// import SiteCatchAllLoading from './app/(site)/(content)/[[...pathname]]/loading';
// import SiteCatchAllPage from './app/(site)/(content)/[[...pathname]]/page';
// import SiteCatchAllNoteFound from './app/(site)/(content)/[[...pathname]]/not-found';
// import SiteContentLayout from './app/(site)/(content)/layout';
// import SiteLayout from './app/(site)/layout';
// import SiteError from './app/(site)/error';
// import SiteFetch from './app/(site)/fetch';

const pages = createPages(async ({ createPage, createLayout }) => [
    createLayout({
        render: 'dynamic',
        path: '/',
        component: ({ children }) => <>{children}</>,
    }),
    /*
    createLayout({
        render: 'dynamic',
        path: '/',
        component: ({ children }) => <SiteLayout>{children}</SiteLayout>,
    }),
    */

    createPage({
        render: 'dynamic',
        path: '/foo/[pathname]',
        component: ({ pathname }) => (
            <div>
                <h1>Hello GitBook-Waku</h1>
                <p>/foo/{pathname}</p>
            </div>
        ),
    }),
    createPage({
        render: 'dynamic',
        path: '/bar/[...pathname]',
        component: ({ pathname }) => (
            <div>
                <h1>Hello GitBook-Waku</h1>
                <p>/bar/{pathname.join('/')}</p>
            </div>
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

    // Custom Not Found page
    createPage({
        render: 'static',
        path: '/404',
        component: () => <h1>Not Found</h1>,
    }),
]);

declare module 'waku/router' {
    interface RouteConfig {
        paths: PathsForPages<typeof pages>;
    }
    interface CreatePagesConfig {
        pages: typeof pages;
    }
}

export default pages;
