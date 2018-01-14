// const {app, shell} = require("electron");
// const fs = require("fs");
// const yaml = require("js-yaml");

import update from "./update";
import events from "./events";

update();
events();

/*
  X - <script src="assets/js/nodeRequire.js"></script>
  X - <script src="assets/js/notify.js"></script>
  <script src="assets/js/update.js"></script>
  <script src="assets/js/settings.js"></script>
  <script src="assets/js/path.js"></script>
  <script src="assets/js/inspect.js"></script>
  <script src="assets/js/render.js"></script>
  <script src="assets/js/parseFile.js"></script>
  <script src="assets/js/events.js"></script>
  <script src="assets/js/mutationObserver.js"></script>
*/
