require("dotenv").config();
const url = require("url");
const path = require("path")
const { shell, app, BrowserWindow, protocol, ipcMain } = require("electron")

let win
function createWindow() {

    win = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 300,
        minWidth: 300,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    if (process.env.NODE_ENV !== "dev") {
        win.loadURL(url.format({
            pathname: 'index.html',
            protocol: 'file',
            slashes: true
        }))
        win.webContents.openDevTools();
    } else {
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null
    })
}
app.on('ready', () => {
    protocol.interceptFileProtocol('file', (request, callback) => {
        const url = request.url.substr(7)
        callback({ path: path.normalize(`${__dirname}/src/out/${url}`) })
    }, (err) => {
        if (err) console.error('Failed to register protocol')
    })
    createWindow();
    var wc = win.webContents;

    wc.on('will-navigate', function (e, url) {
        e.preventDefault();
        shell.openExternal(url);
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
ipcMain.on('message', (event, message) => {
    console.log("poopy")
})