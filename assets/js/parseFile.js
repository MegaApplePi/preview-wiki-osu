/* globals nodeRequire */
import notify from "./notify";
import parseText from "./parseText";
import setPaths from "./setPaths";

const fs = nodeRequire("fs");

export default function parseFile(filePath) {
  if (fs.statSync(filePath).isFile()) {
    if (filePath.split(/\./).pop() === "md") {
      setPaths(filePath);
      let text = fs.readFileSync(filePath, {"encoding": "utf8"});

      parseText(text);
    } else {
      notify("Error 2: unexpected file type");
    }
  } else {
    notify("Error 1: unexpected directory");
  }
}
