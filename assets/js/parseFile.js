/* globals nodeRequire */
import notify from "./notify";
import requestParsedown from "./requestParsedown";
import resetWikiBody from "./resetWikiBody";

const fs = nodeRequire("fs");
const path = nodeRequire("path");

const $wikiBodyNotice = document.getElementById("wiki-body-notice");
const $toolbarPath = document.getElementById("toolbar-path");
const $toolbarPathInput = document.getElementById("toolbar-path-input");
const $pseudo = document.getElementById("pseudo");

export default function parseFile(filePath) {
  if (fs.statSync(filePath).isFile()) {
    if (filePath.split(/\./).pop() === "md") {
      $toolbarPathInput.value = filePath; // set the displayed value
      $toolbarPath.setAttribute("data-value", filePath); // set the internal value (we will assume that it is the current file)
      let pathParts = filePath.split(/\\|\//g);
      let rootDirectory = pathParts.slice(0, pathParts.indexOf("wiki")).join("/");
      let rootDirectoryFiles = fs.readdirSync(path.resolve(rootDirectory));
      let checks = [rootDirectoryFiles.indexOf(".git"), rootDirectoryFiles.indexOf(".github"), rootDirectoryFiles.indexOf("news"), rootDirectoryFiles.indexOf("wiki")];
      if (checks.includes(-1)) {
        notify("Warning 5: not an osu-wiki repo");
      }
      let text = fs.readFileSync(filePath, {"encoding": "utf8"});

      // replace underscores in links to pi
      text = text.replace(/(?:(\]\())(?:(.*?)(\)))/g, (match) => {
        let replaced = match.replace(/_/g, "\u03A0");
        return replaced;
      });
      // replace less than to leftwards wave arrow
      text = text.replace(/</g, "\u219c");
      // replace greater than to rightwards wave arrow
      text = text.replace(/>/g, "\u219d");

      resetWikiBody();

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

      let lines = text.split(/\n/);
      let outdatedLine1 = (/^-{3,}$/).test(lines[0].trim());
      let outdatedLine2 = (/^outdated:\strue$/.test(lines[1].trim()));
      let outdatedLine3 = (/^-{3,}$/).test(lines[2].trim());
      if (outdatedLine1 && outdatedLine2 && outdatedLine3) {
        lines.splice(0, 3);
        text = lines.join("\n");
        $wikiBodyNotice.removeAttribute("data-hidden");
      } else {
        $wikiBodyNotice.setAttribute("data-hidden", "");
      }

      requestParsedown(text);
    } else {
      notify("Error 2: unexpected file type");
    }
  } else {
    notify("Error 1: unexpected directory");
  }
}
