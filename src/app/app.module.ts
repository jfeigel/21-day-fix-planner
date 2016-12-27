import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { PlannerComponent } from './planner/planner.component';
import { MealComponent } from './meal/meal.component';
import { MealModalComponent } from './meal/meal-modal/meal-modal.component';
import { UserComponent } from './user/user.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { DeleteUserModalComponent } from './user/delete-user-modal/delete-user-modal.component';
import { DeleteMealModalComponent } from './meal/delete-meal-modal/delete-meal-modal.component';

import { UserService } from './user/user.service';
import { MealService } from './meal/meal.service';

import { CapitalizePipe } from './pipes/capitalize.pipe';

const appRoutes: Routes = [
  {
    path: 'planner',
    component: PlannerComponent
  },
  {
    path: 'meals',
    component: MealComponent
  },
  {
    path: 'users',
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
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  entryComponents: [
    MealModalComponent,
    DeleteMealModalComponent,
    UserModalComponent,
    DeleteUserModalComponent
  ],
  providers: [
    UserService,
    MealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
