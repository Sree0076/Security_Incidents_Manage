import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-first-login-content',
  standalone: true,
  imports: [CommonModule, StepperModule, ButtonModule],
  templateUrl: './first-login-content.component.html',
  styleUrl: './first-login-content.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FirstLoginContentComponent {}
