import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-confirm-delete',
  imports: [CommonModule],
  template: `
    <div class="confirm-modal">
      <p>Delete <b>{{ label }}</b> ?</p>
      <div class="confirm-actions">
        <button class="delete-btn" (click)="emitAndClose(true)">🗑 Delete</button>
        <button class="cancel-btn" (click)="emitAndClose(false)">Cancel</button>
      </div>
    </div>
  `,
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent {
  @Input() label = '';
  @Output() confirmed = new EventEmitter<boolean>();

  emitAndClose(value: boolean) {
    this.confirmed.emit(value);
    (document.getElementById('app-modal') as HTMLDialogElement).close();
  }
}
