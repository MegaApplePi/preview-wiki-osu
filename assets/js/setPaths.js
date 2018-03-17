// /* globals nodeRequire */
// import notify from "./notify";

// const fs = nodeRequire("fs");
// const path = nodeRequire("path");

const $toolbarPath = document.getElementById("toolbar-path");
const $toolbarPathInput = document.getElementById("toolbar-path-input");

export default function setPaths(filePath) {
  $toolbarPathInput.value = filePath; // set the displayed value
  $toolbarPath.setAttribute("data-path", filePath); // set the internal value (we will assume that it is the current file)
  let pathParts = filePath.split(/\\|\//g);
  let rootDirectory;
  if (pathParts.includes("news")) {
    rootDirectory = pathParts.slice(0, pathParts.indexOf("news")).join("/");
    document.body.setAttribute("data-mode", "news");
  } else {
    rootDirectory = pathParts.slice(0, pathParts.indexOf("wiki")).join("/");
    document.body.setAttribute("data-mode", "wiki");
  }
  $toolbarPath.setAttribute("data-root", rootDirectory);

  /*
  let rootDirectoryFiles = fs.readdirSync(path.resolve(rootDirectory));
  let checks = [rootDirectoryFiles.indexOf(".git"), rootDirectoryFiles.indexOf(".github"), rootDirectoryFiles.indexOf("news"), rootDirectoryFiles.indexOf("wiki")];
  if (checks.includes(-1)) {
    notify("Warning 5: not an osu-wiki repo");
  }
  */
}
