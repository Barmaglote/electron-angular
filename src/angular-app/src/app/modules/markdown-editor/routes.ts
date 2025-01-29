import { Routes } from '@angular/router';
import { MarkdownEditorRootComponent } from './controllers/markdown-editor-root/markdown-editor-root.component';

export const routes: Routes = [
  {
    path: '',
    data: { headerTitle: 'Markdown Editor' },
    component: MarkdownEditorRootComponent,
  },
];
