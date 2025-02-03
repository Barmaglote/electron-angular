const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('electron', {
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => {
      callback(event, ...args);
    });
  },
  removeListener: (channel) => ipcRenderer.removeAllListeners(channel),
  openExternalLink: (url) => {
    const { shell } = require('electron');
    shell.openExternal(url); // not safe !!!
  },
  showAlert: (text) => {
    alert(text);
  },
  fetchUrl: (url) => ipcRenderer.invoke('fetch-url', url),
  getCurrentWindow: () => ipcRenderer.invoke('get-current-window'),
  getFileFromUser: (targetWindow) => ipcRenderer.invoke('get-file-from-user', targetWindow),
  setTitle: (title) => ipcRenderer.send('set-title', title),
  ping: (address) => ipcRenderer.invoke('run-ping', address),
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => {
    callback(_event, value);
  }),
  counterValue: (value) => ipcRenderer.send('counter-value', value)
});


