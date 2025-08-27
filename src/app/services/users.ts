import { Injectable, signal } from '@angular/core';
import { User } from '../components/table/table';

@Injectable({
  providedIn: 'root',
})
export class Users {
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  async getUsersList(page: number, per_page: number) {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${page}&per_page=${per_page}`,
        {
          headers: { 'x-api-key': 'reqres-free-v1' },
        }
      );
      const data = await response.json();

      console.log('Dados recebidos:', data.data);

      this.users.set(data.data || []);
    } catch (err: any) {
      this.error.set(err.message || 'Erro ao buscar usuários');
    } finally {
      this.loading.set(false);
    }
  }

  async getUserDetail(id: number) {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });
    const data = await response.json();
    return data.data || {};
  }

  // delete user
  async deleteUser(id: number) {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });
    return response.ok;
  }

  // create user
  async createUser(user: any) {
    const response = await fetch(`https://reqres.in/api/users`, {
      method: 'POST',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data.data || {};
  }
}
