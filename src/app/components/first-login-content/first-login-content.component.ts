import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { IncidentCreateFormComponentComponent } from '../incident-create-form-component/incident-create-form-component.component';
import { VariablesSharedService } from 'src/app/services/shared/sharedVariables/variables.shared.service';

@Component({
  selector: 'app-first-login-content',
  standalone: true,
  imports: [
    CommonModule,
    StepperModule,
    ButtonModule,
    IncidentCreateFormComponentComponent,
  ],
  templateUrl: './first-login-content.component.html',
  styleUrl: './first-login-content.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FirstLoginContentComponent {
  constructor(private sidebarService: VariablesSharedService) {}

  goToReportPage() {
    this.sidebarService.showSidebar();
  }

}
