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
}
