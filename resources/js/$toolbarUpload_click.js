import {app, dialog} from "./$$nodeRequire";
import {$toolbarPath} from "./$$DOM";
import notify from "./notify";
import parseFile from "./parseFile";

// toolbar upload click event
export default function $toolbarUpload_click() {
  // when clicked, display the open dialog and set input to the selected file
  let input = dialog.showOpenDialog({
    "title": "Open",
    // try to use the path from the toolbar, otherwise, use the HOME directory (instead of the application folder)
    "defaultPath": $toolbarPath.getAttribute("data-path") || app.getPath("home"),
    "filters": [
      {
        "name": "Markdown",
        "extensions": ["md"]
      }
    ]
  });
  // check if there is a file
  if (input) {
    // if so, parse it
    parseFile(input[0]);
  } else {
    notify("Error 6: no file was selected");
  }
}
