import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';



export interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}


@Component({
  selector: 'app-table',
  imports: [MatTableModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  displayedColumns: string[] = ['id', 'avatar', 'email', 'first_name', 'last_name'];

  @Input() users: User[] = [];

  ngOnInit() {
  }

}
