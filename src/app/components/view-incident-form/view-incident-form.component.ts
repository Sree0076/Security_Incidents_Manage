import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentServiceService } from 'src/app/services/incident/incident.service.service';
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-incident-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-incident-form.component.html',
  styleUrl: './view-incident-form.component.css',
})
export class ViewIncidentFormComponent {
  constructor(
    private apiService: IncidentServiceService,
    private router: Router,
    private incidentService: IncidentSharedService
  ) {}
  data: any = {};
  id: number = 0;
  documentUrls: { name: string; url: string }[] = [];

  getStatus(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'progress':
        return 'status-in-progress';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  }

  ngOnInit() {
    this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
      this.id = incidentId;
      this.fetchIncident();
      console.log('Selected incident ID:', this.id);
    });
    console.log(this.data.monthYear);
  }

  fetchIncident() {
    this.apiService.getSingleFullIncident(this.id).subscribe((response) => {
      console.log(response);
      if (response.incidentOccuredDate) {
        const incidentDate = new Date(response.incidentOccuredDate);
        response.incidentOccuredDate = incidentDate;
      }
      this.data = response;

      if (Array.isArray(response.documentUrls)) {
        this.documentUrls = response.documentUrls.map((url) => ({
          name: url.split('/').pop()!,
          url: `${environment.serverConfig.baseUrl}${url}`,
        }));
      }
    });
  }
  redirectToEditPage(): void {
    this.router.navigate(['/edit-form', this.data.incidentNo]);
  }

  redirectToDashboard(): void {
    window.history.back();
  }
}