# preview-wiki-osu

> mdp-osu, but—programmatically speaking—modularized

osu!wiki Markdown Previewer.

## Developing

Requirements:

-   Git
-   [Node.js](https://nodejs.org/en/)
    -   npm

---

1.  Fork and clone this repo.
2.  Open the repo on your computer.
3.  Open powershell (or whatever terminal you use)
4.  `npm install`
5.  `npm run dev`

## Running

Requirements:

-   Git
-   [Node.js](https://nodejs.org/en/)
    -   npm

1.  Fork and clone this repo.
2.  Open the repo on your computer.
3.  Open powershell (or whatever terminal you use)
4.  `npm install`
5.  `npm run start`

## Errors

-   Error 1: unexpected directory
    -   Type: local files
    -   The given file/path was a directory.
-   Error 2: unexpected file type
    -   Type: local files
    -   The given file/path was a different file type.
    -   Only `.md` files are accepted.
-   Error 3: Parsedown server ({error code}) error; using Showdown
    -   Type: local files
    -   The request to the Parsedown server was loaded but errored.
-   Error 4: Parsedown server ({error code}) error; using Showdown
    -   Type: local files
    -   The request failed.
-   Warning 5: not an osu-wiki repo
    -   Type: local files
    -   Loaded file was not part of the osu-wiki repository.
-   Error 6: no file was selected
    -   Type: local files
    -   No file was selected when using the file dialog
-   Error 7: GitHub server ({error code}) error
    -   Type: GitHub files
    -   The request to the GitHub server was loaded but errored.
-   Error 8: GitHub server ({error code}) error
    -   Type: GitHub files
    -   The request failed.
-   Error 9: invalid path
    -   Type: local files
    -   The given path does not exist

## Respect

-   [osu-web](https://github.com/ppy/osu-web)
-   [osu-wiki](https://github.com/ppy/osu-wiki)
-   [electron](https://electronjs.org)
-   [js-yaml](https://github.com/nodeca/js-yaml)
-   [showdown](https://github.com/showdownjs/showdown)
-   [electron-packager](https://github.com/electron-userland/electron-packager)
-   [webpack](https://webpack.js.org)
