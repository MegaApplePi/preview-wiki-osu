import {$mediaImage} from "./$$DOM";

export default function parseMedia(path) {
  $mediaImage.setAttribute("src", path);
}
