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
