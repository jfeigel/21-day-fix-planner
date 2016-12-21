import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { CollapseModule, ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { PlannerComponent } from './planner/planner.component';
import { MealComponent } from './meal/meal.component';
import { MealModalComponent } from './meal/meal-modal/meal-modal.component';
import { UserComponent } from './user/user.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { DeleteUserModalComponent } from './user/delete-user-modal/delete-user-modal.component';

import { UserService } from './user/user.service';
import { MealService } from './meal/meal.service';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DeleteMealModalComponent } from './meal/delete-meal-modal/delete-meal-modal.component';

const appRoutes: Routes = [
  {
    path: 'planner',
    component: PlannerComponent
  },
  {
    path: 'meal',
    component: MealComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '',
    redirectTo: '/planner',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PlannerComponent,
    MealComponent,
    UserComponent,
    UserModalComponent,
    CapitalizePipe,
    DeleteUserModalComponent,
    MealModalComponent,
    DeleteMealModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CollapseModule,
    ModalModule.forRoot(),
    MaterialModule.forRoot()
  ],
  providers: [
    UserService,
    MealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
