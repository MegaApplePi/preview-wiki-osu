import {$toolbarMenu, $toolbarMenuList} from "./$$DOM";
import $toolbarMenu_click from "./$toolbarMenu_click";

// window click event handler
export default function window_click(e) {
  let {target} = e;
  let {children} = $toolbarMenuList;

  // did the user NOT click inside the toolbar?
  if (![...children].includes(target)) {
    // if so:
    // hide the toolbar menu
    $toolbarMenuList.setAttribute("data-hidden", "");

    // remove this event
    window.removeEventListener("click", window_click);

    // add the toolbar menu click event (to allow it to be opened again)
    $toolbarMenu.addEventListener("click", $toolbarMenu_click);
  }
}
