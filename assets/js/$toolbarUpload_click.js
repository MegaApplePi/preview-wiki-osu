/* globals nodeRequire */
import notify from "./notify";
import parseFile from "./parseFile";

const {app, dialog} = nodeRequire("electron").remote;

const $toolbarPath = document.getElementById("toolbar-path");

export default function $toolbarUpload_click() {
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
