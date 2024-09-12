/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesSharedService {
  private sidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  sidebarVisible$ = this.sidebarVisibleSubject.asObservable();
  private notificationVisibleSubject = new BehaviorSubject<boolean>(false);
  notificationVisible$ = this.sidebarVisibleSubject.asObservable();
  private addAdminModalSubject = new BehaviorSubject<boolean>(false);
  addAdminModalVisible$ = this.addAdminModalSubject.asObservable();
  constructor() { }

  showSidebar(): void {
    this.sidebarVisibleSubject.next(true);
  }

  hideSidebar(): void {
    this.sidebarVisibleSubject.next(false);
  }

  showNotification(): void {
    this.notificationVisibleSubject.next(true);
  }

  showAddAdminModal(): void {
    this.addAdminModalSubject.next(true);
  }

}
