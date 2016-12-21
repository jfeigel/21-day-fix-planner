import { Component, ViewContainerRef } from '@angular/core';

import { CollapseModule } from 'ng2-bootstrap';

@Component({
  selector: 'tdf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '21 Day Fix Planner';
  isMenuCollapsed: Boolean = true;

  constructor(private viewContainerRef: ViewContainerRef) {}
}
