const fs = require('fs')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes:  true,
})

let mainWindow

createWindow = () => {
  mainWindow = new BrowserWindow({
    frame:          process.platform !== 'darwin',
    height:         600,
    icon:           path.join(__dirname, 'assets/icons/png/2048x2048.png'),
    width:          800,
    title:          'Raspberry Pi Projects',
    webPreferences: {
      plugins: true,
    },
  })

  mainWindow.loadURL(startUrl)

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  // require('./electron-menus')
}

if (fs.existsSync('/usr/lib/chromium-browser/libpepflashplayer.so')) {
  app.commandLine.appendSwitch('ppapi-flash-path', '/usr/lib/chromium-browser/libpepflashplayer.so')
} else if (fs.existsSync('/usr/lib/chromium/libpepflashplayer.so')) {
  app.commandLine.appendSwitch('ppapi-flash-path', '/usr/lib/chromium/libpepflashplayer.so')
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
