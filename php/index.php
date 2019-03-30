<?php
require_once('htmlpurifier_html5.php');
require_once('Parsedown.php');
require_once('htmlpurifier/library/HTMLPurifier.auto.php');

// TODO $_POST["type"] === "news" (only ignore for news)
$allowedTags = array(
  'img[src|alt|title]',
  'audio[src|type|controls]',
  'video[src|type|controls]', 'source[src|type]',
  'a[href|id|name]',
  'iframe[width|height|src|frameborder|allowfullscreen]',
  'strong', 'b', 'i', 'u', 'em', 'br',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'div', 'center', 'address',
  'span[style]', 'pre',
  'ul', 'ol', 'li',
  'table', 'th',
  'tr', 'td',
  'hr'
);

$purifier = load_htmlpurifier($allowedTags);
$Parsedown = new Parsedown();
$input = $_POST["text"];
// clean off those UTF-8 BOM :(
if( substr($input, 0, 3) === "\xEF\xBB\xBF" ){
  $input = substr($input, 3);
}
$clean_input = $purifier->purify($input);
$output = $Parsedown->text($clean_input);

echo $output;
?>
