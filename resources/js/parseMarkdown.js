import {fs} from "./$$nodeRequire";
import notify from "./notify";
import parseMedia from "./parseMedia";
import parseText from "./parseText";
import setPaths from "./setPaths";

// parse a file from a given path
export default function parseMarkdown(filePath) {
  // check if the file is a file, not a directory
  if (fs.statSync(filePath).isFile()) {
    // if so, check file extension
    let extension = filePath.split(/\./).pop();
    if (extension === "md") {
      // set the path
      setPaths(filePath);

      // read the file
      let text = fs.readFileSync(filePath, {"encoding": "utf8"});

      // parse the text
      parseText(text);
    } else if (/jpe?g|png|gif/.test(extension)) {
      setPaths(filePath);

      parseMedia(filePath);
    } else {
      notify("Error 2: unexpected file type");
    }
  } else {
    notify("Error 1: unexpected directory");
  }
}
