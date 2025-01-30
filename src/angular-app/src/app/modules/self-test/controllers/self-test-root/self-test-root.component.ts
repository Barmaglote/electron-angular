import { Component, OnInit } from '@angular/core';
import { SetTitleComponent } from "../../components/set-title/set-title.component";
import { ElectronService } from '../../../../services/electron.service';
import { PingComponent } from "../../components/ping/ping.component";

@Component({
  standalone: true,
  selector: 'app-self-test-root',
  templateUrl: './self-test-root.component.html',
  styleUrls: ['./self-test-root.component.css'],
  imports: [SetTitleComponent, PingComponent]
})
export class SelfTestRootComponent {
  public response: string = '';
  constructor(private electronService: ElectronService) { }

  setTitle(title: string) {
    this.electronService.setTitle(title);
  }

  startPing(url: string) {
    this.electronService.startPing(url).then(response => {
      this.response = response?.output.toString();
    })
  }
}
