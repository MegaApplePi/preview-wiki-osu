const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");

app.commandLine.appendSwitch("js-flags", "--harmony");

let win;
function createWindow() {
	win = new BrowserWindow({
		"height": 600,
		"minWidth": 750,
		"width": 750,
		// "maximizable": false
		"icon": path.join(__dirname, "/assets/icon/ico/icon.ico")
	});
	win.setMenu(null);

	win.loadURL(url.format({
		"pathname": path.join(__dirname, "index.html"),
		"protocol": "file:",
		"slashes": true
	}));

	win.on("closed", () => {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		process.exit();
	}
});

app.on("active", () => {
	if (win === null) {
		createWindow();
	}
});
