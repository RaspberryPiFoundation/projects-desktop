const net = require('net')
const port = process.env.PORT ? process.env.PORT - 100 : 3000 // eslint-disable-line no-magic-numbers

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const client = new net.Socket()
const exec = require('child_process').exec

let startedElectron = false
const tryConnection = () => client.connect({ port: port }, () => {
  client.end()
  if (!startedElectron) {
    startedElectron = true
    exec('npm run electron')
  }
})

tryConnection()

client.on('error', () => {
  setTimeout(tryConnection, 100) // eslint-disable-line no-magic-numbers
})
