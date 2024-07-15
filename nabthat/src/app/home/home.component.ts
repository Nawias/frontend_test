import { Component, OnInit } from '@angular/core';
import { BlockComponent } from '../components/block/block.component';
import { RadiobuttonsComponent } from '../components/radiobuttons/radiobuttons.component';
import { ArticleService } from '../services/article.service';
import { Article } from '../../types';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../components/article/article.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BlockComponent,
    RadiobuttonsComponent,
    AlertModalComponent,
    CommonModule,
    FormsModule,
    ArticleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly SameArticleMessage: string =
    'Ta treść już została doklejona i nie może zostać doklejona ponownie.';
  private readonly NoUniqueRandomArticleMessage: string =
    'Nie znaleziono treści, które nie zostały już doklejone.';

  constructor(private articleService: ArticleService) {}
  selectedArticle: Article = { id: 0, content: '' };
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
    this.isAlertModalVisible = true;
  }

  hideAlert() {
    this.isAlertModalVisible = false;
  }
  alertMessage: string = '';
  isAlertModalVisible: boolean = false;
  isDeleteModalVisible: boolean = false;
  isEditModalVisible: boolean = false;

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

  toggleAddModal() {}

  openDeleteModal(article: Article) {
    this.isDeleteModalVisible = true;
    this.selectedArticle = article;
  }
  confirmDelete(shouldDelete: boolean) {
    this.isDeleteModalVisible = false;
    if (shouldDelete) {
      this.articleService.delete(this.selectedArticle.id);
      this.selectedArticle = { id: 0, content: '' };
      this.fetchArticles();
    }
  }

  openEditModal(article: Article) {
    this.selectedArticle = article;
    this.isEditModalVisible = true;
  }
  confirmEdit(shouldSubmit: boolean) {
    this.isEditModalVisible = false;
    if (shouldSubmit) {
      this.articleService.edit(this.selectedArticle);
    }
    this.fetchArticles();
  }

  private fetchArticles() {
    this.articles = this.articleService.getArticles();
    this.renderedArticles = [];
    this.renderedArticles.push(this.articles[0]);
  }

  ngOnInit() {
    this.articleService.isReady.subscribe((isReady) => {
      if (isReady) {
        this.fetchArticles();
      }
    });
  }
}
