export interface ElectronAPI {
  sendMessage: (channel: string, ...args: any[]) => void;
  onMessage: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
  removeListener: (channel: string) => void;
  fetchUrl: (url: string) => Promise<Response>;
  openExternalLink: (url: string) => void;
  getCurrentWindow: () => Promise<BrowserWindow>;
  getFileFromUser: (targetWindow: BrowserWindow) => Promise<string>;
  setTitle: (title: string) => void;
  ping: (url: string) => Promise<any>;
  onUpdateCounter: (callback: (event: any, data: any) => void) => void;
  counterValue: (value: number) => void;
}

export interface DarkModeAPI {
  toggle: () => void;
  system: () => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    darkMode: DarkModeAPI;
  }
}
