# falcor-playground

## Purpose

The purposes of this repo is to have a project where I can explore and learn about Express, MongoDB and most of all [Falcor](https://netflix.github.io/falcor/).

I try to explain all the settings and design choices as I go. Look in the information below and in the code comments for details about how this was set up.

## Getting started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/en/) with NPM package manager.
- [MongoDB](https://www.mongodb.com/download-center/community) database server.

### Running the application

1. Install dependencies with `npm install`.

2. (Optional) Seed the database with data with `npm run seed`.

3. Run the API server with `npm start`.

    - Nodemon will run Node with a require hook to ts-node that enables node to compile server side TypeScript. Nodemon watches the `/server` folder for changes and builds the Express server in memory.
    - When the server starts Webpack will build the client in memory using Babel.
    - When a change is made to the client, the module will get replaced live in the browser by Express.

## Debugging with VS Code

1. Start the server in debug mode with `npm run debug`.

2. Create a launch script and run it:

```
{
  "name": "Debug server",
  "type": "node",
  "request": "attach", // Attach to existing process.
  "processId": "${command:PickProcess}", // Show list of processes to pick from.
  "restart": true, // Attaches again when nodemon restarts server.
  "protocol": "inspector" // Modern debugger.
}
```

3. Pick any of the processes related to this project.

4. Add a breakpoint and trigger it!

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
- `allowJs` allows TypeScript to process .js files. This is required to resolve the HMR client.
- `noEmit` leaves the transformation of files to Babel.
- `esModuleInterop` treat ES5 (old school) modules as default imports.
- `jsx` must be enabled to use JSX syntax in TypeScript files.
- `allowSyntheticDefaultImports` must be enabled to avoid a lot of `import * as` in TypeScript.
- `baseUrl` allows us to reference both client and server side code in development scripts.
- `paths` allows us to declare path aliases for non-relative imports.
- `exclude` tells the TypeScript compiler not to touch node_modules (since they should be compatible already).

### Webpack

Webpack is configured in the `webpack.*.config.ts` files. The Express server and a React client has different react configurations since the client is built for web and the server is built for Node.

Furthermore, the client build has different configurations for development and production since we want HMR and development tools in dev and optimization in production.

The configuration file is transpiled to JavaScript by Babel with a require hook. This is the `--config-register` part of the build script. This is necessary to allow ES6 and TypeScript in configuration files.

Some comments on the webpack config:

- `name` is needed by `webpack-hot-middleware` to keep bundles apart.
- `entry` points out where to find the root of the API code.
- `output` tells Babel where to transform the files when building.
- `target` tells Webpack how the bundle will be executed.
- `externals` tells Webpack not to bundle the node_modules with the API. This is standard for backend Webpack applications.
- `module.rules` defines that TypeScript will be transpiled by Babel.
- `resolve` lists all extensions that can be omitted in import paths. Note that extensions in webpack must have a dot while others (like nodemon) mustn't have one.

### Babel

Babel is configured in `package.json` in the `"babel"` section. Each preset is a collection of plugins commonly used together for a specific purpose. These plugins help Babel transform and parse newer syntax.

See [Babel plugin docs](https://babeljs.io/docs/en/plugins) for more information.

## Database design

In the early days of MongoDB they made an appalling choice of having singular names for models and plural names for the collections (table in a relational DB). For consistency all names in this project are singular.

## TODO

* HMR doesn't work for nested components. Go back and check when it stopped working.
* Error handling of DB connection.
* Path aliases doesn't always work.
* Surfing directly to sub route doesn't work.
