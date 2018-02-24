/* globals nodeRequire */
import notify from "./notify";
import parseFile from "./parseFile";
import requestParsedown from "./requestParsedown";
import resetWikiBody from "./resetWikiBody";

const fs = nodeRequire("fs");
const path = nodeRequire("path");

const $loading = document.getElementById("loading");
const $toolbarPathInput = document.getElementById("toolbar-path-input");
const $toolbarPathStatus = document.getElementById("toolbar-path-status");

function xhr_loadstart() {
  $loading.removeAttribute("data-hidden");
}
function xhr_loadend() {
  $loading.setAttribute("data-hidden", "");
}
function xhr_load(e) {
  let {status, responseText} = e.target;
  if (/^(4|5)\d{2}$/.test(status)) {
    notify(`Error 7: GitHub server (${status}) error`);
  } else {
    resetWikiBody();
    requestParsedown(responseText);
  }
}
function xhr_error(e) {
  let {status} = e.target;
  notify(`Error 8: GitHub server (${status}) error`);
}

// TODO support osu.ppy.sh links (assume English and support ?locale=)
export default function $toolbarPathInput_keypress(e) {
  let {key} = e;
  if (key === "Enter") {
    $toolbarPathInput.blur();
    let {value} = $toolbarPathInput;
    let githubPath = value.split(/\//g);
    if (githubPath[2] === "github.com" && githubPath[4] === "osu-wiki" && githubPath[5] === "blob") {
      $toolbarPathStatus.setAttribute("data-status", "GitHub");
      let xhr = new XMLHttpRequest();
      let user = githubPath[3];
      let branchPath = githubPath.splice(6, githubPath.length - 1).join("/");
      let rawPath = `https://raw.githubusercontent.com/${user}/osu-wiki/${branchPath}`;

      xhr.open("GET", rawPath);
      xhr.addEventListener("loadstart", xhr_loadstart);
      xhr.addEventListener("loadend", xhr_loadend);
      xhr.addEventListener("load", xhr_load);
      xhr.addEventListener("error", xhr_error);
      xhr.send();
    } else if (githubPath[2] === "raw.githubusercontent.com" && githubPath[4] === "osu-wiki") {
      $toolbarPathStatus.setAttribute("data-status", "GitHub");
      let xhr = new XMLHttpRequest();
      xhr.open("GET", value);
      xhr.addEventListener("loadstart", xhr_loadstart);
      xhr.addEventListener("loadend", xhr_loadend);
      xhr.addEventListener("load", xhr_load);
      xhr.addEventListener("error", xhr_error);
      xhr.send();
    } else if (fs.existsSync(path.resolve(value))) {
      $toolbarPathStatus.setAttribute("data-status", "local");
      parseFile(path.resolve(value));
    } else {
      notify("Error 9: invalid path");
    }
  }
}
