import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { DragulaService } from 'ng2-dragula';

import { Meal } from '../meal/meal';
import { MealService } from '../meal/meal.service';

@Component({
  selector: 'tdf-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss']
})
export class PlannerComponent implements OnInit {
  dates = [];
  meals: Meal[] = [];

  constructor(
    private dragulaService: DragulaService,
    private mealService: MealService
  ) {
    dragulaService.setOptions('planner', {
      copy: true
    });

    dragulaService.dropModel.subscribe(value => {
      // console.log(value);
      this.onDrop(value.slice(1));
    })
  }

  ngOnInit() {
    for (let i = 0; i < 7; i++) {
      this.dates.push({
        moment: moment().day(i),
        date: moment().day(i).format('D'),
        today: false,
        meals: []
      });
    }

    this.dates[moment().day()].today = true;

    this.mealService.getMeals()
      .then(meals => {
        this.meals = meals.concat(meals);
      });
  }

  private onDrop(args) {
    console.log(this.dates[0].meals);
  }

}
