import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  private appKey = 'appDataBookmarks';
  constructor() { }

  public async addBookmark(link: string) {
    const data = this.getAppData();
    if (!data[link]) {
      data[link] = {};
    }

    const response = await window.electron.fetchUrl(link);
    const document = this.parseResponse(response);
    const title = this.findTitle(document);

    data[link] = title;
    this.saveAppData(data);
  }

  public clearStorage() {
    localStorage.clear();
  }

  public removeItem(key: string): void {
    const data = this.getAppData();
    if (data[key]) {
      delete data[key];
      this.saveAppData(data);
    }
  }

  public getBookmarks(): any {
    const items = this.getAppData();
    return Object.keys(items).filter(key => key !== null && key !== undefined).map(x => ({ url: x, title: items[x] }));
  }

  private getAppData(): any {
    const rawData = localStorage.getItem(this.appKey);
    return rawData && typeof(rawData) === 'string' ? JSON.parse(rawData) : {};
  }

  private saveAppData(data: any): void {
    localStorage.setItem(this.appKey, JSON.stringify(data));
  }

  private parseResponse(text: any) {
    const parser = new DOMParser();
    return parser.parseFromString(text, 'text/html');
  };

  private findTitle(document: any) {
    return (document.querySelector('title') ?? document.querySelector('head'))?.textContent?.trim();
  };
}
