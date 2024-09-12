/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IncidentData, Incidents } from '../../models/incident-interface';

@Injectable({
  providedIn: 'root'
})
export class IncidentServiceService {

  private baseApiUrl = 'http://localhost:7209/api/Incident';
  private assignedIncidentApiUrl = 'http://localhost:7209/api/AssignedIncident';

  constructor(private http: HttpClient) {}

  // Create a new incident
  public addIncident(incident: FormData): Observable<IncidentData> {
    return this.http.post<IncidentData>(`${this.baseApiUrl}/CreateIncident`, incident);
  }

  // Update an incident
  public updateIncident(incidentId: number, incident: IncidentData): Observable<IncidentData> {
    return this.http.put<IncidentData>(`${this.baseApiUrl}/UpdateIncident/${incidentId}`, incident);
  }

  // Update an incident for a user
  public updateUserIncident(incidentId: number, incident: FormData): Observable<IncidentData> {
    return this.http.put<IncidentData>(`${this.baseApiUrl}/UserUpdateIncident/${incidentId}`, incident)
      .pipe(catchError(this.handleError));
  }

  // Get incidents based on employee ID and user status
  public getDataBasedOnStatus(employeeId: number, isUser: boolean): Observable<Incidents> {
    return this.http.get<Incidents>(`${this.baseApiUrl}/GetIncidentsByEmployeeId/${employeeId}/${isUser}`)
      .pipe(catchError(this.handleError));
  }

  // Get a single incident
  public getSingleIncident(incidentId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`${this.baseApiUrl}/GetUserUpdateIncident/${incidentId}`)
      .pipe(catchError(this.handleError));
  }

  // Get full details of a single incident
  public getSingleFullIncident(incidentId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`${this.baseApiUrl}/GetIncident/${incidentId}`)
      .pipe(catchError(this.handleError));
  }

  // Get assigned incidents for an employee
  public getAssignedIncident(employeeId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`${this.assignedIncidentApiUrl}/GetAssignedIncidentsForEmployee/${employeeId}`)
      .pipe(catchError(this.handleError));
  }

  // Submit an incident for user review
  public submitForUser(incidentId: number, incident: any): Observable<IncidentData> {
    return this.http.put<IncidentData>(`http://localhost:7209/api/updateIncidentByReview/${incidentId}`, incident)
      .pipe(catchError(this.handleError));
  }

  // Approve an incident
  public incidentApproval(incidentId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`http://localhost:7209/api/incidentApproval/${incidentId}`)
      .pipe(catchError(this.handleError));
  }

  // Accept an incident
  public incidentAccept(incidentId: number, employeeId: number): Observable<IncidentData> {
    return this.http.put<IncidentData>(`http://localhost:7209/api/acceptIncidents/${incidentId}`, employeeId)
      .pipe(catchError(this.handleError));
  }

  // Delete a draft incident by ID
  public deleteDraftIncidentById(incidentId: number): Observable<IncidentData> {
    return this.http.delete<IncidentData>(`${this.baseApiUrl}/DeleteIncidentById/${incidentId}`)
      .pipe(catchError(this.handleError));
  }


  public getNotifications(employeeId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:7209/api/Notification/${employeeId}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
