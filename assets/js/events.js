import {$toolbarMenu, $toolbarPathInput, $toolbarUpload, $wiki} from "./$$DOM";
import {window_keydown, window_keyup} from "./window_key";
import $toolbarMenu_click from "./$toolbarMenu_click";
import $toolbarPathInput_keypress from "./$toolbarPathInput_keypress";
import $toolbarUpload_click from "./$toolbarUpload_click";
import $wiki_scroll from "./$wiki_scroll";
import window_dragover from "./window_dragover";
import window_drop from "./window_drop";

// events to set
export default function events() {
  // window events //
  window.addEventListener("drop", window_drop);
  window.addEventListener("dragover", window_dragover);
  window.addEventListener("keydown", window_keydown);
  window.addEventListener("keyup", window_keyup);

  // wiki events //
  $wiki.addEventListener("scroll", $wiki_scroll);

  // toolbar events //
  $toolbarUpload.addEventListener("click", $toolbarUpload_click);
  $toolbarMenu.addEventListener("click", $toolbarMenu_click);
  $toolbarPathInput.addEventListener("keypress", $toolbarPathInput_keypress);
}
