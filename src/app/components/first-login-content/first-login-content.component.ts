import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-login-content',
  standalone: true,
  imports: [CommonModule, StepperModule, ButtonModule],
  templateUrl: './first-login-content.component.html',
  styleUrl: './first-login-content.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FirstLoginContentComponent {
  constructor(private router: Router) {}
  goToReportPage() {
    this.router.navigate(['/form']);
  }
}
