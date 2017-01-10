import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import * as _ from 'lodash';

import { Meal } from './meal';
import { MealService } from './meal.service';
import { MealModalComponent } from './meal-modal/meal-modal.component';
import { DeleteMealModalComponent } from './delete-meal-modal/delete-meal-modal.component';

@Component({
  selector: 'tdf-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  mealModalDialogRef: MdDialogRef<MealModalComponent>;
  deleteMealModalDialogRef: MdDialogRef<DeleteMealModalComponent>;
  config: MdDialogConfig = {
    disableClose: true
  };

  meals: Meal[];
  newMeal: Meal = new Meal();
  groups: String[] = [];
  showDescription: Boolean[] = [];

  constructor(
    private mealService: MealService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.mealService.getMeals()
      .then(meals => {
        this.meals = meals;
        this.showDescription = _.fill(Array(this.meals.length), false);
      });

    for (let key in this.newMeal) {
      if (this.newMeal.hasOwnProperty(key)) {
        if (['name', 'id', 'tags', 'description'].indexOf(key) === -1) {
          this.groups.push(key);
        }
      }
    }
  }

  getMealClass(key: String, value: String): String {
    return Number(value) === 0 ? 'label-disabled' : `label-${key}`;
  }

  showMealModal(): void {
    this.mealModalDialogRef = this.dialog.open(MealModalComponent, this.config);
    this.mealModalDialogRef.componentInstance.meal = new Meal();

    this.mealModalDialogRef.afterClosed().subscribe(result =>  {
      this.mealModalDialogRef = null;
      this.update(result);
    });
  }

  editMeal(selectedMeal: Meal): void {
    this.mealModalDialogRef = this.dialog.open(MealModalComponent, this.config);
    this.mealModalDialogRef.componentInstance.meal = _.cloneDeep(selectedMeal);

    this.mealModalDialogRef.afterClosed().subscribe(result =>  {
      this.mealModalDialogRef = null;
      this.update(result);
    });
  }

  showDeleteModal(selectedMeal: Meal): void {
    this.deleteMealModalDialogRef = this.dialog.open(DeleteMealModalComponent, this.config);
    this.deleteMealModalDialogRef.componentInstance.meal = selectedMeal;

    this.deleteMealModalDialogRef.afterClosed().subscribe(result =>  {
      this.deleteMealModalDialogRef = null;
      this.deleteMeal(result);
    });
  }

  deleteMeal(id: String): void {
    if (id) {
      this.mealService.deleteMeal(id)
        .then(() => {
          const mealIndex = _.findIndex(this.meals, {id: id});
          this.meals.splice(mealIndex, 1);
          this.showDescription.splice(mealIndex, 1);
        });
    }
  }

  update(result): void {
    if (!result) {
      return;
    } else if (!result.isEditing) {
      this.meals.push(result.meal);
      this.showDescription.push(false);
    } else {
      const mealIndex = _.findIndex(this.meals, {id: result.meal.id});
      this.meals[mealIndex] = result.meal;
    }
  }
}
