/* globals nodeRequire */
import notify from "./notify";
import parseFile from "./parseFile";
import parseText from "./parseText";
import resetBody from "./resetBody";
import setPaths from "./setPaths";

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
    resetBody();
    parseText(responseText);
  }
}
function xhr_error(e) {
  let {status} = e.target;
  notify(`Error 8: GitHub server (${status}) error`);
}
function doXHR(location) {
  setPaths(location);
  let xhr = new XMLHttpRequest();
  xhr.open("GET", location);
  xhr.addEventListener("loadstart", xhr_loadstart);
  xhr.addEventListener("loadend", xhr_loadend);
  xhr.addEventListener("load", xhr_load);
  xhr.addEventListener("error", xhr_error);
  xhr.send();
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
      let user = githubPath[3];
      let branchPath = githubPath.splice(6, githubPath.length - 1).join("/");
      let rawPath = `https://raw.githubusercontent.com/${user}/osu-wiki/${branchPath}`;

      doXHR(rawPath);
    } else if (githubPath[2] === "raw.githubusercontent.com" && githubPath[4] === "osu-wiki") {
      $toolbarPathStatus.setAttribute("data-status", "GitHub");
      doXHR(value);
    } else if (fs.existsSync(path.resolve(value))) {
      $toolbarPathStatus.setAttribute("data-status", "local");
      parseFile(path.resolve(value));
    } else {
      notify("Error 9: invalid path");
    }
  }
}
