import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  constructor() {
  }

  sendMessage(channel: string, message: any) {
    window.electron.sendMessage(channel, message);
  }

  onMessage(channel: string, callback: (event: any, data: any) => void) {
    window.electron.onMessage(channel, callback);
  }

  removeListener(channel: string) {
    window.electron.removeListener(channel);
  }

  getCurrentWindow() {
    return window.electron.getCurrentWindow();
  }

  getFileFromUser(targetWindow: any) {
    return window.electron.getFileFromUser(targetWindow);
  }

  setTitle(title: string) {
    window.electron.setTitle(title);
  }

  startPing(url: string) {
    return window.electron.ping(url);
  }

  onUpdateCounter(callback: (event: any, data: any) => void) {
    window.electron.onUpdateCounter(callback);
  }

  counterValue(newValue: number) {
    window.electron.counterValue(newValue)
  }

  switchThemeDarkMode() {
    return window.darkMode.toggle();
  }

  switchThemeSystemMode() {
    window.darkMode.system();
  }
}
