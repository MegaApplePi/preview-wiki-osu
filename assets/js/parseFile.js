/* globals nodeRequire */
import notify from "./notify";
import requestParsedown from "./requestParsedown";

const fs = nodeRequire("fs");
const path = nodeRequire("path");

const $wikiBodyPageContent = document.getElementById("wiki-body-page-content");
const $wikiBodyPageTocList = document.getElementById("wiki-body-page-toc-list");
const $wikiBodyNotice = document.getElementById("wiki-body-notice");
const $toolbarPath = document.getElementById("toolbar-path");
const $pseudo = document.getElementById("pseudo");

export default function parseFile(filePath) {
  if (fs.statSync(filePath).isFile()) {
    if (filePath.split(/\./).pop() === "md") {
      $toolbarPath.value = filePath; // set the displayed value
      $toolbarPath.setAttribute("data-value", filePath); // set the internal value (we will assume that it is the current file)
      let pathParts = filePath.split(/\\|\//g);
      let rootDirectory = pathParts.slice(0, pathParts.indexOf("wiki")).join("/");
      let rootDirectoryFiles = fs.readdirSync(path.resolve(rootDirectory));
      let checks = [rootDirectoryFiles.indexOf(".git"), rootDirectoryFiles.indexOf(".github"), rootDirectoryFiles.indexOf("news"), rootDirectoryFiles.indexOf("wiki")];
      if (checks.includes(-1)) {
        notify("Warning 5: not an osu-wiki repo");
      }
      let text = fs.readFileSync(filePath, {"encoding": "utf8"});

      // when the text is sent to the server, Parsedown has issues trying to differentiate between underscores (italics) and underscores in links; to fix this, we will replace underscores in links to \u03A0 (π) then convert them back afterwards
      text = text.replace(/(?:(\]\())(?:(.*?)(\)))/g, (match) => {
        let replaced = match.replace(/_/g, "\u03A0");
        return replaced;
      });

      // clean up the wiki body and toc
      while ($wikiBodyPageContent.firstChild) {
        $wikiBodyPageContent.firstChild.remove();
      }
      while ($wikiBodyPageTocList.firstChild) {
        $wikiBodyPageTocList.firstChild.remove();
      }
      // TODO handle metadata before requesting server

      // remove html tables
      while ($pseudo.firstChild) {
        $pseudo.firstChild.remove();
      }
      $pseudo.insertAdjacentHTML("afterBegin", text);
      while ($pseudo.querySelectorAll("table").length > 0) {
        $pseudo.querySelectorAll("table")[0].remove();
      }
      text = $pseudo.innerHTML;

      requestParsedown(text);
    } else {
      notify("Error 2: unexpected file type");
    }
  } else {
    notify("Error 1: unexpected directory");
  }
}
