import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBookmark } from '../../models/bookmark';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TruncatePipe } from "../../../../pipes/truncate.pipe";

@Component({
  standalone: true,
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss'],
  imports: [CommonModule, SkeletonModule, CardModule, ButtonModule, TruncatePipe],
})
export class BookmarksListComponent implements OnInit {
  @Input() items: IBookmark[] | null = [];
  @Output() deleteItem = new EventEmitter<IBookmark>();
  @Output() openItem = new EventEmitter<IBookmark>();
  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number, item: IBookmark): string {
    return item.url;
  }
}
