import window_click from "./window_click";

const $toolbarMenu = document.getElementById("toolbar-menu");
const $toolbarMenuList = document.getElementById("toolbar-menu-list");

function addClick() {
  window.addEventListener("click", window_click);
}

export default function $toolbarMenu_click() {
  $toolbarMenu.removeEventListener("click", $toolbarMenu_click);
  $toolbarMenuList.removeAttribute("data-hidden");
  setTimeout(addClick, 1);
}
