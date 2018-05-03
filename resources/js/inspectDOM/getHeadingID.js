// converts given string to heading id strings
export default function getHeadingID(headingText) {
  // convert the string to lowercase, then replace all spaces to hyphens
  return headingText.toLowerCase().replace(/\s/g, "-");
}
