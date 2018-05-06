import {$toolbarMenu, $toolbarMenuList} from "./$$DOM";
import window_click from "./window_click";

// add the window click event to allow the toolbar menu to close (when clicking elsewhere)
function addClick() {
  window.addEventListener("click", window_click);
}

// toolbar menu click event
export default function $toolbarMenu_click() {
  // remove this event
  $toolbarMenu.removeEventListener("click", $toolbarMenu_click);

  // display the toolbar menu
  $toolbarMenuList.removeAttribute("data-hidden");

  // don't set the event handler right away
  setTimeout(addClick, 1);
}
