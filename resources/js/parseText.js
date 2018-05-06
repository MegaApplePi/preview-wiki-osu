import {$metadata, $newsBody, $newsHeaderTitle, $pseudo, $wikiBodyNotice} from "./$$DOM";
import requestParsedown from "./requestParsedown";
import resetBody from "./resetBody";
import {timeagojs} from "./$$nodeRequire";

// parse the text to HTML
export default function parseText(text) {
  // modify text before handing it off to the server //
  let result = text;
  result
    // replace underscores in links to pi; parsedown appears to get confused if underscores are used for italics and in URLs
    .replace(/(?:(\]\())(?:(.*?)(\)))/g, (match) => {
      let replaced = match.replace(/_/g, "\u03A0");
      return replaced;
    })
    // replace < to leftwards wave arrow; prevent HTML from getting parsed
    .replace(/</g, "\u219c");

  // clear the body
  resetBody();

  // remove HTML tables //
  // clear the pseudo body
  while ($pseudo.firstChild) {
    $pseudo.firstChild.remove();
  }
  // insert the result into the pseudo body for table removal
  $pseudo.insertAdjacentHTML("afterBegin", result);

  // query for tables and remove them
  while ($pseudo.querySelectorAll("table").length > 0) {
    $pseudo.querySelectorAll("table")[0].remove();
  }

  // set the result to whatever's left in the pseudo body
  result = $pseudo.innerHTML;

  // metadata //
  // take the result and split it into single lines
  let lines = result.split(/\n/);
  let hasMetadata = false;
  let metadata = [];

  // go through each line to look for metadata
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    // trim each line to ensure line endings don't break stuff
    let line = lines[lineNum].trim();

    // check if the very first line has three or more hyphens
    if (lineNum === 0 && (/^-{3,}$/).test(line)) {
      // if so, we have metadata
      hasMetadata = true;

      // add this line to the list of metadata
      metadata.push(line);

      // nothing else to look for, skip ahead to next iteration
      continue;
    }

    // so, do we have metadata? (checked from previous line)
    if (hasMetadata) {
      // gather some metadata
      if (/^title:/.test(line)) {
        // news title
        let title = line.split(/(:\s+?)/);
        metadata.push([title[0], title[2].replace(/^"|"$/g, "")]);
      } else if (/^date:/.test(line)) {
        // news post date
        let date = line.split(/(:\s+?)/);
        metadata.push([date[0], date[2]]);
      } else {
        // other metadata
        metadata.push(line);
      }
      // are we at the end?
      if ((/^-{3,}$/).test(line)) {
        // if so, stop
        break;
      }
    } else {
      // if not, stop
      break;
    }
  }

  // so, is there any metadata to look at?
  if (metadata.length > 0) {
    // if so:
    // send a copy to data
    $metadata.setAttribute("data-metadata", JSON.stringify(metadata));

    // remove those lines
    lines.splice(0, metadata.length);

    // put those lines back together and set it as the result
    result = lines.join("\n");

    // did the metadata contains the outdated mark?
    if (metadata.includes("outdated: true")) {
      // if so, show the outdated notice
      $wikiBodyNotice.removeAttribute("data-hidden");
    } else {
      // if not, hide the outdated notice
      $wikiBodyNotice.setAttribute("data-hidden", "");
    }

    // look through the metadata
    for (let metavalue of metadata) {
      // is the current item an array?
      if (Array.isArray(metavalue)) {
        // if so, is the 0th value called "title"?
        if (metavalue[0] === "title") {
          // if so, set the news title
          $newsHeaderTitle.textContent = metavalue[1];
        } else if (metavalue[0] === "date") { // otherwise, is there a value called "date"?
          // if so, set the news post time
          $newsBody.insertAdjacentHTML("afterBegin", `<div class="timeago">posted <time datetime="${metavalue[1]}"></time></div>`);
          timeagojs().render(document.querySelector(".timeago > time"));
        }
      }
    }
  }

  // TODO fix bullet list spacing before requesting from server

  // send the result to the parsedown server
  requestParsedown(result);
}
