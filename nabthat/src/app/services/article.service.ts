import { Injectable } from '@angular/core';
import { Article, LocalStorageEntry } from '../../types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private URL = './articles.json';
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    if (this.localStorageService.isEmpty()) {
      this.getRemoteArticles().subscribe({
        next: (articles) => {
          for (const article of articles) {
            this.localStorageService.addEntry(article.content);
          }
          this._ready.next(true);
        },
      });
    } else {
      this._ready.next(true);
    }
  }
  private _ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isReady: Observable<boolean> = this._ready.asObservable();

  private getRemoteArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.URL) as Observable<Article[]>;
  }

  getArticles(): Article[] {
    return this.localStorageService
      .getAllEntries()
      .map((entry: LocalStorageEntry) => ({
        id: Number(entry.key),
        content: entry.value,
      }));
  }

  get(id: number): Article {
    const content = this.localStorageService.getEntryById(id.toString());
    if (content == null) throw new Error('Article Not Found');
    return {
      id,
      content,
    };
  }

  delete(id: number) {
    this.localStorageService.deleteEntry(id.toString());
  }

  add(content: string) {
    this.localStorageService.addEntry(content);
  }
  edit(article: Article) {
    this.localStorageService.updateEntry(
      article.id.toString(),
      article.content
    );
  }
}
