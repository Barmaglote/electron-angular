const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const { globalShortcut } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const fetch = require('node-fetch');
let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      contentSecurityPolicy: "default-src 'self'; script-src 'self';",
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:4200');
  } else {
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
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

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

ipcMain.handle('fetch-url', async (event, url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
});

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
          label: 'Bookmarks Manager',
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
        },
        {
          label: 'DevTools',
          click: () => {
            win.toggleDevTools();
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}