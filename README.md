# falcor-playground

## Getting started

1. Install dependencies with `npm install`.

2. Build the API server with `npm build`.

   - Webpack will use Babel to transpile the API code to JavaScript understandable by Node.
   - Webpack will run in development mode. Since the project doesn't have environment specific configurations yet, this will not have much affect.

3. Run the API server with `npm start`.

   - As of this moment you will have to restart the server manually after making code changes.

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
- `allowJs`allows TypeScript to process .js files.
- `noEmit` leaves the transformation of files to Babel.
- `strict` enables strict type checking.
- `esModuleInterop` treat ES5 (old school) modules as default imports.

### Webpack

Webpack is configured in `webpack.config.ts`. The configuration file is transpiled to JavaScript by Babel with a require hook. This is the `--config-register` part of the build script.

Some comments on the webpack config:

- `entry` points out where to find the root of the API code.
- `output` tells Babel where to transform the files when building.
- `target` specifies that the API will be run by Node (as opposed to a browser or anything else).
- `externals` tells webpack not to bundle the node_modules with the API. This is standard for backend Webpack applications.
- `module.rules` defines that TypeScript will be transpiled by Babel.
- `resolve` lists all extensions that can be omitted in import paths.

### Babel

Babel is configured in `package.json` in the `"babel"` section. Each preset is a collection of plugins commonly used together for a specific purpose. These plugins help Babel transform and parse newer syntax.

See [Babel plugin docs](https://babeljs.io/docs/en/plugins) for more information.
