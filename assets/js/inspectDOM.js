/* globals nodeRequire */
import getHeadingID from "./getHeadingID";

const path = nodeRequire("path");

const $wikiHeaderTitle = document.getElementById("wiki-header-title");
const $wikiHeaderSubtitle = document.getElementById("wiki-header-subtitle");
const $wikiBodyPageTocList = document.getElementById("wiki-body-page-toc-list");
const $toolbarPath = document.getElementById("toolbar-path");

function getHeadings() {
  // TODO make the query selector better
  return document.querySelectorAll("#wiki-body-page-content h1, #wiki-body-page-content h2, #wiki-body-page-content h3, #wiki-body-page-content h4, #wiki-body-page-content h5, #wiki-body-page-content h6");
}
function getImages() {
  return document.querySelectorAll("#wiki-body-page-content img");
}
function getLinks() {
  return document.querySelectorAll("#wiki-body-page-content a");
}

function preventDefault(e) {
  e.preventDefault();
  return false;
}

export default function inspectDOM() {
  let headings = getHeadings();// get a sample of the headings

  /* get the title and subtitle */
  // NOTE we believe that osu!wiki uses the first h1 element, then uses the first heading element, then uses the URL
  let tagH1; // placeholder for the h1 element (undefined == false)
  for (let element of headings) {
    if (element.tagName === "H1") {
      tagH1 = element; // if it exists, assign a reference to it (element == true)
      break;
    }
  }
  if (tagH1) { // use <h1/>, if it exists
    $wikiHeaderTitle.textContent = tagH1.textContent;
    tagH1.remove();
  } else if (headings[0]) { // use the first h# tag, if it exist
    $wikiHeaderTitle.textContent = headings[0].textContent;
    headings[0].remove();
  } else { // just use the URL
    let pathParts = $toolbarPath.value.split(/\\|\//);
    let title = pathParts[pathParts.length - 2].replace(/_/g, " ");
    $wikiHeaderTitle.textContent = title;
  }

  // NOTE we believe that the subtitle is obtained from the URL
  let pathParts = $toolbarPath.value.split(/\\|\//);
  let subtitle = pathParts[pathParts.length - 3].replace(/_/g, " ");
  if (subtitle === "wiki") {
    $wikiHeaderSubtitle.textContent = "";
  } else {
    $wikiHeaderSubtitle.textContent = subtitle;
  }

  /* TOC */
  headings = getHeadings(); // get a new sample of the headings
  // let prevTocItem;
  for (let element of headings) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.textContent = element.textContent;
    a.setAttribute("href", `#${getHeadingID(element.textContent)}`);
    li.append(a);
    li.setAttribute("data-level", element.tagName.substr(1, 1)); // We're going to cheat a bit to skip nesting these

    /*
    prevTocItem = li;
    if (["H3", "H4", "H5", "H6"].includes(element.tagName)) {
      let ol = document.createElement("ol");
      // ol.insertAdjacentElement("beforeEnd", li);
      prevTocItem.insertAdjacentElement("beforeEnd", ol);
    } else {
      $wikiBodyPageTocList.insertAdjacentElement("beforeEnd", li);
    }
    */

    $wikiBodyPageTocList.insertAdjacentElement("beforeEnd", li); // We're going to cheat a bit to skip nesting these
  }

  /* heading ids */
  headings = getHeadings(); // get a new sample of the headings
  for (let element of headings) {
    element.setAttribute("id", getHeadingID(element.textContent));
  }
  headings = null; // nullify headings (we are done with it)

  /* images */
  let images = getImages();
  for (let element of images) {
    let src = element.getAttribute("src");
    src = src.replace(/\u03A0/g, "_"); // convert \u03A0 (π) back to underscores
    if (/^(https?|mailto):/.test(src)) {
      continue;
    } else if (/^\//.test(src)) {
      let filePath = $toolbarPath.getAttribute("data-value").split(/\\|\//g);
      filePath = filePath.slice(0, filePath.indexOf("wiki")).join("/");
      // src = path.resolve(filePath, src); // for some reason, this errors
      src = path.resolve(`${filePath}${src}`); // but this doesn't
    } else {
      let filePath = $toolbarPath.getAttribute("data-value").split(/\\|\//g);
      filePath = filePath.slice(0, filePath.length - 1).join("/");
      src = path.resolve(filePath, src);
    }
    element.src = src;
    let hasTitle = element.hasAttribute("title") && (element.getAttribute("title").length > 0);
    let isAlone = (element.parentElement.children.length === 1) && (element.parentElement.textContent.length === 0);
    let isParentTagP = element.parentElement.tagName === "P";

    if (hasTitle && isAlone && isParentTagP) {
      element.parentElement.classList.add("figure");
      element.classList.add("figure");
      let em = document.createElement("em");
      em.textContent = element.getAttribute("title");
      element.insertAdjacentElement("afterEnd", em);
    }
    element.addEventListener("mousedown", preventDefault);
    element.addEventListener("click", preventDefault);
  }
  images = null; // nullify images (we are done with it)

  /* links */
  let links = getLinks();
  for (let element of links) {
    let href = element.getAttribute("href");
    href = href.replace(/\u03A0/g, "_"); // convert \u03A0 (π) back to underscores
    element.href = href;
    if (/^#/.test(href)) {
      // allow clicking on section links
      element.setAttribute("data-title", "section link");
    } else {
      element.addEventListener("mousedown", preventDefault);
      element.addEventListener("click", preventDefault);
      element.addEventListener("auxclick", preventDefault);
    }
  }
  links = null; // nullify links (we are done with it)
}
