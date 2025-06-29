import { Component, signal, computed,effect,linkedSignal, resource  } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../shared/user-card.component';
import { fromEvent, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { openInModal } from '../../shared/modal.util';
import { createEmptyUser, User } from '../../models/user.model';
import { UserFormModalComponent } from '../../shared/user-form-modal/UserFormModalComponent';
import { ConfirmDeleteModalComponent } from '../../shared/confirm-delete-modal/ConfirmDeleteModalComponent';
import { UserService } from '../../core/user.service';
@Component({
  standalone: true,
  selector: 'app-users',
  imports: [CommonModule, UserCardComponent],
  template: `
  <div style="display:flex;justify-content:space-between;align-items:center;margin:0 0 1rem">
  <h2>Users</h2>
  <button (click)="openAdd()">➕ Add User</button>
</div>
    <!-- query usage -->
    <input
    type="text"
     id="search-input"
    placeholder="Filter by name"
    (input)="query.set($any($event.target).value)"
  />
  <!-- linkedSignal usage -->
<!-- <input
  id="search-input"
  type="text"
  placeholder="Search..."
  [value]="searchControl()"
  (input)="searchControl.set($any($event.target).value)"
/> -->
    <ng-container *ngIf="pagedUsers() as users">
      <div *ngFor="let user of users">
        <app-user-card [user]="user">
        <div style="display:flex;gap:.5rem">
</div>
<button (click)="openEdit(user)">✏️</button>
<button (click)="confirmDelete(user)">🗑️</button>
        </app-user-card>
      </div>
    </ng-container>
    <p *ngIf="users.isLoading()">Loading...</p>
    <p *ngIf="users.error()">Error: {{ users.error() }}</p>
    <div *ngIf="totalUsers() > 0" style="margin-top: 1rem;">
  <p>{{ displayRange() }} of {{ totalUsers() }} users</p>

  <button (click)="prevPage()" [disabled]="page() === 1">Prev</button>
  <span style="padding-right: 5px;">Page {{ page() }} / {{ totalPages() }}</span>
  <button (click)="nextPage()" [disabled]="page() === totalPages()">Next</button>
</div>

<p *ngIf="totalUsers() === 0 && !users.isLoading()">No users found.</p>
  `,
})
export class UsersComponent {
//linkedSignal usage
  //  source = signal<string>('');
  //  searchControl = linkedSignal(() => this.source());
   //query usage
  query = signal('');
page = signal(1);
readonly pageSize = 5;
private svc = inject(UserService);
users = resource({
  loader: async () => await this.svc.list(this.query()),
});
// users = rxResource(
//   () =>
//     this.http
//       .get<{ users: User[] }>(
//         `https://dummyjson.com/users/search?q=${this.searchControl()}`
//       )
//       .pipe(map(r => r.users)),          // ⬅️ extract the array
//   { defaultValue: [] }                   // ⬅️ must supply this
// );
  // users = httpResource<{users: any[]}>(() =>
  //    `https://dummyjson.com/users/search?q=${this.searchControl()}`//'https://dummyjson.com/users')https://jsonplaceholder.typicode.com/users
  // );
  // private http = inject(HttpClient);
  // users = resource({
  //   loader: async () => {
  //     const response = await lastValueFrom(
  //       this.http.get<any>('https://dummyjson.com/users?name_like=' + this.searchControl())
  //     );
  //     return response.users;
  //   }
  // });
  pagedUsers = computed(() => {
    const data = this.users.value();
    if (!data || this.users.isLoading() || this.users.error()) return [];

    const start = (this.page() - 1) * this.pageSize;
    return data.users.slice(start, start + this.pageSize);
  });

  totalUsers = computed(() => {
    const data = this.users.value();
    if (!data || this.users.isLoading() || this.users.error()) return 0;
    return data.users.length;
  });

  totalPages = computed(() =>
    Math.ceil(this.totalUsers() / this.pageSize)
  );

  displayRange = computed(() => {
    const start = (this.page() - 1) * this.pageSize + 1;
    const end = Math.min(this.page() * this.pageSize, this.totalUsers());
    return `${start}–${end}`;
  });

  constructor() {
    effect(() => {
      this.query(); // track query changes
      this.page.set(1); // reset page
      this.users.reload();
    });
      // Debounce search input
  // queueMicrotask(() => {
  //   const input = document.getElementById('search-input');
  //   if (input) {
  //     fromEvent(input, 'input')
  //       .pipe(
  //         debounceTime(300),
  //         map((e: any) => e.target.value)
  //       )
  //       .subscribe(value => this.query.set(value));
  //   }
  // });
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
    }
  }


  prevPage() {
    if (this.page() > 1) this.page.update(p => p - 1);
  }
  refresh() { this.users.reload(); }
  /* ADD */
async openAdd() {
  const modal = document.createElement('app-user-form-modal') as any;
  modal.user = createEmptyUser();
  modal.addEventListener('submitUser', async (e: any) => {
    await this.svc.add(e.detail); this.refresh();
  });
  await openInModal(modal);
}

/* EDIT */
async openEdit(u: User) {
  const modal = document.createElement('app-user-form-modal') as any;
  modal.user = { ...u };
  modal.addEventListener('submitUser', async (e: any) => {
    await this.svc.update(e.detail); this.refresh();
  });
  await openInModal(modal);
}

/* DELETE */
async confirmDelete(u: User) {
  debugger;
  const modal = document.createElement('app-confirm-delete') as any;
  modal.label = `${u.firstName} ${u.lastName}`;
  modal.addEventListener('confirmed', async (e: any) => {
    if (e.detail) { await this.svc.delete(u.id!); this.refresh(); }
  });
  await openInModal(modal);
}
}
