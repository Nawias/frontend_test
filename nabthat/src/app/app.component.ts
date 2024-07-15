import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private localStorageService: LocalStorageService) {}
  showAuthor: boolean = false;
  showNameInHeader() {
    this.showAuthor = true;
  }
  onReset() {
    this.localStorageService.dropStorage();
    window.location.reload();
  }
  title = 'nabthat';
}
