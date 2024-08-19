import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    MatCardModule,
  ],
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css'],
})
export class CardComponentComponent implements OnInit {
  @Input() title!: string;
  @Input() totalCount!: number;
  @Input() pendingCount!: number;
  @Input() closedCount!: number;
  @Input() iconSvg!: string;
  @Input() cardClass!: string;
  @Input() isExpanded=false;


  sanitizedIconSvg!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sanitizedIconSvg = this.sanitizer.bypassSecurityTrustHtml(
      this.iconSvg
    );
  }
}
