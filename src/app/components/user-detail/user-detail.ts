import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../services/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: Users
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getUserDetail(id)
  }

  get user() {
    return this.usersService.user();
  }

  ngOnInit() {
    console.log(this.user);
  }

}
