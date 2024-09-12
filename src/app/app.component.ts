import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponentComponent } from "./components/card-component/card-component.component";
import { ButtonLoadingDirective } from './shared/ui/button-loading.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/shared/interceptor/api-authorisation.interceptor';



@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgClass,
    NgFor,
    CardComponentComponent,
    ButtonLoadingDirective
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppComponent {
  title = 'preventyon';
}
