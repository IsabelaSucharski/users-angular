import { Component } from '@angular/core';
import { Table } from '../table/table';
import { Users } from '../../services/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [Table]
})
export class HomeComponent {

  users = [];

  constructor(private usersService: Users) {}

  async ngOnInit() {
    this.users = await this.usersService.getUsersList();

    console.log(this.users);
  }


}
