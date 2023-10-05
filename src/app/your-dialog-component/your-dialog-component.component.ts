import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-your-dialog-component',
  templateUrl: './your-dialog-component.component.html',
  styleUrls: ['./your-dialog-component.component.css']
})
export class YourDialogComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
