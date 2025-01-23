const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const { globalShortcut } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
let win;
let homeUrl = isDev ? 'http://localhost:4200' : path.join(__dirname, '../../../angular-app/browser/index.html');

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: false
    }
  });

  if (isDev) {
    win.loadURL(homeUrl);
  } else {
    win.loadFile(homeUrl);
  }

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', validatedURL, errorDescription);
  });
}

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.whenReady().then(() => {
  createWindow();
  createMenu();

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

const createMenu = () => {
  template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click: () => {
            console.log('Open clicked');
          }
        },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Programs',
      submenu: [
        {
          label: 'Home',
          click: () => {
            win.webContents.send('navigate-to-page', '/');
          }
        },
        {
          label: 'Book Manager',
          click: () => {
            win.webContents.send('navigate-to-page', 'bookmarks-manager');
          }
        },
        {
          label: 'Self Test',
          click: () => {
            win.webContents.send('navigate-to-page', 'self-test');
          }
        },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            windows.electron.showAlert('About programm');
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}