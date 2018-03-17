const $wikiBodyPageContent = document.getElementById("wiki-body-page-content");
const $wikiBodyPageTocList = document.getElementById("wiki-body-page-toc-list");
const $newsBody = document.getElementById("news-body");

export default function resetBody() {
  while ($wikiBodyPageContent.firstChild) {
    $wikiBodyPageContent.removeChild($wikiBodyPageContent.firstChild);
  }
  while ($wikiBodyPageTocList.firstChild) {
    $wikiBodyPageTocList.removeChild($wikiBodyPageTocList.firstChild);
  }
  while ($newsBody.firstChild) {
    $newsBody.removeChild($newsBody.firstChild);
  }
}
