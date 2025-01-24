import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IBookmark } from '../../models/bookmark';
import { BookmarksListComponent } from "../../components/bookmarks-list/bookmarks-list.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { BookmarksService } from '../../services/bookmarks.service';

@Component({
  standalone: true,
  selector: 'app-bookmarks-manager-root',
  templateUrl: './bookmarks-manager-root.component.html',
  styleUrls: ['./bookmarks-manager-root.component.scss'],
  imports: [BookmarksListComponent, CommonModule, ButtonModule, InputTextModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksManagerRootComponent implements OnInit {
  public newLink: string = '';
  public bookmarks = signal<IBookmark[]>([]);

  constructor(private bookmarksService: BookmarksService) { }

  ngOnInit() {
    this.syncItems();
  }

  async addBookmark(link: string) {
    await this.bookmarksService.addBookmark(link);
    this.newLink = '';
    this.syncItems();
  }

  removeBookmark(event: IBookmark) {
    this.bookmarksService.removeItem(event.url);
    this.syncItems();
  }

  syncItems() {
    const items = this.bookmarksService.getBookmarks();
    this.bookmarks.set(items);
  }

  openLink(event: IBookmark) {
    window.electron.openExternalLink(event.url);
  }

  removeAll() {
    this.bookmarksService.clearStorage();
    this.syncItems();
  }
}
