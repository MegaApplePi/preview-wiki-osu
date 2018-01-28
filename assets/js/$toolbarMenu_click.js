const $toolbarMenuList = document.getElementById("toolbar-menu-list");

export default function $toolbarMenu_click() {
  $toolbarMenuList.removeAttribute("data-hidden");
}
