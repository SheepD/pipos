const { app, BrowserWindow, Menu } = require("electron")

let win

function createWindow() {
  // hide the menu bar
  Menu.setApplicationMenu(null)

  // create browser window
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const url = "http://localhost:8080/"

  if (process.env.NODE_ENV === "dev") {
    // open the dev tools
    win.webContents.openDevTools()
  }

  // load index.html into the browser window
  win.loadURL(url)

  // gets triggered when the window is closed
  win.on("closed", () => {
    // dereference the window object to delete them
    // if the app supports multiple windows, win would be an array
    // and each window in the array should be deleted
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // this is for macOS
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // this is also for macOS, if there are no open windows, recreate
  // the app when the dock icon is clicked
  if (win === null) {
    createWindow()
  }
})
