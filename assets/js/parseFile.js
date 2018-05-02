import {fs} from "./$$nodeRequire";
import notify from "./notify";
import parseText from "./parseText";
import setPaths from "./setPaths";

// parse a file from a given path
export default function parseFile(filePath) {
  // check if the file is a file, not a directory
  if (fs.statSync(filePath).isFile()) {
    // if so, check file extension
    if (filePath.split(/\./).pop() === "md") {
      // set the path
      setPaths(filePath);

      // read the file
      let text = fs.readFileSync(filePath, {"encoding": "utf8"});

      // parse the text
      parseText(text);
    } else {
      notify("Error 2: unexpected file type");
    }
  } else {
    notify("Error 1: unexpected directory");
  }
}
