# preview-wiki-osu

> RIP June 2017 - May 2018; Previously named `mdp-osu`, a tool to render Markdown files as if they were from osu! web. Died after motivation loss.

osu!wiki Markdown Previewer.

---

## Final regards:

If errors 3 or 4 keep appearing, then it is likely that the Parsedown scripts (which is/was hosted on my server) were removed by me. When this happens (or prior to this), see the PHP folder for the Parsedown files.

Basically, you will need to run a local PHP server (`php -S localhost:8080`, or whichever port you want) with the contents of that folder (or host it on your web server). Once started, replace line 40 in `requestParsedown.js` with:

```js
xhr.open("POST", "localhost:8080/index.php");
```

Or the URL that you are hosting the PHP scripts on. With that, error 3/4 should go away.

---

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

## Stuff used in this project

-   [osu-web](https://github.com/ppy/osu-web)
-   [osu-wiki](https://github.com/ppy/osu-wiki)
-   [electron](https://electronjs.org)
-   [js-yaml](https://github.com/nodeca/js-yaml)
-   [showdown](https://github.com/showdownjs/showdown)
-   [electron-packager](https://github.com/electron-userland/electron-packager)
-   [webpack](https://webpack.js.org)
    -   [UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
