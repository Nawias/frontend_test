import { Component } from '@angular/core';
import { BlockComponent } from '../components/block/block.component';
import { RadiobuttonsComponent } from '../components/radiobuttons/radiobuttons.component';
import { ArticleService } from '../services/article.service';
import { Article } from '../../types';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { CommonModule } from '@angular/common';
import { arrRemove } from 'rxjs/internal/util/arrRemove';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BlockComponent,
    RadiobuttonsComponent,
    AlertModalComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly SameArticleMessage: string =
    'Ta treść już została doklejona i nie może zostać doklejona ponownie.';
  private readonly NoUniqueRandomArticleMessage: string =
    'Nie znaleziono treści, które nie zostały już doklejone.';
  constructor(private articleService: ArticleService) {}
  private articles: Article[] = [];
  renderedArticles: Article[] = [];
  option: number = 0;
  options: { id: number; label: string }[] = [
    { id: 0, label: 'Opcja pierwsza' },
    { id: 1, label: 'Opcja druga' },
    { id: -1, label: 'Opcja losowa' },
  ];

  showAlert(message: string) {
    this.alertMessage = message;
    this.isModalVisible = true;
  }

  hideAlert() {
    this.isModalVisible = false;
  }
  alertMessage: string = '';
  isModalVisible: boolean = false;

  onOptionChanged(option: number) {
    this.option = option;
  }

  getRandomReplaceArticle(): Article {
    let index: number;
    do {
      index = Math.floor(Math.random() * this.articles.length);
    } while (
      this.articles.length > 1 &&
      this.renderedArticles[0].id === this.articles[index].id
    );
    return this.articles[index];
  }
  getRandomUniqueArticle(): Article | undefined {
    const availableArticles = this.articles.filter(
      (item) => !this.renderedArticles.includes(item)
    );
    if (availableArticles.length > 0) {
      return availableArticles[
        Math.floor(Math.random() * availableArticles.length)
      ];
    }
    return undefined;
  }

  addArticle() {
    if (this.option >= 0) {
      const article = this.articles[this.option];
      if (this.renderedArticles.includes(article)) {
        this.showAlert(this.SameArticleMessage);
        return;
      }
      this.renderedArticles.push(this.articles[this.option]);
    } else {
      const article = this.getRandomUniqueArticle();
      if (article === undefined) {
        this.showAlert(this.NoUniqueRandomArticleMessage);
        return;
      }
      this.renderedArticles.push(article);
    }
  }
  replaceArticle() {
    if (this.option >= 0) {
      this.renderedArticles = [this.articles[this.option]];
    } else {
      const article = this.getRandomReplaceArticle();
      this.renderedArticles = [article];
    }
  }
  ngOnInit() {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.renderedArticles.push(this.articles[0]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
