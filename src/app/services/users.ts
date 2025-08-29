import { inject, Injectable, signal } from '@angular/core';
import { User } from '../components/table/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Users {
  users = signal<User[]>([]);
  user = signal<User | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


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

      this.users.set(data.data || []);
    } catch (err: any) {
      this.error.set(err.message || 'Erro ao buscar usuários');
    } finally {
      this.loading.set(false);
    }
  }

  async getUserDetail(id: number) {

    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      });
      const data = await response.json();
      this.user.set(data.data || null);
    } catch (err: any) {
      this.error.set(err.message || 'Erro ao buscar usuário');
    }
  }

  // delete user
  async deleteUser(id: number) {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      });
      if (response.ok) {
        this.users.update((users) => users.filter((user) => user.id !== id));
        this.openSnackBar('Usuário deletado com sucesso', 'Fechar');
      } else {
        this.error.set('Erro ao deletar usuário');
      }
    } catch (err: any) {
      this.error.set(err.message || 'Erro ao deletar usuário');
    }
  }

  // update user
  async updateUser(user: User) {
  try {
    const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), // ✅ enviar os dados editados
    });

    const data = await response.json();

    if (response.ok) {
      this.users.update((users) =>
        users.map((u) => (u.id === user.id ? { ...u, ...user } : u))
      );
      this.openSnackBar('Usuário atualizado com sucesso', 'Fechar');
    } else {
      this.error.set('Erro ao atualizar usuário');
    }

    return data.data || {};
  } catch (err: any) {
    this.error.set(err.message || 'Erro ao atualizar usuário');
  }
}
}
