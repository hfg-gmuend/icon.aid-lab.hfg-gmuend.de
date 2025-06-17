# Future Icon Generator

An AI-powered SVG icon generator built with SvelteKit, configured for deployment on GitHub Pages.

## Features

- Generate custom SVG icons using AI
- Clean, minimalist black and white design
- Download generated icons as SVG files
- Fully static deployment compatible with GitHub Pages

## GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Set up the repository secret:**
   - Go to your GitHub repository settings
   - Navigate to "Secrets and variables" → "Actions"
   - Add a new repository secret named `VITE_CHAT_API_KEY`
   - Set the value to your API key for the icon generation service

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"

3. **Deploy:**
   - Push to the main branch to trigger automatic deployment
   - The site will be available at `https://yourusername.github.io/repositoryname`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# The built files will be in the 'build' directory
# Upload these files to your GitHub Pages branch
```

## Local Development

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
