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
    frame:  process.platform !== 'darwin',
    height: 600,
    icon:   path.join(__dirname, 'assets/icons/png/2048x2048.png'),
    width:  800,
    title:  'Raspberry Pi Projects',
  })

  mainWindow.loadURL(startUrl)

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  // require('./electron-menus')
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
