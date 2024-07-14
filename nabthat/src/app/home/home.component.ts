import { Component } from '@angular/core';
import { BlockComponent } from '../components/block/block.component';
import { RadiobuttonsComponent } from '../components/radiobuttons/radiobuttons.component';
import { ArticleService } from '../services/article.service';
import { Article } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlockComponent, RadiobuttonsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private articleService: ArticleService) {}
  private articles: Article[] = [];
  renderedArticles: Article[] = [];
  option: number = 0;
  options: { id: number; label: string }[] = [
    { id: 0, label: 'Opcja pierwsza' },
    { id: 1, label: 'Opcja druga' },
    { id: -1, label: 'Opcja losowa' },
  ];
  onOptionChanged(option: number) {
    this.option = option;
  }

  getRandomArticle(): Article | undefined {
    return undefined;
  }

  addArticle() {
    if (this.option >= 0) {
      const article = this.articles[this.option];
      if (this.renderedArticles.includes(article)) {
        //show error
        return;
      }
      this.renderedArticles.push(this.articles[this.option]);
    } else {
      const article = this.getRandomArticle();
      if (article === undefined) {
        //show error
        return;
      }
      this.renderedArticles.push(article);
    }
  }
  replaceArticle() {
    if (this.option >= 0) {
      this.renderedArticles = [this.articles[this.option]];
    } else {
      const article = this.getRandomArticle();
      if (article === undefined) {
        //show error
        return;
      }
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
