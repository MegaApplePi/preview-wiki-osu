const $wikiBodyPageContent = document.getElementById("wiki-body-page-content");
const $wikiBodyPageTocList = document.getElementById("wiki-body-page-toc-list");

export default function resetWikiBody() {
  while ($wikiBodyPageContent.firstChild) {
    $wikiBodyPageContent.firstChild.remove();
  }
  while ($wikiBodyPageTocList.firstChild) {
    $wikiBodyPageTocList.firstChild.remove();
  }
}
