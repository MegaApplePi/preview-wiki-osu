const $wiki = document.getElementById("wiki");
const $wikiBodyToc = document.getElementById("wiki-body-toc");
const $wikiBodyTocContent = document.getElementById("wiki-body-toc-content");

export default function $wiki_scroll() {
  // not really the optimal way to do this, but it works... in previous attempts, using postition fixed breaks it
  if ($wikiBodyTocContent.getBoundingClientRect().height < window.innerHeight) {
    if ($wikiBodyToc.getBoundingClientRect().top < $wiki.scrollTop && $wiki.scrollTop - 156 > 0) {
      $wikiBodyTocContent.style.top = `${$wiki.scrollTop - 156}px`;
    } else if ($wiki.scrollTop === 0) {
      $wikiBodyTocContent.style.top = "0";
    }
  }
}
