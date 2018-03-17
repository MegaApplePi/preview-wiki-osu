const $notify = document.getElementById("notify");
const $notifyMessage = document.getElementById("notify-message");
let timer;

function $notify_timeout() {
  $notify.setAttribute("data-hidden", "");
}

export default function notify(message) {
  $notifyMessage.textContent = message;
  $notify.removeAttribute("data-hidden");
  clearTimeout(timer);

  timer = setTimeout($notify_timeout, 5000);
}
