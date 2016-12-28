import { Component } from '@angular/core';

@Component({
  selector: 'tdf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '21 Day Fix Planner';
  isMenuCollapsed: Boolean = true;
  navItems = [
    { name: 'Planner', route: '/planner', icon: 'event' },
    { name: 'Meals', route: '/meals', icon: 'restaurant' },
    { name: 'Users', route: '/users', icon: 'people' }
  ];

  constructor() {}
}
