# falcor-playground

## Getting started

1. Install dependencies with `npm install`.

2. Build the API server with `npm build`.

   - Webpack will use Babel to transpile the API code to JavaScript understandable by Node.
   - Webpack will run in development mode which with this configuration means that HMR is enabled.

3. Run the API server with `npm start`.

   - When the server starts webpack will build the client in memory.
   - When a change is made to the client, the module will get replaced live in the browser.

## Type checking

Run the following script to perform type checking once:
`npm run type-check`

It can also be performed continuously:
`npm run type-check:watch`

## Configuration

### TypeScript

TypeScript is configured in `tsconfig.json`. Some comments on the settings:

- `target` is set high to leave most of the work to Babel.
- `moduleResolution` is set to **node** to look in `node_modules` first for non-relative imports. This is the modern way of resolving modules.
- `allowJs`allows TypeScript to process .js files. This is required to resolve the HMR client.
- `noEmit` leaves the transformation of files to Babel.
- `esModuleInterop` treat ES5 (old school) modules as default imports.
- `jsx` must be enabled to use JSX syntax in TypeScript files.
- `allowSyntheticDefaultImports` must be enabled to avoid a lot of `import * as` in TypeScript.

### Webpack

Webpack is configured in the `webpack.*.config.ts` files. The Express server and a React client has different react configurations since the client is built for web and the server is built for Node.

Furthermore, the client build has different configurations for development and production since we want HMR and development tools in dev and optimization in production.

The configuration file is transpiled to JavaScript by Babel with a require hook. This is the `--config-register` part of the build script.

Some comments on the webpack config:

- `name` is needed by `webpack-hot-middleware` to keep bundles apart.
- `entry` points out where to find the root of the API code.
- `output` tells Babel where to transform the files when building.
- `target` tells Webpack how the bundle will be executed.
- `externals` tells Webpack not to bundle the node_modules with the API. This is standard for backend Webpack applications.
- `module.rules` defines that TypeScript will be transpiled by Babel.
- `resolve` lists all extensions that can be omitted in import paths.

### Babel

Babel is configured in `package.json` in the `"babel"` section. Each preset is a collection of plugins commonly used together for a specific purpose. These plugins help Babel transform and parse newer syntax.

See [Babel plugin docs](https://babeljs.io/docs/en/plugins) for more information.
