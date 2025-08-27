import { Component, Input, } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

export interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}


import { OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit, OnChanges {

  constructor(private cdr: ChangeDetectorRef) { }

  displayedColumns: string[] = ['id', 'avatar', 'email', 'first_name', 'last_name', 'actions'];

  @Input() users: User[] = [];

  dataSource = new MatTableDataSource<User>();

  ngOnInit() {
    this.dataSource.data = this.users || [];
    console.log(this.dataSource);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      this.dataSource.data = this.users || [];
      this.cdr.detectChanges(); // força atualização da view
      console.log(this.dataSource.data);
    }
  }

}
