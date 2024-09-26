import { Component, Input, Signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IncidentServiceService } from 'src/app/services/incident/incident.service.service';
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
import { environment } from 'src/environments/environment';
import { IncidentData } from 'src/app/models/incident-interface';
import { MessageService } from 'primeng/api';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { ToastModule } from 'primeng/toast';
import { ButtonLoadingDirective } from 'src/app/shared/ui/button-loading.directive';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-incident-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatOptionModule,
    NgFor,
    ToastModule,
    NgIf,
    CommonModule,
    ButtonLoadingDirective,
  ],
  templateUrl: './edit-incident-form.component.html',
  styleUrl: './edit-incident-form.component.css',
  providers: [DatePipe, MessageService],
})
export class EditIncidentFormComponent {
  timeString!: string;
  dateString!: string;
  data: any = {};
  id = 0;
  editform!: FormGroup;
  editIncidentId = 0;
  incident!: IncidentData;
  editAction = false;
  documentUrls: { name: string; url: string }[] = [];
  @Input() isSidebarExpanded = false;
  isButtonLoading = false;

  incidentTypes = [
    { label: 'Security Incident', value: 'SecurityIncident' },
    { label: 'Privacy Incident', value: 'PrivacyIncident' },
    { label: 'Quality Incident', value: 'QualityIncident' },
  ];

  categories = [
    { label: 'Denial of Service', value: 'denialOfService' },
    { label: 'Loss', value: 'loss' },
    { label: 'Theft', value: 'theft' },
    { label: 'Malware', value: 'malware' },
    { label: 'Ransomware', value: 'ransomware' },
    { label: 'Unauthorized Use', value: 'unauthorizedUse' },
    { label: 'Disclosure', value: 'disclosure' },
    { label: 'Unauthorized Access', value: 'unauthorizedAccess' },
    { label: 'Phishing', value: 'phishing' },
    { label: 'Unplanned Downtime', value: 'unplannedDowntime' },
    { label: 'Insecure Site', value: 'insecureSite' },
    { label: 'Insecure Coding', value: 'insecureCoding' },
    { label: 'Physical Security', value: 'physicalSecurity' },
    { label: 'Spoofing', value: 'spoofing' },
    { label: 'Botnet Attack', value: 'botnetAttack' },
    { label: 'Exposed APIs', value: 'exposedAPIs' },
    { label: 'Disclosing IP Data', value: 'disclosingIPData' },
  ];

  priorities = [
    { label: 'High', value: 'High-L1' },
    { label: 'Medium', value: 'Medium-L2' },
    { label: 'Low', value: 'Low-L3' },
  ];

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

  constructor(
    private fb: FormBuilder,
    private apiService: IncidentServiceService,
    private incidentService: IncidentSharedService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.editform = this.fb.group({
      incidentTitle: [''],
      incidentDescription: [''],
      incidentType: [''],
      category: [''],
      priority: [''],
      investigationDetails: [''],
      associatedImpacts: [''],
      collectionOfEvidence: [''],
      correction: [''],
      correctiveAction: [''],
      correctionCompletionTargetDate: [null],
      correctionActualCompletionDate: [null],
      correctiveActualCompletionDate: [null],
      incidentStatus: [''],
      correctionDetailsTimeTakenToCloseIncident: [''],
      correctiveDetailsTimeTakenToCloseIncident: [''],
      preventiveAction: [''],
    });
    this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
      this.editIncidentId = incidentId;
      this.fetchIncident();
      console.log('Selected incident ID:', this.editIncidentId);
    });
  }

  fetchIncident() {
    this.apiService
      .getSingleFullIncident(this.editIncidentId)
      .subscribe((response) => {
        console.log(response);
        this.data = response;
        this.editform.patchValue({
          incidentid: response.id,
          incidentTitle: response.incidentTitle,
          incidentOccuredDate: response.incidentOccuredDate,
          incidentOccuredTime: this.timeString,
          incidentDescription: response.incidentDescription,
          incidentType: response.incidentType,
          category: response.category,
          priority: response.priority,
          investigationDetails: response.investigationDetails,
          associatedImpacts: response.associatedImpacts,
          collectionOfEvidence: response.collectionOfEvidence,
          correction: response.correction,
          correctiveAction: response.correctiveAction,
          correctionCompletionTargetDate:
            response.correctionCompletionTargetDate,
          correctionActualCompletionDate:
            response.correctionActualCompletionDate,
          correctiveActualCompletionDate:
            response.correctiveActualCompletionDate,
          incidentStatus: response.incidentStatus,
          correctionDetailsTimeTakenToCloseIncident:
            response.correctionDetailsTimeTakenToCloseIncident,
          correctiveDetailsTimeTakenToCloseIncident:
            response.correctiveDetailsTimeTakenToCloseIncident,
          preventiveAction: response.preventiveAction,
        });
        if (Array.isArray(response.documentUrls)) {
          this.documentUrls = response.documentUrls.map((url) => ({
            name: url.split('/').pop()!,
            url: `${environment.serverConfig.baseUrl}${url}`,
          }));
        }
      });
  }

  onSubmit() {
    this.isButtonLoading = true;
    if (this.editform.valid) {
      this.apiService
        .updateIncident(this.editIncidentId, this.editform.value)
        .subscribe((response) => {
          this.showSuccess('Incident Updated Successfully');
          this.isButtonLoading = false;
        });
    }
  }

  showSuccess(message: string) {
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${message}`,
      });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }, 100);
  }
}
