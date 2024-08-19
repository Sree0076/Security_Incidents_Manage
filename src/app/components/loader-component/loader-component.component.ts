import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-component.component.html',
  styleUrl: './loader-component.component.css',
})
export class LoaderComponentComponent {
  @Input() colorOne = '#da4733';
  @Input() colorTwo = '#3b78e7';
  @Input() colorThree = '#fdba2c';
}
