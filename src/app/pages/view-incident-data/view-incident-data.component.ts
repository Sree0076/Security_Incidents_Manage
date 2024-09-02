import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewIncidentFormComponent } from 'src/app/components/view-incident-form/view-incident-form.component';
import { SideNavbarComponentComponent } from "../../components/side-navbar-component/side-navbar-component.component";

@Component({
  selector: 'app-view-incident-data',
  standalone: true,
  imports: [CommonModule, ViewIncidentFormComponent, SideNavbarComponentComponent],
  templateUrl: './view-incident-data.component.html',
  styleUrl: './view-incident-data.component.css',
})
export class ViewIncidentDataComponent {
  isSidebarExpanded = false;

  handleSidebarToggle(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
}
