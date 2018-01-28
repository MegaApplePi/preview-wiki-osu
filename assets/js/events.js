/* globals nodeRequire */
import notify from "./notify";
import parseFile from "./parseFile";
import requestParsedown from "./requestParsedown";

const {app, dialog} = nodeRequire("electron").remote;
const fs = nodeRequire("fs");
const path = nodeRequire("path");

const $loading = document.getElementById("loading");
const $wiki = document.getElementById("wiki");
const $wikiBodyToc = document.getElementById("wiki-body-toc");
const $wikiBodyTocContent = document.getElementById("wiki-body-toc-content");
const $toolbarPath = document.getElementById("toolbar-path");
const $toolbarUpload = document.getElementById("toolbar-upload");
const $toolbarMenu = document.getElementById("toolbar-menu");
const $toolbarMenuList = document.getElementById("toolbar-menu-list");

function window_drop(e) {
  e.preventDefault();

  // hand the first file path to parseFile()
  parseFile(e.dataTransfer.files[0].path);

  return false;
}
function window_dragover(e) {
  e.preventDefault();
  return false;
}
let keyMap = {};
function window_keydown(e) {
  let {key} = e;
  keyMap[key] = true;
  return false;
}
function window_keyup(e) {
  if ((keyMap.Control && keyMap.r) || (keyMap.Control && keyMap.R)) {
    if ($toolbarPath.getAttribute("data-value")) {
      parseFile($toolbarPath.getAttribute("data-value"));
    }
  } else if ((keyMap.Control && keyMap.o) || (keyMap.Control && keyMap.O)) {
    $toolbarUpload.click();
  } else if (keyMap.F12) {
    nodeRequire("electron").remote.getCurrentWindow().toggleDevTools();
  }
  let {key} = e;
  delete keyMap[key];
  return false;
}
function $wiki_scroll() {
  // not really the optimal way to do this, but it works... in previous attempts, using postition fixed breaks it
  if ($wikiBodyTocContent.getBoundingClientRect().height < window.innerHeight) {
    if ($wikiBodyToc.getBoundingClientRect().top < $wiki.scrollTop && $wiki.scrollTop - 156 > 0) {
      $wikiBodyTocContent.style.top = `${$wiki.scrollTop - 156}px`;
    } else if ($wiki.scrollTop === 0) {
      $wikiBodyTocContent.style.top = "0";
    }
  }
}
function $toolbarUpload_click() {
  let input = dialog.showOpenDialog({
    "title": "Open",
    "defaultPath": $toolbarPath.getAttribute("data-value") || app.getPath("home"),
    "filters": [
      {
        "name": "Markdown",
        "extensions": ["md"]
      }
    ]
  });
  if (input) {
    parseFile(input[0]);
  } else {
    notify("Error 6: no file was selected");
  }
}

function $toolbarMenu_click() {
  $toolbarMenuList.removeAttribute("data-hidden");
}

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
    requestParsedown(responseText);
  }
}
function xhr_error(e) {
  let {status} = e.target;
  notify(`Error 8: GitHub server (${status}) error`);
}

// TODO get images from github if using github path
// TODO fix for local file paths
function $toolbarPath_keypress(e) {
  let {key} = e;
  if (key === "Enter") {
    let {value} = $toolbarPath;
    let githubPath = value.split(/\//g);
    if (githubPath[2] === "github.com" && githubPath[4] === "osu-wiki" && githubPath[5] === "blob") {
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
      let xhr = new XMLHttpRequest();
      xhr.open("GET", value);
      xhr.addEventListener("loadstart", xhr_loadstart);
      xhr.addEventListener("loadend", xhr_loadend);
      xhr.addEventListener("load", xhr_load);
      xhr.addEventListener("error", xhr_error);
      xhr.send();
    } else if (fs.existsSync(path.resolve(value))) {
      parseFile(path.resolve(value));
    } else {
      notify("Error 9: invalid path");
    }
  }
}

export default function events() {
  window.addEventListener("drop", window_drop);
  window.addEventListener("dragover", window_dragover);
  window.addEventListener("keydown", window_keydown);
  window.addEventListener("keyup", window_keyup);
  $wiki.addEventListener("scroll", $wiki_scroll);
  $toolbarUpload.addEventListener("click", $toolbarUpload_click);
  $toolbarMenu.addEventListener("click", $toolbarMenu_click);
  $toolbarPath.addEventListener("keypress", $toolbarPath_keypress);
}
