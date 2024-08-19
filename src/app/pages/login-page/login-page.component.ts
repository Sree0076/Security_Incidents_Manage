import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/Authentication/auth.service.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,ProgressSpinnerModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  isLoading = false;
  constructor( private router: Router,
    private authService: AuthServiceService, 
  ) {}

  loginPopup() {

    this.authService.loginPopup();
    this.isLoading = true;
  }


}
