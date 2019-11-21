const { app, BrowserWindow } = require("electron")

let win

function createWindow () {
  // create browser window
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // load index.html into the browser window
  win.loadFile("index.html")

  // open the dev tools
  // TODO: add condition to only open if in development mode
  win.webContents.openDevTools()

  // hide the menu bar
  win.removeMenu()

  // gets triggered when the window is closed
  win.on("closed", () => {
    // dereference the window object to delete them
    // if the app supports multiple windows, win would be an array
    // and each window in the array should be deleted
    win = null
  })
}

app.on("ready", createWindow)

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
