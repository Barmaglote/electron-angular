import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule],
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent {
  public url: string = '';
  @Input() response: string = '';
  @Output() startPing = new EventEmitter<string>();
  constructor() {}
}
