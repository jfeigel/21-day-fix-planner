import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ViewChild
} from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';

import { Meal } from '../meal';

@Component({
  selector: 'tdf-delete-meal-modal',
  templateUrl: './delete-meal-modal.component.html',
  styleUrls: ['./delete-meal-modal.component.scss']
})
export class DeleteMealModalComponent implements OnInit, OnChanges {
  @Input() meal: Meal;
  @Input() action: String;
  @Output() delete = new EventEmitter();
  @ViewChild('deleteMealModal') public deleteMealModal: ModalDirective;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes) {
    if (changes.meal.currentValue && this.action === 'Delete') {
      console.log('changes detected, showing modal');
      this.deleteMealModal.show();
    }
  }

  onSubmit(doDelete: boolean) {
    if (doDelete) {
      this.delete.emit(this.meal.id);
    } else {
      this.delete.emit(null);
    }

    this.deleteMealModal.hide();
  }

}
