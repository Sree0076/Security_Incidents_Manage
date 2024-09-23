/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  OnInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { IncidentData } from 'src/app/models/incident-interface';
import { IncidentServiceService } from 'src/app/services/incident/incident.service.service';
import { TagModule } from 'primeng/tag';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SkeletonModule } from 'primeng/skeleton';
import * as XLSX from 'xlsx';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { MenuModule } from 'primeng/menu';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
import { EmployeeSharedService } from 'src/app/services/shared/employee/employee.shared.service';
import { VariablesSharedService } from 'src/app/services/shared/sharedVariables/variables.shared.service';
import { TableTruncatePipe } from 'src/app/pipes/table/table-truncate.pipe';
import { ForwardFormComponentComponent } from '../forward-form-component/forward-form-component.component';
import { ButtonLoadingDirective } from 'src/app/shared/ui/button-loading.directive';

interface PriorityOrder {
  High: number;
  Medium: number;
  Low: number;
}

@Component({
  selector: 'app-table-component',
  standalone: true,
  providers: [HttpClient, ConfirmationService, MessageService],
  imports: [
    ForwardFormComponentComponent,
    SkeletonModule,
    ButtonModule,
    RouterOutlet,
    ButtonModule,
    TableModule,
    CommonModule,
    SplitButtonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    DialogModule,
    MenuModule,
    OverlayPanelModule,
    TagModule,
    ChipsModule,
    ConfirmDialogModule,
    ToastModule,
    TableTruncatePipe,
    ButtonLoadingDirective,
  ],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css',
})
export class TableComponentComponent implements OnInit, OnChanges {
  cols: any[] = [];
  _selectedColumns: any[] = [];

  @Input() isadmin = false;
  @Input() getAssigned = false;
  @Input() filterCategory = '';

