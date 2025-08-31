import { CommonModule } from '@angular/common';
import { Component, effect, OnChanges, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Users } from '../../services/users';
import { DeleteModal } from '../delete-modal/delete-modal';
import { EditModal } from '../edit-modal/edit-modal';
import { Spinner } from '../spinner/spinner';
import { MatInput } from "@angular/material/input";

export interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    Spinner,
    MatInput
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  displayedColumns: string[] = ['id', 'email', 'name', 'actions'];

  dataSource: {
    data: User[],
    total: number
  } = { data: [], total: 0 };


  page = 1;
  page_size = 5;

  constructor(public usersService: Users, private router: Router, private dialog: MatDialog) {
    this.usersService.getUsersList(this.page, this.page_size).subscribe((data) => {
      this.dataSource = data;
    });
  }

  get isLoading() {
    return this.usersService.loading();
  }

  get users() {
    return this.usersService.users();
  }

  get totalUsers(): number {
    return this.usersService.totalUsers();
  }

  goToUser(userId: number) {
    this.router.navigate(['/users', userId]);
  }

  openEditModal(userId: number, firstName: string, lastName: string, email: string) {
    const dialogRef = this.dialog.open(EditModal, {
      data: { id: userId, first_name: firstName, last_name: lastName, email: email },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.usersService.updateUser(result).subscribe();
      }
    });
  }

  openDeleteModal(userId: number) {
    const dialogRef = this.dialog.open(DeleteModal, {
      data: { id: userId },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.usersService.deleteUser(userId).subscribe();
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.page_size = event.pageSize;
    this.usersService.getUsersList(this.page, this.page_size).subscribe();
  }

  filterUsers(value: string) {
    if (value.length >= 1) {
      const filterValue = value.trim().toLowerCase();
      this.usersService.users.set(
        this.dataSource.data.filter((user) =>
          user.first_name.toLowerCase().includes(filterValue)
        )
      );
      this.usersService.totalUsers.set(this.usersService.users().length);
    } else {
      this.usersService.users.set(this.dataSource.data);
      this.usersService.totalUsers.set(this.dataSource.total);
    }
  }
}
