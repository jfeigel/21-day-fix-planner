import {
  Component,
  Inject,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  ViewChild
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap';
import * as _ from 'lodash';

import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'tdf-meal-modal',
  templateUrl: './meal-modal.component.html',
  styleUrls: ['./meal-modal.component.scss']
})
export class MealModalComponent implements OnInit, OnChanges {
  @Input() meal: Meal;
  @Input() action: String;
  @Output() update = new EventEmitter();
  @ViewChild('addMealModal') public addMealModal: ModalDirective;

  newMeal: Meal = new Meal();
  mealForm: FormGroup;
  isEditing: Boolean = false;
  mealFormSubmitted: Boolean = false;
  groups: String[] = [];

  constructor(
    private mealService: MealService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    for (let key in this.newMeal) {
      if (this.newMeal.hasOwnProperty(key)) {
        if (['name', 'id', 'tags'].indexOf(key) === -1) {
          this.groups.push(key);
        }
      }
    }
  }

  ngOnChanges(changes) {
    if (changes.meal.currentValue && this.action !== 'Delete') {
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

      this.addMealModal.show();
    }
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
        this.closeMealModal();
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

      mealPromise.then(returnedMeal => {
        this.mealFormSubmitted = false;
        this.update.emit({meal: returnedMeal, isEditing: this.isEditing});
        this.addMealModal.hide();
      });
    }
  }

  closeMealModal() {
    this.update.emit({isCancel: true});
    this.addMealModal.hide();
  }
}
