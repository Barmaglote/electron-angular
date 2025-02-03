import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent {
  @Input() theme: string = '';
  @Output() switchThemeDarkMode = new EventEmitter();
  @Output() switchThemeSystemMode = new EventEmitter();
}
