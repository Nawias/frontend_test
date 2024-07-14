import { Component } from '@angular/core';
import { BlockComponent } from '../components/block/block.component';
import { ArticleComponent } from '../components/article/article.component';
import { RadiobuttonsComponent } from '../components/radiobuttons/radiobuttons.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlockComponent, ArticleComponent, RadiobuttonsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  option: number = 0;
  options: { id: number; label: string }[] = [
    { id: 0, label: 'Opcja pierwsza' },
    { id: 1, label: 'Opcja druga' },
    { id: -1, label: 'Opcja losowa' },
  ];
  onOptionChanged(option: number) {
    this.option = option;
  }
}
