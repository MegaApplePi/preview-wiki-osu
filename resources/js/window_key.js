import {$toolbarPath, $toolbarUpload} from "./$$DOM";
import parseMarkdown from "./parseMarkdown";
import {remote} from "./$$nodeRequire";

let keyMap = {};
// key down event
export function window_keydown(e) {
  let {key} = e;
  // note that the key is being pressed down
  keyMap[key] = true;
  return false;
}
// key up event
export function window_keyup(e) {
  // is Control and R being pressed at the same time?
  if ((keyMap.Control && keyMap.r) || (keyMap.Control && keyMap.R)) {
    // if so, is there a value saved in the toolbar path?
    if ($toolbarPath.getAttribute("data-path")) {
      // if so, parse the file again
      parseMarkdown($toolbarPath.getAttribute("data-path"));
    }
  } else if ((keyMap.Control && keyMap.o) || (keyMap.Control && keyMap.O)) { // is Control and O being pressed at the same time?
    // if so, show the open dialog
    $toolbarUpload.click();
  } else if (keyMap.F12) { // is F12 being pressed?
    // if so, toggle the DevTools
    remote.getCurrentWindow().toggleDevTools();
  } else if (keyMap.F5) { // is F5 being pressed?
    // if so, restart preview-wiki-osu
    remote.getCurrentWindow().reload();
  }
  let {key} = e;
  delete keyMap[key];
  return false;
}
