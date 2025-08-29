import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../services/users';
import { Card } from '../card/card';
import { Spinner } from '../spinner/spinner';
@Component({
  selector: 'app-user-detail',
  imports: [CommonModule, MatCardModule, MatGridListModule, Card, Spinner],
  standalone: true,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit {
  constructor(private route: ActivatedRoute, private usersService: Users) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getUserDetail(id).subscribe();
  }

  get user() {
    return this.usersService.user();
  }

  get isLoading() {
    return this.usersService.loading();
  }

  ngOnInit() {
    console.log(this.user);
  }
}
