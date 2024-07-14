import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radiobuttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radiobuttons.component.html',
  styleUrl: './radiobuttons.component.scss',
})
export class RadiobuttonsComponent {
  @Input() selectedOption!: number;

  @Output() selectedOptionChange: EventEmitter<number> =
    new EventEmitter<number>();

  @Input() options!: Array<{ id: number; label: string }>;

  onOptionChange(event: any) {
    this.selectedOption = event.target.value;
    this.selectedOptionChange.emit(this.selectedOption);
  }
}
