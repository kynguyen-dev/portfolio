# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Portfolio

Install environment

- node: v20.11.1
- yarn: 4.1.1

Install package manager (yarn):

    npm install -g yarn

Install package dependencies (node_module):

    yarn install

Start project

    yarn start

Build

    yarn build

Lint

    yarn lint
    yarn lint:fix

Prettier

    yarn prettier
    yarn prettier:fix

Storybook

    yarn storybook
    yarn build-storybook
    yarn chromatic

## Deployment

### GitHub Pages (automatic)

The project is automatically deployed to GitHub Pages on every push to `master`.

**URL:** https://kynguyen-dev.github.io/portfolio/

You can also manually trigger a deployment from the [Actions tab](https://github.com/kynguyen-dev/portfolio/actions/workflows/jekyll-gh-pages.yml).

### Vercel

#### Quick Deploy (Vercel Dashboard)

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New… → Project"**
3. Import the `kynguyen-dev/portfolio` repository
4. Vercel auto-detects the Vite framework — no extra configuration needed
5. Click **Deploy**

Your site will be live at: `https://portfolio-<unique-id>.vercel.app`
You can add a custom domain (e.g. `kynguyen.dev`) in **Project Settings → Domains**.

#### CI/CD via GitHub Actions (optional)

To enable automated deployments on every push to `master` via the included workflow:

1. **Generate a Vercel Token** — Go to https://vercel.com/account/tokens and create a new token
2. **Find your Org & Project IDs** — In your Vercel project, go to **Settings → General** and copy the *Project ID* and *Org ID*
3. **Add GitHub Secrets** — In your repo, go to **Settings → Secrets and variables → Actions** and add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

Once configured, deployments trigger automatically on push to `master` or via the [Actions tab](https://github.com/kynguyen-dev/portfolio/actions/workflows/vercel-deploy.yml). Pull requests to `master` will receive preview deployments.
