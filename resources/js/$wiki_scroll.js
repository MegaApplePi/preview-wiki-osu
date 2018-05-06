import {$wiki, $wikiBodyPageToc, $wikiBodyPageTocContent} from "./$$DOM";

// wiki scroll event
export default function $wiki_scroll() {
  // NOTE this is probably not the most optimal way to do this, but it works... in previous attempts, using postition fixed breaks it

  // check if the TOC is shorter than the window height
  if ($wikiBodyPageTocContent.getBoundingClientRect().height < window.innerHeight - 36) {
    // if so, the TOC scrolls with the page

    // check if the page is scrolled to a different scroll position
    if ($wikiBodyPageToc.getBoundingClientRect().top < $wiki.scrollTop && $wiki.scrollTop - 164 > 0) {
      // if so, set the TOC's top to that position
      $wikiBodyPageTocContent.style.top = `${$wiki.scrollTop - 164}px`;
    } else if ($wiki.scrollTop === 0) {
      // if wiki is scrolled to the very top, put the TOC back (otherwise it may go up too much)
      $wikiBodyPageTocContent.style.top = "0";
    }
  } else {
    // if not, the TOC stays at the top
    $wikiBodyPageTocContent.style.top = "0";
  }
}
