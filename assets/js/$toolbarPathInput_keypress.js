import {$loading, $toolbarPathInput, $toolbarPathStatus} from "./$$DOM";
import {fs, path} from "./$$nodeRequire";
import notify from "./notify";
import parseFile from "./parseFile";
import parseText from "./parseText";
import resetBody from "./resetBody";
import setPaths from "./setPaths";

// XHR loadstart event
function xhr_loadstart() {
  // show the loading overlay
  $loading.removeAttribute("data-hidden");
}

// XHR loadend event
function xhr_loadend() {
  // hide the loading overlay
  $loading.setAttribute("data-hidden", "");
}

// XHR load event
function xhr_load(e) {
  let {status, responseText} = e.target;
  if (/^(4|5)\d{2}$/.test(status)) {
    notify(`Error 7: GitHub server (${status}) error`);
  } else {
    resetBody();
    parseText(responseText);
  }
}

// XHR error event
function xhr_error(e) {
  let {status} = e.target;
  notify(`Error 8: GitHub server (${status}) error`);
}

// function to run the XHR
function doXHR(location) {
  setPaths(location);

  // TODO use Fetch API

  // XHR stuff to get the file
  let xhr = new XMLHttpRequest();
  xhr.open("GET", location);
  xhr.addEventListener("loadstart", xhr_loadstart);
  xhr.addEventListener("loadend", xhr_loadend);
  xhr.addEventListener("load", xhr_load);
  xhr.addEventListener("error", xhr_error);
  xhr.send();
}

// TODO support osu.ppy.sh links (assume English and support ?locale=)
// toolbar path input keypress event
export default function $toolbarPathInput_keypress(e) {
  let {key} = e;
  // watch for the Enter key
  if (key === "Enter") {
    // blur the path input to prevent spamming of the Enter key
    $toolbarPathInput.blur();

    // read the value from the path input
    let {value} = $toolbarPathInput;

    // split the path value into chunks
    let githubPath = value.split(/\//g);

    // check for path type
    if (githubPath[2] === "github.com" && githubPath[4] === "osu-wiki" && githubPath[5] === "blob") {
      // GitHub link (previewer)

      // set path status to GitHub
      $toolbarPathStatus.setAttribute("data-status", "GitHub");

      // gather info for the raw GitHub link
      let user = githubPath[3];
      let branchPath = githubPath.splice(6, githubPath.length - 1).join("/");
      let rawPath = `https://raw.githubusercontent.com/${user}/osu-wiki/${branchPath}`;

      // get path
      doXHR(rawPath);
    } else if (githubPath[2] === "raw.githubusercontent.com" && githubPath[4] === "osu-wiki") {
      // GitHub link (raw)

      // set path status to GitHub
      $toolbarPathStatus.setAttribute("data-status", "GitHub");

      // get path (skipped info gathering because this link is the raw GitHub link)
      doXHR(value);
    } else if (fs.existsSync(path.resolve(value))) {
      // local file

      // set path status to local
      $toolbarPathStatus.setAttribute("data-status", "local");

      // parse file from path value
      parseFile(path.resolve(value));
    } else {
      // invalid path
      notify("Error 9: invalid path");
    }
  }
}
