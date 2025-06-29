// src/app/features/home/home.component.ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <h2>Signal Counter</h2>
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubleCount() }}</p>
    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
  `
})
export class HomeComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  inc() {
    this.count.update(v => v + 1);
  }

  dec() {
    this.count.update(v => v - 1);
  }
}
