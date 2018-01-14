/* globals nodeRequire */
import inspectDOM from "./inspectDOM";
import notify from "./notify";

const fs = nodeRequire("fs");
const path = nodeRequire("path");

const $loading = document.getElementById("loading");
const $wiki = document.getElementById("wiki");
const $wikiBodyContent = document.getElementById("wiki-body-content");
const $wikiBodyTocList = document.getElementById("wiki-body-toc-list");
const $toolbarPath = document.getElementById("toolbar-path");

function xhr_loadstart() {
	$loading.removeAttribute("data-hidden");
}
function xhr_loadend() {
	$loading.setAttribute("data-hidden", "");
}
function xhr_load(e) {
	let {status, responseText} = e.target;
	if (/^(4|5)\d{2}$/.test(status)) {
		// didParsedownFail = true;
		// render(text);
		notify(`Error 3: Server (${status}) error; using Showdown`);
	} else {
		// didParsedownFail = false;
		// render(responseText);
		$wikiBodyContent.insertAdjacentHTML("afterBegin", responseText);
	}
	$wiki.scrollTop = 0;
	inspectDOM();
}
function xhr_error(e) {
	let {status} = e.target;
	notify(`Error 4: Server (${status}) error; using Showdown`);
}

function requestParsedown(text) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "https://script.megaapplepi.net/preview-wiki-osu/index.php");
	xhr.addEventListener("loadstart", xhr_loadstart);
	xhr.addEventListener("loadend", xhr_loadend);
	xhr.addEventListener("load", xhr_load);
	xhr.addEventListener("error", xhr_error);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(`text=${encodeURIComponent(text)}`);
	// TODO find a good fallback for local
}

export default function parseFile(filePath) {
	if (fs.statSync(filePath).isFile()) {
		if (filePath.split(/\./).pop() === "md") {
			$toolbarPath.value = filePath; // set the displayed value
			$toolbarPath.setAttribute("data-value", filePath); // set the internal value (we will assume that it is the current file)
			let pathParts = filePath.split(/\\|\//g);
			let rootDirectory = pathParts.slice(0, pathParts.indexOf("wiki")).join("/");
			let rootDirectoryFiles = fs.readdirSync(path.resolve(rootDirectory));
			let checks = [rootDirectoryFiles.indexOf(".git"), rootDirectoryFiles.indexOf(".github"), rootDirectoryFiles.indexOf("news"), rootDirectoryFiles.indexOf("wiki")];
			if (checks.includes(-1)) {
				notify("Error 5: not an osu-wiki repo");
			}
			let text = fs.readFileSync(filePath, {"encoding": "utf8"});

			// when the text is sent to the server, Parsedown has issues trying to differentiate between underscores (italics) and underscores in links; to fix this, we will replace underscores in links to \u03A0 (π) then convert them back afterwards
			text = text.replace(/(?:(\]\())(?:(.*?)(\)))/g, (match) => {
				let replaced = match.replace(/_/g, "\u03A0");
				return replaced;
			});

			// clean up the wiki body and toc
			while ($wikiBodyContent.firstChild) {
				$wikiBodyContent.firstChild.remove();
			}
			while ($wikiBodyTocList.firstChild) {
				$wikiBodyTocList.firstChild.remove();
			}
			// TODO handle metadata before requesting server

			requestParsedown(text);
		} else {
			notify("Error 2: unexpected file type");
		}
	} else {
		notify("Error 1: unexpected directory");
	}
}
