import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Users } from '../../services/users';

@Component({
  selector: 'app-delete-modal',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  standalone: true,
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css',
})
export class DeleteModal {
  constructor(
    public dialogRef: MatDialogRef<DeleteModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: Users
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Confirma a deleção
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cancela a deleção
  }
}
