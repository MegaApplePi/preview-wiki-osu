import requestParsedown from "./requestParsedown";
import resetBody from "./resetBody";

const $wikiBodyNotice = document.getElementById("wiki-body-notice");
const $pseudo = document.getElementById("pseudo");
const $newsHeaderTitle = document.getElementById("news-header-title");
const $newsBody = document.getElementById("news-body");

export default function parseText(text) {
  let result = text;
  result
    // replace underscores in links to pi
    .replace(/(?:(\]\())(?:(.*?)(\)))/g, (match) => {
      let replaced = match.replace(/_/g, "\u03A0");
      return replaced;
    });
  // if (document.body.getAttribute("data-mode") === "wiki") {
  result
    // replace < to leftwards wave arrow
    .replace(/</g, "\u219c");
  // replace > to rightwards wave arrow
  // .replace(/>/g, "\u219d");
  // }

  resetBody();

  // remove html tables
  while ($pseudo.firstChild) {
    $pseudo.firstChild.remove();
  }
  $pseudo.insertAdjacentHTML("afterBegin", result);
  while ($pseudo.querySelectorAll("table").length > 0) {
    $pseudo.querySelectorAll("table")[0].remove();
  }
  result = $pseudo.innerHTML;

  // metadata
  let lines = result.split(/\n/);
  let hasMetadata = false;
  let metadata = [];
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    let line = lines[lineNum].trim();
    if (lineNum === 0 && (/^-{3,}$/).test(line)) {
      hasMetadata = true;
      metadata.push(line);
      continue;
    }
    if (hasMetadata) {
      if (/^title:/.test(line)) {
        let title = line.split(/(:\s+?)/);
        metadata.push([title[0], title[2].replace(/^"|"$/g, "")]);
      } else if (/^date:/.test(line)) {
        let date = line.split(/(:\s+?)/);
        metadata.push([date[0], date[2]]);
      } else {
        metadata.push(line);
      }
      if ((/^-{3,}$/).test(line)) {
        break;
      }
    }
  }
  if (metadata.length > 0) {
    lines.splice(0, metadata.length);
    result = lines.join("\n");
    if (metadata.includes("outdated: true")) {
      $wikiBodyNotice.removeAttribute("data-hidden");
    } else {
      $wikiBodyNotice.setAttribute("data-hidden", "");
    }

    for (let metavalue of metadata) {
      if (Array.isArray(metavalue)) {
        if (metavalue[0] === "title") {
          $newsHeaderTitle.textContent = metavalue[1];
        } else if (metavalue[0] === "date") {
          let today = (new Date()).getTime();
          // close enough
          // https://stackoverflow.com/a/15289883 contains a better solution
          let timeago = (new Date(metavalue[1])).getTime();
          let timeDiff = Math.abs(timeago - today);
          let diffDays = Math.ceil(timeDiff / 86400000);
          let string;
          if (today > timeago) {
            string = `${diffDays} days ago`;
          } else {
            // I don't remember, but I think it said ahead if the time was ahead
            string = `${diffDays} days ahead`;
          }
          $newsBody.insertAdjacentHTML("afterBegin", `<div class="timeago">posted <time>${string}</time></div>`);
        }
      }
    }
  }

  // TODO fix bullet list spacing before requesting from server

  requestParsedown(result);
}
