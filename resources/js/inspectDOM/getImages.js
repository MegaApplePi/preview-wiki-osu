// get images from wiki or news body
export default function getImages() {
  return document.querySelectorAll("#wiki-body-page-content img, #news-body img");
}
