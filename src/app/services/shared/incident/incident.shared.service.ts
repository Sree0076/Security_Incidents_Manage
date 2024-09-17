import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Incidents } from '../../../models/incident-interface';
import { IncidentServiceService } from '../../incident/incident.service.service';
import { EmployeeSharedService } from '../employee/employee.shared.service';
import { Router } from '@angular/router';
import { notifications } from '../../../components/notification-component/notification-component.component';

@Injectable({
  providedIn: 'root',
})
export class IncidentSharedService {
  constructor(
    private incidentApiService: IncidentServiceService,
    private employeeDataService: EmployeeSharedService,
    private router: Router
  ) {}

  private navigateToDashboard = new Subject<void>();

  navigateToDashboard$ = this.navigateToDashboard.asObservable();
  private incidentDataSubject: BehaviorSubject<Incidents | null> =new BehaviorSubject<Incidents | null>(null);
  public incidentData: Observable<Incidents | null> =
  this.incidentDataSubject.asObservable();
  private selectedIncidentIdSource = new BehaviorSubject<number>(0);
  selectedIncidentId$ = this.selectedIncidentIdSource.asObservable();
  private unReadNotificationsCount = new BehaviorSubject<number>(0);
  unReadNotificationsCount$ = this.unReadNotificationsCount.asObservable();

  fetchIncidentData(isUser: boolean): void {
    this.employeeDataService.employeeData.subscribe((data) => {
      if (data) {
        this.incidentApiService.getDataBasedOnStatus(data.id, isUser).subscribe((data: Incidents) => {
            this.incidentDataSubject.next(data);
            console.log(data);
            if(data.incidents.length===0 && data.assignedIncidents.length===0)
            {
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

  getNotificationCount(employeeId:number)
  {
      this.incidentApiService.unreadNotificationCount(employeeId).subscribe((data)=>{
        this.unReadNotificationsCount.next(data);
        });
  }
}
