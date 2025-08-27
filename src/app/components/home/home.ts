import { Component } from '@angular/core';
import { Users } from '../../services/users';
import { Table } from '../table/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [Table, MatCardModule, MatToolbarModule]
})
export class HomeComponent {

  users = [];
  page = 1;
  per_page = 10;

  constructor(private usersService: Users) {}

  ngOnInit() {
    this.usersService.getUsersList(this.page, this.per_page).then(users => {
      this.users = users;
      console.log(this.users);
    });
  }


}
