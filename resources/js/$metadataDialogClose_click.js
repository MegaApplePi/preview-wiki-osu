import {$metadata, $metadataDialogList} from "./$$DOM";

export default function $metadataDialogClose_click() {
  // hide the tags dialog
  $metadata.setAttribute("data-hidden", "");

  // remove list of tags
  while ($metadataDialogList.firstChild) {
    $metadataDialogList.firstChild.remove();
  }
}
