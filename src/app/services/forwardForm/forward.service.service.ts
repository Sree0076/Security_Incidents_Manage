/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForwardServiceService {

  constructor(private http: HttpClient) {}

  getAllUsers(isForAddAdmins: boolean):Observable<any>{
    return this.http.get<any>(`http://localhost:7209/api/Employee/GetEmployees/${isForAddAdmins}`);
  }

  forwardIncident(incidentId: number, assignedEmployeeIds: number[], remarks: string): Observable<any> {
    const payload = {
        assignedEmployeeIds: assignedEmployeeIds,
        remarks: remarks
    };
    const url = `http://localhost:7209/api/AssignedIncident/AssignIncidentToEmployees/AssignIncidentToEmployees/${incidentId}`;
    return this.http.post(url, payload);
}
}
