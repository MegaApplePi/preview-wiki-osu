import {$notify, $notifyMessage} from "./$$DOM";

let timer;

// timeout event handler
function $notify_timeout() {
  // hide the notification
  $notify.setAttribute("data-hidden", "");
}

export default function notify(message) {
  // set notify text
  $notifyMessage.textContent = message;

  // display the notification
  $notify.removeAttribute("data-hidden");

  // unset the timer if a previous one was set
  clearTimeout(timer);

  // set a new timer
  timer = setTimeout($notify_timeout, 5000);
}
