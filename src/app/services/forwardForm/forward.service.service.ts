/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForwardServiceService {
  constructor(private http: HttpClient) {}

  getAllUsers(isForAddAdmins: boolean):Observable<any>{
    return this.http.get<any>(`http://172.16.4.89:9000/api/Employee/GetEmployees/${isForAddAdmins}`);
  }

  forwardIncident(incidentId: number, assignedEmployeeIds: number[], remarks: string): Observable<any> {
    const payload = {
        assignedEmployeeIds: assignedEmployeeIds,
        remarks: remarks
    };
    const url = `http://172.16.4.89:9000/api/AssignedIncident/AssignIncidentToEmployees/AssignIncidentToEmployees/${incidentId}`;
    return this.http.post(url, payload);
}

}
