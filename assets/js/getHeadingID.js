export default function getHeadingID(headingText) {
  let id = headingText.toLowerCase().replace(/\s/g, "-");
  return id;
}
