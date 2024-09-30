import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take, tap } from 'rxjs';
import { Incidents } from '../../../models/incident-interface';
import { IncidentServiceService } from '../../incident/incident.service.service';
import { EmployeeSharedService } from '../employee/employee.shared.service';
import { Router } from '@angular/router';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr'; // Import SignalR
import { AuthServiceService } from '../../Authentication/auth.service.service';

@Injectable({
  providedIn: 'root',
})
export class IncidentSharedService {
  private hubConnection!: HubConnection; // SignalR HubConnection

  constructor(
    private incidentApiService: IncidentServiceService,
    private employeeDataService: EmployeeSharedService,
    private authService :AuthServiceService,
    private router: Router
  ) {
    this.createConnection(); // Initialize SignalR connection
    this.startConnection(); // Start SignalR connection
  }

  private navigateToDashboard = new Subject<void>();
  navigateToDashboard$ = this.navigateToDashboard.asObservable();
  
  private incidentDataSubject: BehaviorSubject<Incidents | null> = new BehaviorSubject<Incidents | null>(null);
  public incidentData: Observable<Incidents | null> = this.incidentDataSubject.asObservable();

  private selectedIncidentIdSource = new BehaviorSubject<number>(0);
  selectedIncidentId$ = this.selectedIncidentIdSource.asObservable();
  
  private unReadNotificationsCount = new BehaviorSubject<number>(0);
  unReadNotificationsCount$ = this.unReadNotificationsCount.asObservable();
  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('http://172.16.4.89:9000/incidentHub', {
      accessTokenFactory: () => {
        const token = localStorage.getItem('accessToken');
        return token ? token : "";  // Fix: Removed the comma here
      },
      transport: HttpTransportType.LongPolling // Fix: Moved transport here
    })
    .build();
  
    this.hubConnection.on('ReceiveIncidentUpdate', () => {  
      console.log("fetching");
      this.fetchIncidentData(this.router.url.includes('user'));
    });

        this.hubConnection.on('ReceiveAdminUpdate', () => {
          console.log("Admin update received");
          this.authService.redirectBasedOnRole();
        });
  }

  private startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection established'))
      .catch((err) => console.error('Error while starting SignalR connection: ', err));
  }

  fetchIncidentData(isUser: boolean): void {
    this.employeeDataService.employeeData.subscribe((data) => {
      if (data) {
        this.incidentApiService.getDataBasedOnStatus(data.id, isUser).subscribe((data: Incidents) => {
          this.incidentDataSubject.next(data);
          console.log(data);
          if (data.incidents.length === 0 && data.assignedIncidents.length === 0) {
            this.router.navigate(['/initial-page']);
          }
        });
      }
    });
  }

  setSelectedIncidentId(incidentId: number): void {
    this.selectedIncidentIdSource.next(incidentId);
  }

  triggerDashboard() {
    this.navigateToDashboard.next();
  }

  getNotificationCount(employeeId: number) {
    this.incidentApiService.unreadNotificationCount(employeeId).subscribe((data) => {
      this.unReadNotificationsCount.next(data);
    });
  }
}
