import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../../../types';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  @Input() article!: Article;
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() edit: EventEmitter<void> = new EventEmitter();
}
