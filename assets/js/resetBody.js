import {$newsBody, $wikiBodyPageContent, $wikiBodyPageTocList} from "./$$DOM";

// reset body function
// this just removes everything from the wiki and news bodies
export default function resetBody() {
  while ($wikiBodyPageContent.firstChild) {
    $wikiBodyPageContent.firstChild.remove();
  }
  while ($wikiBodyPageTocList.firstChild) {
    $wikiBodyPageTocList.firstChild.remove();
  }
  while ($newsBody.firstChild) {
    $newsBody.firstChild.remove();
  }
}
