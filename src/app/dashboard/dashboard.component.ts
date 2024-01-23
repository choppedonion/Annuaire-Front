import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showAddPersonForm = false;

  toggleAddPersonForm() {
    this.showAddPersonForm = !this.showAddPersonForm;
  }
  constructor() {}
}
