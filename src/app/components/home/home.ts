import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Users } from '../../services/users';
import { Navbar } from '../navbar/navbar';
import { Table } from '../table/table';

@Component({
  providers: [Users],
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [Table, MatCardModule, MatToolbarModule, Navbar, MatGridListModule],
})
export class HomeComponent {
  constructor(public usersService: Users) {}
  users = [];
  title = 'Userssss';
}
