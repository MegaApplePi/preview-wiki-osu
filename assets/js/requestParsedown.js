import inspectDOM from "./inspectDOM";
import notify from "./notify";

const $loading = document.getElementById("loading");
const $wiki = document.getElementById("wiki");
const $wikiBodyPageContent = document.getElementById("wiki-body-page-content");

function xhr_loadstart() {
  $loading.removeAttribute("data-hidden");
}
function xhr_loadend() {
  $loading.setAttribute("data-hidden", "");
}
function xhr_load(e) {
  let {status, responseText} = e.target;
  if (/^(4|5)\d{2}$/.test(status)) {
    // didParsedownFail = true;
    // render(text);
    notify(`Error 3: Parsedown server (${status}) error; using Showdown`);
  } else {
    // didParsedownFail = false;
    // render(responseText);
    responseText = responseText.replace(/\u219c/g, "&#x3c;");// parse \u219c back to <
    responseText = responseText.replace(/\u219d/g, "&#x3e;");// parse \u219d back to >
    $wikiBodyPageContent.insertAdjacentHTML("afterBegin", responseText);
  }
  $wiki.scrollTop = 0;
  inspectDOM();
}
function xhr_error(e) {
  let {status} = e.target;
  notify(`Error 4: Parsedown server (${status}) error; using Showdown`);
}

export default function requestParsedown(text) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://script.megaapplepi.net/preview-wiki-osu/index.php");
  xhr.addEventListener("loadstart", xhr_loadstart);
  xhr.addEventListener("loadend", xhr_loadend);
  xhr.addEventListener("load", xhr_load);
  xhr.addEventListener("error", xhr_error);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`text=${encodeURIComponent(text)}`);
  // TODO find a good fallback for local
}
