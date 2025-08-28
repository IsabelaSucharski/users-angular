import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';

export interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

import { Users } from '../../services/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  displayedColumns: string[] = ['id', 'email', 'name', 'actions'];

  constructor(public usersService: Users, private router: Router) {
    this.usersService.getUsersList(1, 10);
  }

  ngOnInit() {
    console.log(this.users);
  }

  get isLoading() {
    return this.usersService.loading();
  }

  get hasError() {
    return this.usersService.error();
  }

  get users() {
    return this.usersService.users();
  }

  goToUser(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
