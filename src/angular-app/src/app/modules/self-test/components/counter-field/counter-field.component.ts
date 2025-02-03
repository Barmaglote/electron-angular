import { Component, OnInit, signal } from '@angular/core';
import { ElectronService } from '../../../../services/electron.service';

@Component({
  standalone: true,
  selector: 'app-counter-field',
  templateUrl: './counter-field.component.html',
  styleUrls: ['./counter-field.component.css']
})
export class CounterFieldComponent implements OnInit {
  public counter = signal(0);

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this.electronService.onUpdateCounter((event: any, data: any) => {
      this.counter.set(this.counter() + data);
      this.electronService.counterValue(this.counter());
    })
  }
}
