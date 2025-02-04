import { Component, OnInit } from '@angular/core';
import { SetTitleComponent } from "../../components/set-title/set-title.component";
import { ElectronService } from '../../../../services/electron.service';
import { PingComponent } from "../../components/ping/ping.component";
import { CounterFieldComponent } from "../../components/counter-field/counter-field.component";
import { ThemeSwitcherComponent } from "../../components/theme-switcher/theme-switcher.component";

@Component({
  standalone: true,
  selector: 'app-self-test-root',
  templateUrl: './self-test-root.component.html',
  styleUrls: ['./self-test-root.component.css'],
  imports: [SetTitleComponent, PingComponent, CounterFieldComponent, ThemeSwitcherComponent]
})
export class SelfTestRootComponent {
  public response: string = '';
  public theme: string = '';
  constructor(private electronService: ElectronService) { }

  setTitle(title: string) {
    this.electronService.setTitle(title);
  }

  startPing(url: string) {
    this.electronService.startPing(url).then(response => {
      this.response = response?.output.toString();
    })
  }

  async onSwitchThemeDarkMode() {
    const isDarkMode = await this.electronService.switchThemeDarkMode();
    this.theme = isDarkMode ? 'dark' : 'light';
  }

  async onSwitchThemeSystemMode() {
    await this.electronService.switchThemeSystemMode();
    this.theme = 'System';
  }
}
