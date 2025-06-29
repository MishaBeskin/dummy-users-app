import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, createEmptyUser } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-user-form-modal',
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="save()" class="modal-form">
      <h3>{{ user.id ? 'Edit' : 'Add' }} user</h3>
      <input [(ngModel)]="user.firstName" name="fn" placeholder="First name" required />
      <input [(ngModel)]="user.lastName"  name="ln" placeholder="Last name"  required />
      <input type="number" [(ngModel)]="user.age" name="age" placeholder="Age" required />
      <input [(ngModel)]="user.email" name="email" placeholder="Email" required />
      <div class="modal-actions">
        <button type="submit" class="save-btn">💾 Save</button>
        <button type="button" class="cancel-btn" (click)="close()">✖ Cancel</button>
      </div>
    </form>
  `,
  styleUrls: ['./user-form-modal.component.css']
})
export class UserFormModalComponent {
  @Input() user: User = createEmptyUser();
  @Output() submitUser = new EventEmitter<User>();

  save() { this.submitUser.emit(this.user); (document.getElementById('app-modal') as HTMLDialogElement).close(); }
  close() { (document.getElementById('app-modal') as HTMLDialogElement).close(); }
}
