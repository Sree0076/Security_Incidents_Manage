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
    const response = await lastValueFrom(this.getEmployeeData(token));
    const data = response.body as Employee;
    const headers = response.headers;
    const accessToken = headers.get('AccessToken');
    localStorage.setItem('accountToken', token as string);
    localStorage.setItem('accessToken', accessToken as string);
    this.employeeSubject.next(data);
  }
  private apiUrl = 'http://172.16.4.89:9000/api/Employee/GetEmployeeByToken/getUserRole';
  getEmployeeData(token:string){
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(this.apiUrl, { headers, observe: 'response' });
  }
}
