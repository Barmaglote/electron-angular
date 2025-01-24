import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-app';
  public date: Date | undefined;

  constructor(private electronService: ElectronService, private router: Router) {}

  ngOnInit() {
    this.electronService.onMessage('navigate-to-page', (event: any, path: string) => {
      this.router.navigate([path]);
    });
  }

  ngOnDestroy() {
    this.electronService.removeListener('navigate-to-page');
  }
}
