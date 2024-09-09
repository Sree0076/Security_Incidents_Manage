/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import {  NgIf } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { IncidentData } from 'src/app/models/incident-interface';
import { IncidentServiceService } from 'src/app/services/incident/incident.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeSharedService } from '../../services/shared/employee/employee.shared.service';
import { SidebarModule } from 'primeng/sidebar';
import { VariablesSharedService } from 'src/app/services/shared/sharedVariables/variables.shared.service';
import { environment } from 'src/environments/environment';
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
import { ButtonLoadingDirective } from 'src/app/shared/ui/button-loading.directive';

@Component({
  selector: 'app-incident-create-form-component',
  standalone: true,
  imports: [
    SidebarModule,
    ReactiveFormsModule,
    NgIf,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    MatNativeDateModule,
    ConfirmDialogModule,
    ButtonLoadingDirective,
  ],
  providers: [
    MessageService,
    HttpClient,
    MatNativeDateModule,
    ConfirmationService,
  ],
  templateUrl: './incident-create-form-component.component.html',
  styleUrl: './incident-create-form-component.component.css',
})
export class IncidentCreateFormComponentComponent implements OnInit {

  incident!: IncidentData;
  @Input() sidebarVisible = false;
  uploadedFiles: { name: string; url: string }[] = [];
  incidentTypes = [
    { label: 'Security Incident', value: 'Security Incidents' },
    { label: 'Privacy Incident', value: 'Privacy Incidents' },
    { label: 'Quality Incident', value: 'Quality Incidents' },
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
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];
  selectedFiles!: File[];
  date1!: Date | null;
  maxDate: Date = new Date();
  employeeId = 0;
  today!: Date;
  isEdit =false;
  selectedIncidentId! : number;
  isButtonLoading = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: IncidentServiceService,
    private messageService: MessageService,
    private employeeDataService: EmployeeSharedService,
    private confirmationService: ConfirmationService,
    private sidebarService : VariablesSharedService,
    private incidentService: IncidentSharedService
  ) {}

  openDialog() {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.prepareFormData(false);
      },
      reject: () => {},
    });
  }

  showSuccess(message: string) {
    this.isButtonLoading =false;
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${message}`,
      });
      setTimeout(() => {
        this.router.navigate(['/user']);
      }, 2000);
    }, 100);
  }

  showError(message: string) {
    this.isButtonLoading =false;
    setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `${message}`,
      });
    }, 100);
  }

  saveAsDraft() {
    this.isButtonLoading = true;
    if (
      !this.viewform.value.incidentTitle ||
      !this.viewform.value.incidentOccuredDate ||
      !this.viewform.value.incidentDescription
    ) {
      this.showError('Please Fill Out Required Details');
      return;
    }
    this.prepareFormData(true);
  }

  viewform!: FormGroup;

  ngOnInit() {

    this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
      if(incidentId)
      {
        this.selectedIncidentId = incidentId;
        this.isEdit=true;
        this.fetchIncident();
      }
    });
    
    this.sidebarService.sidebarVisible$.subscribe(visible => {
      this.sidebarVisible = visible;
    }); 
    
    this.today = new Date();

    this.viewform = new FormGroup({
      incidentTitle: new FormControl('', Validators.required),
      category: new FormControl(''),
      incidentType: new FormControl(''),
      incidentOccuredDate: new FormControl('', Validators.required),
      incidentOccuredTime: new FormControl('', Validators.required),
      incidentDescription: new FormControl('', Validators.required),
      reportedBy: new FormControl('', Validators.required),
      reportedDate: new FormControl('', Validators.required),
      priority: new FormControl(''),
      isDraft: new FormControl(false),
      employeeId: new FormControl(0),
      documentUrls: new FormControl(null),
    });
    console.log(this.viewform);

    this.employeeDataService.employeeData.subscribe((data) => {
      if (data) {
        this.employeeId = data.id;
      }
    });
  }

  fetchIncident() {
    this.apiService
      .getSingleIncident(this.selectedIncidentId)
      .subscribe((response) => {
        console.log('Incident Fetched successfully', response);

        if (response.incidentOccuredDate) {
          const incidentDate = new Date(response.incidentOccuredDate);
          response.incidentOccuredDate = incidentDate;
        }

        this.viewform.patchValue({
          incidentTitle: response.incidentTitle,
          category: response.category,
          incidentType: response.incidentType,
          incidentAttachment: response.documentUrls,
          incidentOccuredDate: response.incidentOccuredDate,
          // incidentOccuredTime: response.incidentOccuredTime,
          incidentDescription: response.incidentDescription,
          reportedBy: response.reportedBy,
          priority: response.priority,
          isDraft: response.isDraft,
          oldDocumentUrls: response.documentUrls,
        });

        console.log('document fetched:', response.documentUrls);

        if (Array.isArray(response.documentUrls)) {
          this.uploadedFiles = response.documentUrls.map((url) => ({
            name: url.split('/').pop()!, 
            url: `${environment.serverConfig.baseUrl}${url}`,
          }));
        }

        console.log('Old files', this.uploadedFiles);
      });
  }

  onFileUpload(event: any) {
    console.log('fileupload', <File>event.files);
    this.selectedFiles = <File[]>event.files;
  }

  onSubmit() {
    this.isButtonLoading =true;
    if (
      !this.viewform.value.incidentTitle ||
      !this.viewform.value.incidentOccuredDate ||
      !this.viewform.value.incidentDescription
    ) {
      this.showError('Please Fill Out Required Details');
      return;
    }

     this.prepareFormData(false);
  }

  prepareFormData(isDraft: boolean) {
    this.viewform.value.employeeId = this.employeeId;
    this.viewform.value.isDraft = isDraft;

    const formData = new FormData();
    if (this.selectedFiles) {
      this.selectedFiles.forEach((file) => {
        formData.append('documentUrls', file);
      });
    }

    for (const [key, value] of Object.entries(this.viewform.value)) {
      if (key !== 'documentUrls') {
        if (key === 'incidentOccuredDate') {
          formData.append(key, (value as Date).toISOString());
        } else {
          formData.append(key, value as string);
        }
      }
    }

    if (this.isEdit) {
      this.apiService
        .updateUserIncident(this.selectedIncidentId, formData)
        .subscribe(() => {
          this.showSuccess('Incident updated successfully');
        });
    } else {
      this.apiService.addIncident(formData).subscribe(() => {
        if(isDraft)
        {
          this.showSuccess('Incident Saved As Draft');
        }
        else{
          this.showSuccess('Incident reported successfully');
        }
      });
    }
  }
}
