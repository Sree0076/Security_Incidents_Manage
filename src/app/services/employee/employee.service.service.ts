/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin, UpdateAdmin } from 'src/app/models/user-manage-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient) {}

  getUsers(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://172.16.4.89:9000/api/Admins/GetAllAdmins/${employeeId}`);
  }
  createUser(data: any): Observable<Admin> {
    return this.http.post<Admin>('http://172.16.4.89:9000/api/Admins/AddAdmin', data);
  }

  updateUser(id: number, user: UpdateAdmin): Observable<UpdateAdmin> {
    return this.http.put<UpdateAdmin>(`http://172.16.4.89:9000/api/Admins/UpdateAdmin/${id}`, user);
  }
}
