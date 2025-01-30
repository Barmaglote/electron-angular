import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule],
  selector: 'app-set-title',
  templateUrl: './set-title.component.html',
  styleUrls: ['./set-title.component.css']
})
export class SetTitleComponent {
  public title: string = '';
  @Output() setTitle = new EventEmitter<string>();
}
