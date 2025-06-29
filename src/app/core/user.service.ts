import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = 'https://dummyjson.com/users';
  private localKey = 'users-cache';

  constructor(private http: HttpClient) {}

  // Helper to get/set local cache
  private getLocalUsers(): User[] | null {
    const data = localStorage.getItem(this.localKey);
    return data ? JSON.parse(data) : null;
  }
  private setLocalUsers(users: User[]) {
    localStorage.setItem(this.localKey, JSON.stringify(users));
  }

  async list(q = ''): Promise<{ users: User[] }> {
     console.log('Searching for:', q);
    let users = this.getLocalUsers();
    if (!users) {
      const resp = await this.http.get<{ users: User[] }>(`${this.base}/search?q=`).toPromise();
      users = resp?.users ?? [];
      this.setLocalUsers(users);
    }
    // Enhanced filter: search in more fields
    const query = q.toLowerCase();
    const filtered = q
      ? users.filter(u =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query) ||
          u.phone.toLowerCase().includes(query)
        )
      : users;
    return { users: filtered };
  }

  async add(user: User): Promise<User> {
    const users = this.getLocalUsers() ?? [];
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    this.setLocalUsers(users);
    return newUser;
  }

  async update(user: User): Promise<User> {
    let users = this.getLocalUsers() ?? [];
    users = users.map(u => (u.id === user.id ? { ...user } : u));
    this.setLocalUsers(users);
    return user;
  }

  async delete(id: number): Promise<{ id: number }> {
    let users = this.getLocalUsers() ?? [];
    users = users.filter(u => u.id !== id);
    this.setLocalUsers(users);
    return { id };
  }

  // Optional: clear cache for testing
  clearCache() {
    localStorage.removeItem(this.localKey);
  }
}
