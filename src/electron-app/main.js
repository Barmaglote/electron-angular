const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
const { globalShortcut } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const fetch = require('node-fetch');
const fs = require('fs');

let win;
const windows = new Set();

const createWindow = () => {
  let newWindow = new BrowserWindow({
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

  console.log("createWindow");

  if (isDev) {
    newWindow.loadURL('http://localhost:4200');
  } else {
    newWindow.loadFile(path.join(__dirname, '../../../angular-app/browser/index.html'));
  }

  newWindow.on('closed', () => {
    windows.delete(newWindow);
    newWindow = null;
  });

  newWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', validatedURL, errorDescription);
  });

  windows.add(newWindow);
  win = newWindow;
  return newWindow;
}

const getCurrentWindow = exports.getCurrentWindow = () => {
  if (windows.size === 0) return null;
  return windows.values().next().value;
}

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

function handleSetTitle (event, title) {
  console.log(title);
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('set-title', handleSetTitle);

  if (isDev) {
    globalShortcut.register('F12', () => {
      if (win) {
        getCurrentWindow().webContents.toggleDevTools();
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

ipcMain.handle('get-current-window', () => {

  const currentWindow = getCurrentWindow();
  if (!currentWindow) return null;
  return {
    id: currentWindow.id,
    title: currentWindow.getTitle(),
    bounds: currentWindow.getBounds()
  };
});

ipcMain.handle('get-file-from-user', async (targetWindow) => {
  return getFileFromUser(targetWindow);
});


const getFileFromUser = exports.getFileFromUser = (targetWindow) => {
  dialog.showOpenDialog(targetWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
    ]
  }).then(files => {
    if (files && files.filePaths?.length > 0) {
      openFile(targetWindow, files.filePaths[0]);
    }
  });
}

const openFile = exports.openFile = (targetWindow, filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  getCurrentWindow().webContents.send('file-opened', {filePath, fileContent});
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
            getCurrentWindow().webContents.send('navigate-to-page', '/');
          }
        },
        {
          label: 'Bookmarks Manager',
          click: () => {
            getCurrentWindow().webContents.send('navigate-to-page', 'bookmarks-manager');
          }
        },
        {
          label: 'Markdown Editor',
          click: () => {
            getCurrentWindow().webContents.send('navigate-to-page', 'markdown-editor');
          }
        },
        {
          label: 'Self Test',
          click: () => {
            getCurrentWindow().webContents.send('navigate-to-page', 'self-test');
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
            getCurrentWindow().toggleDevTools();
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}