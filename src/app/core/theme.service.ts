// src/app/core/theme.service.ts
import { Injectable, effect, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'light' | 'dark'>('light');

  toggle() {
    this.theme.update(v => v === 'light' ? 'dark' : 'light');
  }

  constructor() {
    effect(() => {
      const current = this.theme();
      document.body.classList.toggle('dark-theme', current === 'dark');
    });
  }
}
