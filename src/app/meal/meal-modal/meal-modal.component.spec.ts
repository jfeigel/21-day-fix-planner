/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MealModalComponent } from './meal-modal.component';

describe('MealModalComponent', () => {
  let component: MealModalComponent;
  let fixture: ComponentFixture<MealModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
