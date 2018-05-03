import {$toolbarPath, $toolbarPathInput} from "./$$DOM";

// set paths to the toolbar path input
export default function setPaths(filePath) {
  // set the displayed value
  $toolbarPathInput.value = filePath;

  // set the internal value (we will assume that it is the current file)
  $toolbarPath.setAttribute("data-path", filePath);
  let pathParts = filePath.split(/\\|\//g);
  let rootDirectory;

  // does the path have "news" in it?
  if (pathParts.includes("news")) {
    // if so, we are in "news" mode
    rootDirectory = pathParts.slice(0, pathParts.indexOf("news")).join("/");
    document.body.setAttribute("data-mode", "news");
  } else {
    // if not, we are in "wiki" mode
    rootDirectory = pathParts.slice(0, pathParts.indexOf("wiki")).join("/");
    document.body.setAttribute("data-mode", "wiki");
  }
  $toolbarPath.setAttribute("data-root", rootDirectory);
}
