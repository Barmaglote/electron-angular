const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
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
    shell.openExternal(url);
  },
  showAlert: (text) => {
    alert(text);
  },
  fetchUrl: (url) => ipcRenderer.invoke('fetch-url', url),
  getCurrentWindow: () => ipcRenderer.invoke('get-current-window'),
  getFileFromUser: (targetWindow) => ipcRenderer.invoke('get-file-from-user', targetWindow),
  setTitle: (title) => ipcRenderer.send('set-title', title),
  ping: (address) => ipcRenderer.invoke('run-ping', address)
});


