import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss',
})
export class AlertModalComponent {
  @Input() dialog: boolean | undefined;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() ok: EventEmitter<void> = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
  okClicked() {
    this.ok.emit();
  }
}
