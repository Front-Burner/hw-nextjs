# Front Burner - Nextjs 12 w/ Sanity V2

## The React Framework for Production:

Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed. [Next.js](https://nextjs.org)

## Technologies

- A front-end framework from Nextjs version 12
- A headless CMS by Sanity V2
- A Utility-First CSS framework [Tailwindcss](https://tailwindcss.com/)
- A production-ready motion library for React. [Framer](https://www.framer.com/motion/)


## Hosting
  
- We host on [Vercel](https://vercel.com/). If you are developing for this site please ask your web administrator for an account. 

## Quick Start

Are you new to Next.js? Check out this [video](https://www.youtube.com/watch?v=Sklc_fQBmcs)

Note: This site currently operates on NVM v16.16.0 and uses NPM as the package manager

Install dependencies with `npm install --legacy-peer-deps` the flag acknowledges that some packages are not up to date. 
Run `npm run dev` in root folder
  - Your frontend should be running on [http://localhost:3000](http://localhost:3000)
You can run `npm run build` to build the site's static pages. 
If you build pages, you can run `npm run start` to see static pages. 

## Important

When pushing new code may deploy the site when other users are making updates in the CMS. This would have the unintended consequence of pushing updates that users did not want to have on the live site. So verify with team members before pushing code,  or be sure they are not operating the CMS when making updates to the repo, or scan site the site afterwards to find any mistakes. 

## How is state management defined. 

Refer to _app.js in the pages folder. There you will see wrapper components around page content. These are defined in the context folder are a separated for simplicity. This is because we are using React Context to store global states via the user's browser. They are meant to find the user's location, compare with locations added to Sanity to find the nearest one, and whether or not the user already went through the intro animation. 


To find out how all of this is set and other logic like cookies please refer to the intro.js page in the components folder. In short, we use this to store 3 items (id, title, and slug), and use that to filter things like menu items from Sanity. 

## How access the Staging site

Instead of having a dedicated staging URL, Vercel builds preview URLs instead. Generating a new url per change posted to github Please ask for access to Vercel so you can have access to the preview urls and/or access to the Slack channel that also pushes new Vercel preview URLS.

## Site Structure

```
.
├── .next - where built pages are stored to be served on Vercel.
├── components - ror all pages that have have a blocks builder please refer to sections.js for defined components. 
├── context - where global states are defined
├── helpers - were you define google analytics, default seo, and other useful functions.
├── node_modules
├── pages - where templates are stored
├── public - where static assets are stored
├── services - Sanity Files
├── styles - css
├── .env - refer to env.local & contact your admin for keys
├── .gitignore - files & folders not to commit to github for security
├── jsconfig.json - where you define folder paths in Nextjs
├── next.config.js - Nextjs modules
├── package.json
├── README.md
└── tailwind.config.js - Settings for site styles. Look at Tailwind's documentation for configuration. 
```
