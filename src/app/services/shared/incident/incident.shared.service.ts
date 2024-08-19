import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incidents } from '../../../models/incident-interface';
import { IncidentServiceService } from '../../incident/incident.service.service';
import { EmployeeSharedService } from '../employee/employee.shared.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentSharedService {
  constructor(private incidentApiService: IncidentServiceService,private employeeDataService: EmployeeSharedService) {}
  private incidentDataSubject: BehaviorSubject<Incidents | null> = new BehaviorSubject<Incidents | null>(null);
  public incidentData: Observable<Incidents | null> = this.incidentDataSubject.asObservable();
  private selectedIncidentIdSource = new BehaviorSubject<number>(0);
  selectedIncidentId$ = this.selectedIncidentIdSource.asObservable();
  
  fetchIncidentData(isUser:boolean): void {
    console.log("data");
    this.employeeDataService.employeeData.subscribe(data => {
      if (data) {
        this.incidentApiService.getDataBasedOnStatus(data.id,isUser).subscribe((data: Incidents) => {
         
          this.incidentDataSubject.next(data);

        });
      }
    });

  }

  setSelectedIncidentId(incidentId: number): void {
    this.selectedIncidentIdSource.next(incidentId);
  }
}
