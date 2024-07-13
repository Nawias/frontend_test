import { Component } from '@angular/core';
import { BlockComponent } from '../components/block/block.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlockComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
