import { Component, effect, OnInit } from '@angular/core';
import { Users } from '../../services/users';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css'
})
export class Error implements OnInit {

  constructor(public usersService: Users) {}

  ngOnInit() {
    this.usersService.error();
  }

  get errorMessage() {
    return this.usersService.error();
  }
}
