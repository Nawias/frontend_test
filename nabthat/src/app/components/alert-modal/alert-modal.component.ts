import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss',
})
export class AlertModalComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
