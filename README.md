# Projects Desktop Application

This repo is an [Electron](https://electron.atom.io)-based app, which wraps up [the projects website](https://projects.raspberrypi.org) and some [https://facebook.github.io/react/](React)-based browser controls in a native app.

## Development

Clone this repo, run `yarn install` and then `yarn dev`. You're done. The app should open up, and if you edit any React code it will automatically reload.

You can open the regular browser dev tools with `cmd + alt + i` and inspect it just like any website. Unfortunately at this time it's not possible to install the React dev tools. Hopefully that will change in future.

## What's happening here?

`npm start dev` runs Foreman, which runs the following commands:

```
react: yarn start
electron: node src/electron-wait-react
```

The first line boots the React app, and the second runs a script which waits until the React app is available, before invoking `electron` and opening the app window.

The React app is booted from `src/index.js`, and the electron app is booted from `src/electron-starter.js`.

Any changes to `src/electron-starter.js` will only take effect once the app process is killed and restarted.

## Building the application

When you want to create a release app, run `yarn build` (currently fails on the `uglifyjs` step, but bundles fine).

Once the bundle is ready, run one of the `package-*` commands present in the `package.json` file. So to build for a Mac:

`yarn package-mac`

When the build is complete you will see the built application in the `release-builds` directory.

### Building the application for Raspbian

*Note: this section will probably change when we've figured out the release procedure*

To get this up and running in Raspbian currently there are a few steps to making that happen, that one day we'll hopefully work around with a more formal release process, but what we eventually need on Raspbian is copies of the following two files from this repo, in the specified directories in Raspbian:

* `lib/project.desktop` - `/usr/share/applications`
* `lib/projects-desktop.sh` - `/usr/bin`

You will also need a copy of this project living in `/usr/lib/projects-desktop` - be sure to remove the `release-builds` directory or it will be massive.

#### How does this work?

I'm glad you asked.

1. The `projects.desktop` file creates a menu item in the "Programming" menu.
2. Clicking that runs `sh /usr/bin/projects-desktop.sh`. That file contains a line that runs a pre-built binary of Electron at `/usr/lib/electron/electron`, and passes
a directory to it, in this case `/usr/lib/projects-desktop`.
3. Electron starts up, using the file in `/usr/lib/projects-desktop` to boot the app.
4. Everyone has fun and learns loads about coding.
