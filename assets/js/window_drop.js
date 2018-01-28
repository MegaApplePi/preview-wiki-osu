import parseFile from "./parseFile";

export default function window_drop(e) {
  e.preventDefault();

  // hand the first file path to parseFile()
  parseFile(e.dataTransfer.files[0].path);

  return false;
}
