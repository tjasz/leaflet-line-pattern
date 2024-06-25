# Development

After cloning the repo, install dependencies using `npm install`.

Run the jest tests with `npm test`.

Before committing changes, use `npm run lint` to format the files with prettier.

## Deploying

1. Increment the major, minor, or patch version numbers in package.json as appropriate.
1. Transpile the TypeScript into JavaScript with `npm run build`.
1. You can use `npm link` to try to test the package.
   However, if you link it to a project that already has a Leaflet instance,
   it can add a second Leaflet instance and behave poorly.
1. `npm deploy`

## Demo

The demo code in "./demo" is its own project, with different dependencies. Commands below assume your current working directory is "./demo".

To install the dependencies, run `npm install`.

The demo project uses parcel to package the JS modules. To run the demo server locally, use `npm start`. This serves a page that auto-refreshes as you make changes in the demo code or in leaflet-line-pattern.

To clean the "dist" folder of previous builds, use `npm run clean`.

TO build a page in "./dist/index.html" that can be viewed without the parcel server running, use `npm run build`.

To deploy the demo:

1. `npm run clean`
1. `npm run build`
1. `npm run deploy`
