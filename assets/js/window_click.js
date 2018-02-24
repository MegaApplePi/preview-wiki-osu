import $toolbarMenu_click from "./$toolbarMenu_click";

const $toolbarMenu = document.getElementById("toolbar-menu");
const $toolbarMenuList = document.getElementById("toolbar-menu-list");

export default function window_click(e) {
  let {target} = e;
  let {children} = $toolbarMenuList;

  if (![...children].includes(target)) {
    $toolbarMenuList.setAttribute("data-hidden", "");
    window.removeEventListener("click", window_click);
    $toolbarMenu.addEventListener("click", $toolbarMenu_click);
  }
}
