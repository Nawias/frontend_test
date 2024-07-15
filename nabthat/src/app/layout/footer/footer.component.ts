import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  menuVisible: boolean = false;
  showMenu(arg: any) {
    console.log(arg);
    this.menuVisible = !this.menuVisible;
  }
}
