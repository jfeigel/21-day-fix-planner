import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Meal } from './meal';

@Injectable()
export class MealService {
  private mealUrl = 'http://localhost:4000/api/meals';

  constructor(
    private http: Http
  ) { }

  getMeals(id: Number = undefined): Promise<Meal[]> {
    let url = this.mealUrl;

    if (id) {
      url = `${url}/${id}`;
    }

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createMeal(meal: Meal): Promise<Meal> {
    return this.http
      .post(this.mealUrl, meal)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateMeal(id: String, meal: Meal): Promise<Meal> {
    return this.http
      .put(`${this.mealUrl}/${id}`, meal)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteMeal(id: String): Promise<Meal> {
    return this.http
      .delete(`${this.mealUrl}/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(e: any) {
    console.error('An Error Occurred:', e);
    return Promise.reject(e.message || e);
  }

}
