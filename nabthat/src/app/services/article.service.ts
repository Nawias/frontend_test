import { Injectable } from '@angular/core';
import { Article } from '../../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private URL = './articles.json';
  constructor(private httpClient: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.URL) as Observable<Article[]>;
  }
}
