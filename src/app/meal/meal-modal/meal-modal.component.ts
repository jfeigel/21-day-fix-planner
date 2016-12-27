import {
  Component,
  OnInit
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { MdDialogRef } from '@angular/material';

import * as _ from 'lodash';

import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'tdf-meal-modal',
  templateUrl: './meal-modal.component.html',
  styleUrls: ['./meal-modal.component.scss']
})
export class MealModalComponent implements OnInit {
  meal: Meal;
  newMeal: Meal = new Meal();
  mealForm: FormGroup;
  isEditing: Boolean = false;
  mealFormSubmitted: Boolean = false;
  groups: String[] = [];

  constructor(
    private mealService: MealService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<MealModalComponent>
  ) { }

  ngOnInit() {
    for (let key in this.newMeal) {
      if (this.newMeal.hasOwnProperty(key)) {
        if (['name', 'id', 'tags', 'description'].indexOf(key) === -1) {
          this.groups.push(key);
        }
      }
    }

    this.isEditing = !_.isEqual(this.meal, this.newMeal);

    if (!this.isEditing) {
      this.meal = _.cloneDeep(this.newMeal);
    }

    const groupControls = {};

    for (let key in this.meal) {
      if (this.meal.hasOwnProperty(key)) {
        let groupControl = [this.meal[key]];

        if (key === 'name') {
          groupControl.push(Validators.required);
        }

        groupControls[key] = groupControl;
      }
    }

    this.mealForm = this.fb.group(groupControls);
  }

  updateValue(key, operator) {
    if (operator === '-') {
      this.mealForm.get(key).setValue(Number(this.mealForm.get(key).value) - 1);
    } else {
      this.mealForm.get(key).setValue(Number(this.mealForm.get(key).value) + 1);
    }
  }

  onSubmit() {
    this.mealFormSubmitted = true;

    if (this.mealForm.valid) {
      if (_.isEqual(this.mealForm.value, this.meal)) {
        return;
      }

      const meal = _.cloneDeep(this.mealForm.value);
      let mealPromise;

      if (this.isEditing === false) {
        delete meal.id;
        mealPromise = this.mealService.createMeal(meal);
      } else {
        mealPromise = this.mealService.updateMeal(this.meal.id, meal);
      }

      mealPromise.then(returnedMeal => this.dialogRef.close({meal: returnedMeal, isEditing: this.isEditing}));
    }
  }
}
