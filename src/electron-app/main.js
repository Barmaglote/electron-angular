const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');

const isDev = true;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(path.join(__dirname, 'index.html'));
  }
  //win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('toMain', (event, args) => {
    console.log('Message from renderer:', args);
    event.sender.send('fromMain', 'Hello from main process!');
  });

  ipcMain.handle('ping', () => 'pong');
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

require('electron-reload')(path.join(__dirname), {
  electron: require(`${__dirname}/../../node_modules/electron`),
});

