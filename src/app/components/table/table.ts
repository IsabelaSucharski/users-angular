import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'name', 'actions'];

  page = 1;
  page_size = 5;

  constructor(public usersService: Users, private router: Router, private dialog: MatDialog) {
    this.usersService.getUsersList(this.page, this.page_size).subscribe();
  }

  ngOnInit() {}

  get isLoading() {
    return this.usersService.loading();
  }

  get hasError() {
    return this.usersService.error();
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
}
