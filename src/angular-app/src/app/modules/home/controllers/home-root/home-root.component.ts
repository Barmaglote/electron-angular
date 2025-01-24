import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [ButtonModule],
  selector: 'app-home-root',
  templateUrl: './home-root.component.html',
  styleUrls: ['./home-root.component.scss']
})
export class HomeRootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
