const { app, BrowserWindow, ipcMain } = require('electron')
const { globalShortcut } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
let win;

console.log('App started in:', isDev ? 'Development' : 'Production', 'mode');
console.log('App path:', __dirname);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
      allowRunningInsecureContent: false
    }
  });

  if (isDev) {
    win.webContents.openDevTools();
    win.loadURL('http://localhost:4200');
  } else {
    console.log(path.join(__dirname, '../../../angular-app/browser/index.html'));
    win.loadFile(path.join(__dirname, '../../../angular-app/browser/index.html'));
  }
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', validatedURL, errorDescription);
  });
}

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

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

  if (isDev) {
    globalShortcut.register('F12', () => {
      if (win) {
        win.webContents.toggleDevTools();
      }
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

if (isDev) {
  require('electron-reload')(path.join(__dirname), {
    electron: require(`${__dirname}/../../node_modules/electron`),
  });
}

