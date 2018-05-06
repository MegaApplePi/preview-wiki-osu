import {$toolbarMenu, $toolbarMenuList} from "./$$DOM";
import $toolbarMenu_click from "./$toolbarMenu_click";
import listMetadata from "./listMetadata";
import window_click from "./window_click";


// toolbar menu list click event
export default function $toolbarMenuList_click(e) {
  // hide the toolbar menu
  $toolbarMenuList.setAttribute("data-hidden", "");

  // remove the window click event
  window.removeEventListener("click", window_click);

  // add the toolbar menu click event (to allow it to be opened again)
  $toolbarMenu.addEventListener("click", $toolbarMenu_click);

  let {target} = e;
  let id = target.getAttribute("id");

  if (id === "toolbar-menu-list-tag") {
    listMetadata();
  } else if (id === "toolbar-menu-list-here") {

  } else if (id === "toolbar-menu-list-where") {

  }
}
