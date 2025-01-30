export interface ElectronAPI {
  sendMessage: (channel: string, ...args: any[]) => void;
  onMessage: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
  removeListener: (channel: string) => void;
  fetchUrl: (url: string) => Promise<Response>;
  openExternalLink: (url: string) => void;
  getCurrentWindow: () => Promise<BrowserWindow>;
  getFileFromUser: (targetWindow: BrowserWindow) => Promise<string>;
  setTitle: (title: string) => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
