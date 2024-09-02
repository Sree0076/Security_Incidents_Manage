import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavbarComponentComponent } from "../../components/side-navbar-component/side-navbar-component.component";
import { EditIncidentFormComponent } from "../../components/edit-incident-form/edit-incident-form.component";

@Component({
  selector: 'app-edit-incident-data',
  standalone: true,
  imports: [CommonModule, SideNavbarComponentComponent, EditIncidentFormComponent],
  templateUrl: './edit-incident-data.component.html',
  styleUrl: './edit-incident-data.component.css',
})
export class EditIncidentDataComponent {

  isSidebarExpanded = false;

  handleSidebarToggle(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
}