  @ViewChild('dt2') dt2: Table | undefined;
  incidents: IncidentData[] = [];
  isLoading = true;
  priorities: any[] = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];
  statuses: any[] = [
    { label: 'Draft', value: 'draft' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'progress' },
    { label: 'In Review', value: 'review' },
    { label: 'Closed', value: 'closed' },
  ];
  types: any[] = [
    { label: 'Privacy', value: 'Privacy Incidents' },
    { label: 'Security', value: 'Security Incidents' },
    { label: 'Quality', value: 'Quality Incidnets' },
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
    { label: 'Other', value: 'Other' },
  ];
  searchValue: string | undefined;
  displayForwardingModal = false;
  selectedIncidentId: number | null = null;
  menuitems: MenuItem[] | undefined;
  selectedIncident!: IncidentData;
  first = 0;
  rows = 10;
  isButtonLoading = false;
  priorityValue: any;
  incidentTypeValue: any;
  selectedIncidents: IncidentData[] = [];

  constructor(
    private router: Router,
    private tablefetchService: IncidentServiceService,
    private incidentDataService: IncidentSharedService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private employeeDataService: EmployeeSharedService,
    private sidebarService: VariablesSharedService
  ) {}

  ngOnInit() {
    this.sidebarService.hideSidebar();
    this.isLoading = true;
    if (this.getAssigned) {
      this.fetchAssignedIncidents();
    } else {
      this.fetchAllIncidents();
    }
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'category', header: 'Categories' },
      { field: 'reportedBy', header: 'Reported By' },
      { field: 'priority', header: 'Priority' },
      { field: 'incidentStatus', header: 'Status' },
      { field: 'action', header: 'Action' },
    ];
    this._selectedColumns = this.cols;
  }
  get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['filterCategory'] &&
      !changes['filterCategory'].isFirstChange()
    ) {
      this.applyCategoryFilter();
    }
  }

  private stopLoadingWithDelay(delay = 2000) {
    setTimeout(() => {
      this.isLoading = false;
    }, delay);
  }

  fetchAllIncidents() {
    this.incidentDataService.incidentData.subscribe((data) => {
      if (data) {
        this.incidents = data.incidents;
        this.sortByPriority();
        console.log(data);
        this.stopLoadingWithDelay();
      }
    });
  }

  fetchAssignedIncidents() {
    this.incidentDataService.incidentData.subscribe((data) => {
      if (data) {
        this.incidents = data.assignedIncidents;
        this.sortByPriority();
        console.log(data);
        this.stopLoadingWithDelay();
      }
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.incidents
      ? this.first === this.incidents.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.incidents ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    console.log(value);
    if (this.dt2) {
      this.dt2.filterGlobal(value, 'contains');
    }
  }

  filterPriority(event: any) {
    if (this.dt2) {
      this.dt2.filter(event, 'priority', 'equals');
    }
  }
  filterCategories(event: any) {
    if (this.dt2) {
      this.dt2.filter(event, 'category', 'equals');
    }
  }

  filterStatus(event: any) {
    if (this.dt2) {
      this.dt2.filter(event, 'incidentStatus', 'equals');
    }
  }
  openForwardingModal(incidentId: number) {
    this.selectedIncidentId = incidentId;
    this.incidentDataService.setSelectedIncidentId(incidentId);
    this.displayForwardingModal = true;
  }

  onDialogClosed() {
    this.displayForwardingModal = false;
  }

  onAddItem() {
    this.router.navigate(['/create-incident']);
  }

  applyCategoryFilter() {
    console.log(this.filterCategory);
    if (this.dt2) {
      this.dt2.filter(this.filterCategory, 'incidentType', 'contains');
    }
  }

  editIncidentData(incident: IncidentData, incidentId: number): void {
    console.log(incident.id);
    if (incident.incidentStatus !== 'closed') {
      this.incidentDataService.setSelectedIncidentId(incidentId);
      if (this.getAssigned || this.isadmin) {
        this.router.navigate(['/edit-incident']);
      } else {
        this.sidebarService.showSidebar();
      }
    } else {
      this.showError(' Sorry, The Incident is already Closed !');
    }
  }

  deleteDraftIncidentById(incidentId: number): void {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.tablefetchService
          .deleteDraftIncidentById(incidentId)
          .subscribe((response) => {
            this.showSuccess('Draft Incident Deleted Successfully');
          });
      },
      reject: () => {},
    });
  }

  viewIncidentData(event: any): void {
    console.log('view');
    const incident = event.data;
    console.log(incident);
    this.incidentDataService.setSelectedIncidentId(incident.id);
    this.router.navigate(['/view-incident']);
  }

  sortByPriority() {
    if (this.incidents) {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      const statusOrder: Record<string, number> = { pending: 1, progress: 2 };

      const activeIncidents = this.incidents.filter(
        (incident) => incident.incidentStatus !== 'closed'
      );
      const closedIncidents = this.incidents.filter(
        (incident) => incident.incidentStatus === 'closed'
      );

      activeIncidents.sort((a, b) => {
        // Prioritize incidents that are submitted for review
        console.log(a.incidentNo, a.incidentStatus);
        console.log(b.incidentNo, b.isSubmittedForReview);
        if (a.isSubmittedForReview && !b.isSubmittedForReview) {
          return -1;
        } else if (!a.isSubmittedForReview && b.isSubmittedForReview) {
          return 1;
        }

        // If neither or both are submitted for review, sort by incident status
        return statusOrder[a.incidentStatus] - statusOrder[b.incidentStatus];
      });

      this.incidents = [...activeIncidents, ...closedIncidents];
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'closed':
        return 'success';
      case 'progress':
        return 'info';
      case 'pending':
        return 'danger';
      case 'review':
        return 'secondary';
      default:
        return undefined;
    }
  }

  getSeverityClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'low':
        return 'severity-low';
      case 'medium':
        return 'severity-medium';
      case 'high':
        return 'severity-high';
      default:
        return '';
    }
  }

  getTypeSeverityClass(type: string): string {
    if (type) {
      switch (type.toLowerCase()) {
        case 'security incidents':
          return 'security';
        case 'privacy incidents':
          return 'privacy';
        case 'quality incidents':
          return 'quality';
        default:
          return '';
      }
    }
    return '';
  }

  onIconClick(incident: any): void {
    if (incident.incidentStatus !== 'closed') {
      this.openForwardingModal(incident.id);
    }
  }

  exportExcel(dt2: any) {
    if (this.incidents) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dt2.value);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'DataExport.xlsx');
    }
  }

  async exportPDF(incidents: any): Promise<void> {
    await this.tablefetchService
      .getSingleFullIncident(incidents.id)
      .subscribe((response) => {
        console.log(response);
        const incident = response;

        const doc = new jsPDF();

        doc.setFontSize(18);
        const titleText = `Incident Report of ${incident.incidentTitle}, ${incident.incidentNo}`;
        doc.text(titleText, 14, 20);

        // Define table column headers
        const columns = [
          { title: 'Title', dataKey: 'field', width: 30 },
          { title: 'Description', dataKey: 'value', width: 120 },
        ];

        // Define table data
        const rows = [
          { field: 'Incident No', value: incident.incidentNo },
          {
            field: 'Incident Occurred Date',
            value: new Date(incident.incidentOccuredDate).toLocaleDateString(),
          },
          { field: 'Title', value: incident.incidentTitle },
          { field: 'Description', value: incident.incidentDescription },
          { field: 'Reported By', value: incident.reportedBy },
          { field: 'Role of Reporter', value: incident.roleOfReporter },
          { field: 'Month/Year', value: incident.monthYear },
          { field: 'Incident Type', value: incident.incidentType },
          { field: 'Category', value: incident.category },
          { field: 'Priority', value: incident.priority },
          { field: 'Action Assigned To', value: incident.actionAssignedTo },
          { field: 'Dept of Assignee', value: incident.deptOfAssignee },
          {
            field: 'Investigation Details',
            value: incident.investigationDetails,
          },
          { field: 'Associated Impacts', value: incident.associatedImpacts },
          {
            field: 'Collection of Evidence',
            value: incident.collectionOfEvidence,
          },
          { field: 'Correction', value: incident.correction },
          { field: 'Corrective Action', value: incident.correctiveAction },
          {
            field: 'Correction Completion Target Date',
            value: new Date(
              incident.correctionCompletionTargetDate
            ).toLocaleDateString(),
          },
          {
            field: 'Correction Actual Completion Date',
            value: new Date(
              incident.correctionActualCompletionDate
            ).toLocaleDateString(),
          },
          {
            field: 'Corrective Actual Completion Date',
            value: new Date(
              incident.correctiveActualCompletionDate
            ).toLocaleDateString(),
          },
          { field: 'Incident Status', value: incident.incidentStatus },
          {
            field: 'Correction Details Time Taken To Close Incident',
            value: `${incident.correctionDetailsTimeTakenToCloseIncident} hours`,
          },
          {
            field: 'Corrective Details Time Taken To Close Incident',
            value: `${incident.correctiveDetailsTimeTakenToCloseIncident} hours`,
          },
          {
            field: 'Created At',
            value: new Date(incident.createdAt).toLocaleDateString(),
          },
        ];

        // Generate the table
        (doc as any).autoTable({
          columns,
          body: rows,
          startY: 30, // Starting Y position
          theme: 'striped',
          margin: { left: 14, right: 14 },
        });

        // Save the PDF
        doc.save(
          `incident_${incident.incidentTitle}_${incident.incidentNo}.pdf`
        );
      });
  }

  isColumnVisible(columnField: string): boolean {
    return this.selectedColumns.some((col) => col.field === columnField);
  }

  getStatusLabel(statusValue: string): string {
    const status = this.statuses.find((s) => s.value === statusValue);
    return status ? status.label : statusValue;
  }

  onSubmitReview(incident: IncidentData) {
    console.log(incident.isSubmittedForReview);
    if (incident.isSubmittedForReview) {
      this.showError('Already Submitted For Review');
    } else {
      const submitData = {
        id: incident.id,
        isSubmittedForReview: true,
      };
      console.log(submitData);
      this.tablefetchService
        .submitForUser(incident.id, submitData)
        .subscribe((response) => {
          console.log(response);
          this.showSuccess('Incident Submitted For Review');
        });
    }
  }

  onApproval(incident: IncidentData) {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.tablefetchService
          .incidentApproval(incident.id)
          .subscribe((response) => {
            console.log(response);
            this.showSuccess('Corrective measures aproved sucessfully');
          });
      },
      reject: () => {},
    });
  }
  onReject(incident: IncidentData) {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        const submitData = {
          id: incident.id,
          isSubmittedForReview: false,
        };
        this.tablefetchService
          .submitForUser(incident.id, submitData)
          .subscribe((response) => {
            console.log(response);
            this.showError('Incident returned');
          });
      },
      reject: () => {},
    });
  }

  showSuccess(message: string) {
    console.log(this.getAssigned);
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${message}`,
      });
      setTimeout(() => {
        this.incidentDataService.fetchIncidentData(this.getAssigned);
      }, 2000);
    }, 100);
  }

  showError(message: string) {
    setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `${message}`,
      });
      setTimeout(() => {
        this.incidentDataService.fetchIncidentData(this.getAssigned);
      }, 2000);
    }, 50);
  }

  onIncidentAccept(incident: IncidentData) {
    this.isButtonLoading = true;
    this.employeeDataService.employeeData.subscribe((data) => {
      if (data) {
        this.tablefetchService
          .incidentAccept(incident.id, data.id)
          .subscribe((response) => {
            this.isButtonLoading = false;
            this.showSuccess('Incident Aceepted for Resolving');
          });
      }
    });
  }
  openSidebar() {
    this.incidentDataService.setSelectedIncidentId(0);
    this.sidebarService.showSidebar();
  }
}
