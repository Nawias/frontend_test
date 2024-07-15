import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

type MenuAction = 'reset' | 'showName';
interface MenuOption {
  label: string;
  action: MenuAction;
}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Output() reset: EventEmitter<void> = new EventEmitter();
  @Output() showName: EventEmitter<void> = new EventEmitter();
  menuVisible: boolean = false;
  options: MenuOption[] = [
    { label: 'Zresetuj ustawienia', action: 'reset' },
    { label: 'Pokaż dane osobowe', action: 'showName' },
  ];

  toggleMenu(arg: any) {
    console.log(arg);
    this.menuVisible = !this.menuVisible;
  }
  onClick(action: MenuAction) {
    switch (action) {
      case 'reset':
        this.reset.emit();
        break;
      case 'showName':
        this.showName.emit();
        break;
    }
  }
}
