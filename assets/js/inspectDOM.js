import {$toolbarPath, $wikiBodyPageTocList, $wikiHeaderSubtitle, $wikiHeaderTitle} from "./$$DOM";
import {path, shell} from "./$$nodeRequire";
import getHeadingID from "./inspectDOM/getHeadingID";
import getHeadings from "./inspectDOM/getHeadings";
import getImages from "./inspectDOM/getImages";

function getLinks() {
  return document.querySelectorAll("#wiki-body-page-content a, #news-body a");
}

function preventDefault(e) {
  e.preventDefault();
  return false;
}

export default function inspectDOM() {
  let headings = getHeadings();// get a sample of the headings

  /* get the title and subtitle */
  // NOTE we believe that osu!wiki uses the first h1 element, then uses the first heading element, then uses the URL
  if (document.body.getAttribute("data-mode") === "wiki") {
    (function() {
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
        let pathParts = $toolbarPath.getAttribute("data-path").split(/\\|\//);
        let title = pathParts[pathParts.length - 2].replace(/_/g, " ");
        $wikiHeaderTitle.textContent = title;
      }
    })();

    // NOTE we believe that the subtitle is obtained from the URL
    (function() {
      let pathParts = $toolbarPath.getAttribute("data-path").split(/\\|\//);
      let subtitle = pathParts[pathParts.length - 3].replace(/_/g, " ");
      if (subtitle === "wiki") {
        $wikiHeaderSubtitle.textContent = "";
      } else {
        $wikiHeaderSubtitle.textContent = subtitle;
      }
    })();

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
  }

  /* images */

  let images = getImages();
  for (let element of images) {
    let src = element.getAttribute("src");
    src = src.replace(/\u03A0/g, "_"); // convert \u03A0 (π) back to underscores
    if (/^https?:\/\/(github|raw\.githubusercontent)\.com/.test($toolbarPath.getAttribute("data-path"))) {
      // fails loading external links
      let pathParts = $toolbarPath.getAttribute("data-path").split(/\\|\//);
      pathParts[pathParts.indexOf("github.com")] = "raw.githubusercontent.com"; // change domain to GitHub's raw domain
      pathParts.splice(pathParts.indexOf("blob"), 1);// remove /blob/ in URL

      let newURL;// the new URL

      if (document.body.getAttribute("data-mode") === "wiki") {
        if (/^\//.test(src)) {
          newURL = pathParts.splice(0, pathParts.indexOf("wiki")).join("/");
        } else {
          newURL = pathParts.splice(0, pathParts.length).join("/");
        }
      } else if (document.body.getAttribute("data-mode") === "news") {
        if (/^\//.test(src)) {
          newURL = pathParts.splice(0, pathParts.indexOf("news")).join("/");
        } else {
          newURL = pathParts.splice(0, pathParts.length).join("/");
        }
      }
      src = `${newURL}/${src}`;
    } else if (/^(https?|mailto):/.test(src)) {
      continue;
    } else if (/^\//.test(src)) {
      let filePath = $toolbarPath.getAttribute("data-root");
      if (document.body.getAttribute("data-mode") === "wiki") {
        // src = path.resolve(filePath, src); // for some reason, this errors
        src = path.resolve(`${filePath}${src}`); // but this doesn't
      } else {
        src = `${filePath}/${src}`;
      }
    } else {
      let filePath = $toolbarPath.getAttribute("data-path").split(/\\|\//g);
      filePath = filePath.slice(0, filePath.length - 1).join("/");
      src = path.resolve(filePath, src);
    }

    // append a random number to purge image caching
    element.src = `${src}?${Math.random()}`;
    let isAlone = (element.parentElement.children.length === 1) && (element.parentElement.textContent.length === 0);
    let isParentTagP = element.parentElement.tagName === "P";

    if (isAlone && isParentTagP) {
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
  function openInBrowser(e) {
    e.preventDefault();
    let {target} = e;
    let href = target.getAttribute("href");
    if (/^https?|mailto:/.test(href)) {
      shell.openExternal(href);
    } else if (!(/^\/wiki\//).test(href)) {
      shell.openExternal(`https://osu.ppy.sh${href}`);
    }
    return false;
  }
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
      element.addEventListener("auxclick", preventDefault);
      element.addEventListener("click", openInBrowser);
    }
  }
  links = null; // nullify links (we are done with it)
}
