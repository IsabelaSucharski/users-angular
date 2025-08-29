import { Component, Input, OnInit } from '@angular/core';
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
import { EditModal } from '../edit-modal/edit-modal';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'name', 'actions'];

  constructor(public usersService: Users, private router: Router, private dialog: MatDialog) {
    this.usersService.getUsersList(1, 10);
  }



  ngOnInit() {
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

  openEditModal(userId: number, firstName: string, lastName: string, email: string) {

    const dialogRef = this.dialog.open(EditModal, {
      data: { id: userId, first_name: firstName, last_name: lastName, email: email }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result, 'The dialog was closed');
      if (result) {
        // como updateUser retorna Promise, usa await
        await this.usersService.updateUser(result);
      }
    });

  }
}