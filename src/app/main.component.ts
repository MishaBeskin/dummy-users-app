// src/app/main.component.ts
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './core/theme.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  template: `
  <div class="container">
  <nav>
    <a routerLink="/">Home</a>
    <a routerLink="/users">Users</a>
    <a routerLink="/dashboard">📊 Dashboard</a>
    <button (click)="toggleTheme()">🌓 Toggle Theme</button>
  </nav>
  <router-outlet />
</div>
  `
})
export class AppComponent {
  private themeService = inject(ThemeService);
  toggleTheme = () => this.themeService.toggle();
}