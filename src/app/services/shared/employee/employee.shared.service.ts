import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Employee } from '../../../models/employee-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSharedService {
  constructor(private http: HttpClient){}

  private employeeSubject: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);
  public employeeData: Observable<Employee | null> = this.employeeSubject.asObservable();

  async fetchEmployeeData(token: string): Promise<void> {
    const data = await lastValueFrom(this.getEmployeeData(token));
    this.employeeSubject.next(data);
    console.log(this.employeeSubject);
  }
  private apiUrl = 'http://localhost:7209/api/Employee/GetEmployeeByToken/getUserRole';
  getEmployeeData(token:string): Observable<Employee> {
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    console.log(headers)
    return this.http.get<Employee>(this.apiUrl, { headers });
  }
}
