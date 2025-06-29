// src/app/shared/user-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-card',
  imports: [CommonModule],
  template: `
    <div class="user-card">
    <div class="info">
    <img [src]="user.image" alt="Avatar" class="avatar" />
      <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Company: {{ user.company?.name }}</p>
      <ng-content></ng-content>
    </div>
    </div>
  `
})
export class UserCardComponent {
  @Input() user!: any;
}
