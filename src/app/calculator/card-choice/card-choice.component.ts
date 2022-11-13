import { Combination, CalculatorComponentValue } from './../combination';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-choice',
  templateUrl: './card-choice.component.html',
  styleUrls: ['./card-choice.component.css'],
})
export class CardChoiceComponent {
  constructor(
    public dialogRef: MatDialogRef<CardChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public combination: Combination
  ) {}

  selectedValue(value: CalculatorComponentValue) {
    this.dialogRef.close(value);
  }
}
