import {$metadata, $metadataDialogEmpty, $metadataDialogList} from "./$$DOM";

// list the article's metadata in a dialog box
export default function listMetadata() {
  // fetch list of display from parseText
  let metadata = JSON.parse($metadata.getAttribute("data-metadata"));

  // display the dialog box
  $metadata.removeAttribute("data-hidden");

  // are there any metadata?
  if (metadata) {
    // if so, hide the empty message
    $metadataDialogEmpty.setAttribute("data-hidden", "");

    // show the list container
    $metadataDialogList.removeAttribute("data-hidden");

    // generate the list
    let ul = document.createElement("ul");
    for (let item of metadata) {
      let li = document.createElement("li");
      li.textContent = item;
      ul.insertAdjacentElement("beforeEnd", li);
    }

    // insert the list into the container
    $metadataDialogList.insertAdjacentElement("afterBegin", ul);
  } else {
    // if not, hide the list message
    $metadataDialogList.setAttribute("data-hidden", "");
    
    // show the empty message
    $metadataDialogEmpty.removeAttribute("data-hidden");
  }
}
