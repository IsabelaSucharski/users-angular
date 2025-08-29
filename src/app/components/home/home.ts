import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Users } from '../../services/users';
import { Card } from '../card/card';
import { Table } from '../table/table';

@Component({
  providers: [Users],
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
  imports: [Table, MatCardModule, MatToolbarModule, MatGridListModule, Card],
})
export class HomeComponent implements OnInit {
  constructor(public usersService: Users) {}
  users = [];
  title = 'Userssss';

  ngOnInit() {
    console.log(this.usersService.loading());
  }
}
