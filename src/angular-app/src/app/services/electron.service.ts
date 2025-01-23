import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const ipc = require('electron').ipcRenderer;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  constructor(private router: Router) {
    ipc.on('navigate-to-page', (event: any, path: string) => {
      this.router.navigate([path]);
    });
  }
}
