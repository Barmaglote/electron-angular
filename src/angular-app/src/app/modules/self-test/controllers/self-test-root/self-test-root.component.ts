import { Component, OnInit } from '@angular/core';
import { SetTitleComponent } from "../../components/set-title/set-title.component";
import { ElectronService } from '../../../../services/electron.service';

@Component({
  standalone: true,
  selector: 'app-self-test-root',
  templateUrl: './self-test-root.component.html',
  styleUrls: ['./self-test-root.component.css'],
  imports: [SetTitleComponent]
})
export class SelfTestRootComponent {

  constructor(private electronService: ElectronService) { }

  setTitle(title: string) {
    this.electronService.setTitle(title);
  }
}
