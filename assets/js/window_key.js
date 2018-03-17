/* globals nodeRequire */
import parseFile from "./parseFile";

const $toolbarPath = document.getElementById("toolbar-path");
const $toolbarUpload = document.getElementById("toolbar-upload");

let keyMap = {};
export function window_keydown(e) {
  let {key} = e;
  keyMap[key] = true;
  return false;
}
export function window_keyup(e) {
  if ((keyMap.Control && keyMap.r) || (keyMap.Control && keyMap.R)) {
    if ($toolbarPath.getAttribute("data-path")) {
      parseFile($toolbarPath.getAttribute("data-path"));
    }
  } else if ((keyMap.Control && keyMap.o) || (keyMap.Control && keyMap.O)) {
    $toolbarUpload.click();
  } else if (keyMap.F12) {
    nodeRequire("electron").remote.getCurrentWindow().toggleDevTools();
  } else if (keyMap.F5) {
    nodeRequire("electron").remote.getCurrentWindow().reload();
  }
  let {key} = e;
  delete keyMap[key];
  return false;
}
