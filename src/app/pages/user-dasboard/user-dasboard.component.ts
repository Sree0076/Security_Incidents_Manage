import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CardComponentComponent } from '../../components/card-component/card-component.component';
import { CardData } from 'src/app/models/incident-interface';
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
import { AuthServiceService } from 'src/app/services/Authentication/auth.service.service';
import { switchMap, take, timer } from 'rxjs';
import { SideNavbarComponentComponent } from '../../components/side-navbar-component/side-navbar-component.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IncidentCreateFormComponentComponent } from 'src/app/components/incident-create-form-component/incident-create-form-component.component';
import { TableComponentComponent } from 'src/app/components/table-component/table-component.component';
import { LoaderComponentComponent } from '../../components/loader-component/loader-component.component';
import { VariablesSharedService } from 'src/app/services/shared/sharedVariables/variables.shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dasboard',
  standalone: true,

  imports: [CommonModule,MatTabsModule,TableComponentComponent,LoaderComponentComponent,CardComponentComponent,IncidentCreateFormComponentComponent,NgClass,NgFor,SideNavbarComponentComponent,ProgressSpinnerModule],
  templateUrl: './user-dasboard.component.html',
  styleUrl: './user-dasboard.component.css',
})
export class UserDasboardComponent implements OnInit {
  svg: string[] = [
    '<svg width="23" height="26" viewBox="0 0 48 51" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M45.6158 11.7545L45.6161 11.7546C45.69 11.7859 45.7384 11.8309 45.7659 11.8712C45.7925 11.9104 45.8008 11.9462 45.8008 11.9751V11.9753V13.5539C45.8008 13.5541 45.8008 13.5543 45.8008 13.5545C45.7984 20.621 43.8179 27.5644 40.0561 33.667C36.2937 39.7704 30.8834 44.8146 24.376 48.2678C24.317 48.2988 24.2447 48.3178 24.1667 48.3178C24.089 48.3178 24.0169 48.2989 23.9579 48.2681C17.4503 44.8149 12.0398 39.7705 8.27735 33.667C4.51551 27.5644 2.53499 20.621 2.53259 13.5545C2.53259 13.5545 2.53259 13.5544 2.53259 13.5543C2.53259 13.5541 2.53259 13.554 2.53259 13.5539L2.53259 11.9753V11.9751C2.53259 11.9462 2.54089 11.9104 2.56754 11.8712L0.914318 10.7457L2.56754 11.8712C2.59498 11.8309 2.64346 11.7859 2.71731 11.7546L2.71758 11.7545L23.988 2.7304C23.9881 2.73036 23.9882 2.73032 23.9883 2.73029C24.0414 2.70779 24.1025 2.69482 24.1667 2.69482C24.2309 2.69482 24.292 2.70779 24.3451 2.73029C24.3452 2.73032 24.3453 2.73036 24.3454 2.7304L45.6158 11.7545ZM45.074 13.5552V13.5545V13.4417V12.1178L43.8552 11.6006L24.9479 3.57814L24.1667 3.24667L23.3855 3.57814L4.47822 11.6006L3.25942 12.1178V13.4417V13.5545V13.5552C3.26161 20.3408 5.10253 27.0051 8.59606 32.8998C12.0891 38.7938 17.1131 43.7142 23.171 47.1918L24.1667 47.7633L25.1624 47.1918C31.2204 43.7142 36.2443 38.7938 39.7374 32.8998C43.2309 27.0051 45.0718 20.3408 45.074 13.5552ZM24.5301 22.9995V37.0478H23.8033V22.9995H24.5301ZM23.8033 13.9753H24.5301V14.4874H23.8033V13.9753Z" fill="white" stroke="white" stroke-width="4"/>\n</svg>',
    '<svg width="23" height="26" viewBox="0 0 49 54" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M21.7007 2.44585L1.53259 10.5764V30.6165C1.53259 41.3554 24.0413 51.6108 24.0413 51.6108C24.0413 51.6108 46.55 41.3554 46.55 30.6165V10.5764L26.3819 2.44585C25.6402 2.14347 24.8447 1.98779 24.0413 1.98779C23.2378 1.98779 22.4423 2.14347 21.7007 2.44585Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M32.4281 22.5997H24.041V11.25L15.8359 28.071H24.2231V39.4206L32.4281 22.5997Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>',
    '<svg width="23" height="26" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M2.65796 27.4892C2.65796 13.7862 13.4913 2.67773 26.8548 2.67773C40.2184 2.67773 51.0516 13.7862 51.0516 27.4892C51.0516 41.1924 40.2184 52.3008 26.8548 52.3008C13.4913 52.3008 2.65796 41.1924 2.65796 27.4892Z" stroke="white" stroke-width="5"/>\n<path d="M37.6091 19.2173L24.1664 35.7583L16.1008 28.2396" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>',
  ];
  cardClass: string[] = ['privacy-card', 'security-card', 'quality-card'];
  isLoading = false;
  isCreateIncidentView = false;
  incidentData!: CardData[];
  isSidebarExpanded = false;
  selectedCategory = '';

  handleSidebarToggle(expanded: boolean) {
    this.isSidebarExpanded = expanded;
    const card = document.querySelector('.card-container');
    if (card) {
      card.classList.toggle('shrink');
    }
  }
  constructor(
    private incidentDataService: IncidentSharedService,
    private craeteIncidentFormview: VariablesSharedService,
  ) {}

  ngOnInit() {
    this.incidentDataService.incidentData.pipe(
      take(1)
    ).subscribe(data => {
      const dashboard = document.querySelector('.dashboard-section');
      if (data===null) {
        this.isLoading = true;
        dashboard?.classList.toggle('loading');
      }
    });
    this.incidentDataService.fetchIncidentData(false);
    this.incidentDataService.incidentData
      .pipe(
        switchMap((data) => {
          if (data) {
            this.incidentData = [
              {
                title: 'Privacy Incidents',
                total_incidents: data.privacyTotalIncidents,
                pending_incidents: data.privacyPendingIncidents,
                closed_incidents: data.privacyClosedIncidents,
                class: 'privacy-card',
              },
              {
                title: 'Security Incidents',
                total_incidents: data.securityTotalIncidents,
                pending_incidents: data.securityPendingIncidents,
                closed_incidents: data.securityClosedIncidents,
                class: 'security-card',
              },
              {
                title: 'Quality Incidents',
                total_incidents: data.qualityTotalIncidents,
                pending_incidents: data.qualityPendingIncidents,
                closed_incidents: data.qualityClosedIncidents,
                class: 'quality-card',
              },
            ];
          }
          return timer(2500);
        })
      )
      .subscribe(() => {
        this.isLoading = false;
      });

    this.craeteIncidentFormview.sidebarVisible$.subscribe((data) => {
      this.isCreateIncidentView = data;
    });
  }
  getCategory(event: string) {
    document.getElementById('tableRef')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    this.selectedCategory = event;
    console.log(event);
  }
}
