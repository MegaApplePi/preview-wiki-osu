import parseFile from "./parseFile";

const $toolbarPathStatus = document.getElementById("toolbar-path-status");

export default function window_drop(e) {
  e.preventDefault();

  $toolbarPathStatus.setAttribute("data-status", "local");
  // hand the first file path to parseFile()
  parseFile(e.dataTransfer.files[0].path);

  return false;
}
