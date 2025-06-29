import 'zone.js';  // Included with Angular CLI.
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/main.component';
import { routes } from './app/app.routes';
import { createCustomElement } from '@angular/elements';
import { UserFormModalComponent } from './app/shared/user-form-modal/UserFormModalComponent';
import { ConfirmDeleteModalComponent } from './app/shared/confirm-delete-modal/ConfirmDeleteModalComponent';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
}).then(appRef => {
  const injector = appRef.injector;

  // Register custom elements if not already defined
  if (!customElements.get('app-user-form-modal')) {
    const userModal = createCustomElement(UserFormModalComponent, { injector });
    customElements.define('app-user-form-modal', userModal);
  }
  if (!customElements.get('app-confirm-delete')) {
    const confirmModal = createCustomElement(ConfirmDeleteModalComponent, { injector });
    customElements.define('app-confirm-delete', confirmModal);
  }
});
