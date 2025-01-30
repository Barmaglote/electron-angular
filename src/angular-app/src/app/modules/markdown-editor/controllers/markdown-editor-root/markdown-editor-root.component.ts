import { Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ElectronService } from '../../../../services/electron.service';
import { marked} from 'marked';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ButtonModule, TextareaModule, FormsModule, CommonModule],
  selector: 'app-markdown-editor-root',
  templateUrl: './markdown-editor-root.component.html',
  styleUrls: ['./markdown-editor-root.component.css']
})
export class MarkdownEditorRootComponent implements OnInit {
  public rawText = signal<string>('');
  public markdown = signal<string>('');

  constructor(private electronService: ElectronService) { }

  openFile() {
    this.electronService.getCurrentWindow().then(window => {
      this.electronService.getFileFromUser(window);
    });
  }

  ngOnInit() {
    this.electronService.onMessage('file-opened', (event: any, {filePath, fileContent}) => {
      if (fileContent) {
        this.rawText.set(fileContent);
        const mk = marked(fileContent);
        this.markdown.set(mk.toString());
      } else {
        this.rawText.set('');
        this.markdown.set('');
      }
    });
  }

  ngOnDestroy() {
    this.electronService.removeListener('navigate-to-page');
  }

  onKeyUp(event: any) {
    const mk = marked(event.target.value);
    this.markdown.set(mk.toString());
  }

  newFile() {
    this.markdown.set('');
    this.rawText.set('');
  }
}
