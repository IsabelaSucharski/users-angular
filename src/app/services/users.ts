import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../components/table/table';

@Injectable({
  providedIn: 'root',
})
export class Users {
  users = signal<User[]>([]);
  user = signal<User | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  totalUsers = signal(0);

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  public http = inject(HttpClient);

  getUsersList(page: number, per_page: number): Observable<{ data: User[]; total: number }> {
    this.loading.set(true);
    this.error.set(null);

    return this.http
      .get<any>(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`, {
        headers: { 'x-api-key': 'reqres-free-v1' },
      })
      .pipe(
        map((data) => {
          this.users.set(data.data || []);
          this.totalUsers.set(data.total || 0);
          this.loading.set(false);
          return { data: data.data || [], total: data.total || 0 };
        }),
        catchError((err) => {
          this.error.set(err.message || 'Erro ao buscar usuários');
          this.loading.set(false);
          return of({ data: [], total: 0 });
        })
      );
  }

  getUserDetail(id: number): Observable<User | null> {
    this.loading.set(true);

    return this.http
      .get<any>(`https://reqres.in/api/users/${id}`, {
        headers: { 'x-api-key': 'reqres-free-v1' },
      })
      .pipe(
        map((data) => {
          this.user.set(data.data || null);
          this.loading.set(false);
          return data.data || null;
        }),
        catchError((err) => {
          this.error.set(err.message || 'Erro ao buscar usuário');
          return of(null);
        })
      );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http
      .delete(`https://reqres.in/api/users/${id}`, {
        headers: { 'x-api-key': 'reqres-free-v1' },
      })
      .pipe(
        map(() => {
          this.users.update((users) => users.filter((user) => user.id !== id));
          this.openSnackBar('Usuário deletado com sucesso', 'Fechar');
          return true;
        }),
        catchError((err) => {
          this.error.set(err.message || 'Erro ao deletar usuário');
          return of(false);
        })
      );
  }

  updateUser(user: User): Observable<User | null> {
    return this.http
      .put<any>(`https://reqres.in/api/users/${user.id}`, user, {
        headers: {
          'x-api-key': 'reqres-free-v1',
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((data) => {
          this.users.update((users) =>
            users.map((u) => (u.id === user.id ? { ...u, ...user } : u))
          );
          this.openSnackBar('Usuário atualizado com sucesso', 'Fechar');
          return data.data || null;
        }),
        catchError((err) => {
          this.error.set(err.message || 'Erro ao atualizar usuário');
          return of(null);
        })
      );
  }
}
