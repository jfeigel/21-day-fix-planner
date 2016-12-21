import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { Meal } from './meal';
import { MealService } from './meal.service';
import { MealModalComponent } from './meal-modal/meal-modal.component';

@Component({
  selector: 'tdf-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  meals: Meal[];
  newMeal: Meal = new Meal();
  selectedMeal: Meal;
  isEditing: Boolean = false;
  action: String = null;
  groups: String[] = [];

  constructor(
    private mealService: MealService
  ) { }

  ngOnInit() {
    this.mealService.getMeals()
      .then(meals => this.meals = meals);
    
    for (let key in this.newMeal) {
      if (this.newMeal.hasOwnProperty(key)) {
        if (key !== 'name' && key !== 'id') {
          this.groups.push(key);
        }
      }
    }
  }

  getMealClass(key: String, value: String): String {
    return Number(value) === 0 ? 'label-disabled' : `label-${key}`;
  }

  showMealModal(): void {
    this.action = 'New';
    this.selectedMeal = new Meal();
  }

  showDeleteModal(selectedMeal: Meal): void {
    this.action = 'Delete';
    this.selectedMeal = selectedMeal;
  }

  editMeal(selectedMeal: Meal): void {
    this.isEditing = true;
    this.action = 'Edit';
    this.selectedMeal = selectedMeal;
  }

  deleteMeal(id: String): void {
    if (id) {
      this.mealService.deleteMeal(id)
        .then(() => {
          const mealIndex = _.findIndex(this.meals, {id: id});
          this.meals.splice(mealIndex, 1);
          this.selectedMeal = null;
        });
    } else {
      this.selectedMeal = null;
    }
  }

  update(results): void {
    if (results.isCancel) {
      this.selectedMeal = null;
      return;
    }
    if (!results.isEditing) {
      this.meals.push(results.meal);
    } else {
      const mealIndex = _.findIndex(this.meals, {id: results.meal.id});
      this.meals[mealIndex] = results.meal;
    }

    this.selectedMeal = null;
  }
}
