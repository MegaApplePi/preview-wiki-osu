import {window_keydown, window_keyup} from "./window_key";
import $toolbarMenu_click from "./$toolbarMenu_click";
import $toolbarPathInput_keypress from "./$toolbarPathInput_keypress";
import $toolbarUpload_click from "./$toolbarUpload_click";
import $wiki_scroll from "./$wiki_scroll";
import window_dragover from "./window_dragover";
import window_drop from "./window_drop";

const $wiki = document.getElementById("wiki");
const $toolbarPathInput = document.getElementById("toolbar-path-input");
const $toolbarUpload = document.getElementById("toolbar-upload");
const $toolbarMenu = document.getElementById("toolbar-menu");

export default function events() {
  window.addEventListener("drop", window_drop);
  window.addEventListener("dragover", window_dragover);
  window.addEventListener("keydown", window_keydown);
  window.addEventListener("keyup", window_keyup);
  $wiki.addEventListener("scroll", $wiki_scroll);
  $toolbarUpload.addEventListener("click", $toolbarUpload_click);
  $toolbarMenu.addEventListener("click", $toolbarMenu_click);
  $toolbarPathInput.addEventListener("keypress", $toolbarPathInput_keypress);
}
