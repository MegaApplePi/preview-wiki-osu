import {$toolbarPathStatus} from "./$$DOM";
import parseMarkdown from "./parseMarkdown";

// drop event handler
export default function window_drop(e) {
  // don't load the file
  e.preventDefault();

  // assume we are in local mode
  $toolbarPathStatus.setAttribute("data-status", "local");
  // hand the first file's path to parseMarkdown()
  parseMarkdown(e.dataTransfer.files[0].path);

  return false;
}
