import {
  Component,
  OnInit
} from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { Meal } from '../meal';

@Component({
  selector: 'tdf-delete-meal-modal',
  templateUrl: './delete-meal-modal.component.html',
  styleUrls: ['./delete-meal-modal.component.scss']
})
export class DeleteMealModalComponent implements OnInit {
  meal: Meal;

  constructor(
    public dialogRef: MdDialogRef<DeleteMealModalComponent>
  ) { }

  ngOnInit() { }

}
