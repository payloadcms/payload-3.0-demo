# Payload 3.0 Alpha Demo

This repo showcases a demo of Payload 3.0 running completely within Next.js.

> [!IMPORTANT]
> It's extremely important to note that as of now, this demo contains ALPHA software and you are 100% guaranteed to run into bugs / weird stuff.
> 
> We're actively working toward a beta release, and then a full stable release as fast as we possibly can.

### Highlights

1. Payload is now Next.js-native
1. Turbopack works out of the box (this will get faster over time, expect more here)
1. The Payload admin UI is built with React Server Components and automatically eliminates server-side code from your admin bundle, completely alleviating the need to use Webpack aliases to remove hooks, access control, etc.
1. Payload is now fully-ESM across the board
1. GraphQL is now initialized only when you hit the GraphQL endpoint, and does not affect overhead of REST API routes
1. All UI components have been abstracted into a separate `@payloadcms/ui` package, which will be fully documented and exposed for your re-use once we hit stable 3.0 or before
1. You can run your own Next.js site alongside of Payload in the same app
1. You can now deploy Payload to Vercel, and there will be official support for Vercel Blob Storage coming soon (so no S3 needed for files)
1. Server-side HMR works out of the box, with no need for `nodemon` or similar. When the Payload config changes, your app will automatically re-initialize Payload seamlessly in the background
1. All custom React components can be server components by default, and you can decide if you want them to be server components or client components
1. Sharp has been abstracted to be an optional dependency
1. Payload now relies on the Web Request / Response APIs rather than the Node Request / Response
1. Express can still be used with Next.js' Custom Server functionality
1. Payload itself has slimmed down significantly and can now be fully portable, run anywhere. You can leverage the Payload Local API completely outside of Next.js if you want.
1. The data layer, including the shape of the database Payload used and the API responses in 2.0, has not been affected whatsoever

### Work to come

We are making this available to our community so that we can gather your feedback and test the new approach that Payload is taking. Don't expect it to be fully functional yet. There are some things that we are aware of that are not yet completed, but we're going to keep blazing through the remaining items as fast as we can to reach stable 3.0 as quickly and efficiently as possible. Here are a few of the items that we are still working on (not a full list):

1. `beforeDuplicate` hooks
1. The config `preview` function
1. Focal point / cropping
1. Documentation
1. Vercel Blob Storage adapter
1. Lots of bugs for sure
1. 100% of tests passing
1. Compiler speed improvements
1. Overall speed improvements
1. Support for all official plugins
1. An install script to be able to install Payload easily into any existing Next.js app
1. A full list of breaking changes for 2.0 -> 3.0, including an in-depth migration guide

### Technical details

**The app folder**

You'll see that Payload requires a few files to be present in your `/app` folder. There are files for the admin UI as well as files for all route handlers. We've consolidated all admin views into a single `page.tsx` and consolidated most of the REST endpoints into a single `route.ts` file for simplicity, but also for development performance. With this pattern, you only have to compile the admin UI / REST API / GraphQL API a single time - and from there, it will be lightning-fast.

**The `next.config.js` `withPayload` function**

You'll see in the Next.js config that we have a `withPayload` function installed. This function is required for Payload to operate, and it ensures compatibility with packages that Payload needs such as `drizzle-kit`, `sharp`, `pino`, and `mongodb`.

---

---

### Find a bug?

Open an issue at `https://github.com/payloadcms/payload` with as much detail as you can provide and we will tackle them as fast as we can. Let's get stable!
