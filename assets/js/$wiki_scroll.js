const $wiki = document.getElementById("wiki");
const $wikiBodyPageToc = document.getElementById("wiki-body-page-toc");
const $wikiBodyPageTocContent = document.getElementById("wiki-body-page-toc-content");

export default function $wiki_scroll() {
  // not really the optimal way to do this, but it works... in previous attempts, using postition fixed breaks it
  if ($wikiBodyPageTocContent.getBoundingClientRect().height < window.innerHeight) {
    if ($wikiBodyPageToc.getBoundingClientRect().top < $wiki.scrollTop && $wiki.scrollTop - 156 > 0) {
      $wikiBodyPageTocContent.style.top = `${$wiki.scrollTop - 156}px`;
    } else if ($wiki.scrollTop === 0) {
      $wikiBodyPageTocContent.style.top = "0";
    }
  } else {
    $wikiBodyPageTocContent.style.top = "0";
  }
}
