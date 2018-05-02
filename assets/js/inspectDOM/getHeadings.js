import {$wikiBodyPageContent} from "../$$DOM";

// get headings from wiki or news body
export default function getHeadings() {
  return $wikiBodyPageContent.querySelectorAll("h1, h2, h3");
  // h4, h5, h6 are no longer displayed
  // return $wikiBodyPageContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
}
