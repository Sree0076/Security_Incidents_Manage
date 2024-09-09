import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponentComponent } from "./components/card-component/card-component.component";
import { ButtonLoadingDirective } from './shared/ui/button-loading.directive';



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
})
export class AppComponent {
  title = 'preventyon';
}
