
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IncidentServiceService } from 'src/app/services/incident/incident.service.service';
import { EmployeeSharedService } from 'src/app/services/shared/employee/employee.shared.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
export interface notifications{
  id:number,
  title: any,
  message: any,
  Priority: any,
  timeAgo: string,
  isRead:boolean,
  createdAt: string,
}
@Component({
  selector: 'app-notification-component',
  standalone: true,
  imports: [CommonModule,ButtonModule,ProgressSpinnerModule],
  templateUrl: './notification-component.component.html',
  styleUrl: './notification-component.component.css',
})

export class NotificationComponentComponent implements OnInit {

  constructor(private notificationService:IncidentServiceService, private employeeService : EmployeeSharedService, private incidentService : IncidentSharedService )
  {}
  @Input() notificationVisible = false;
  employeeId !: number;
  allNotifications: notifications[] = [];
  isClearingAll = false;

  get unreadNotifications() {
    return this.allNotifications.filter(notification => !notification.isRead);
  }

  get allNotificationsWithoutUnread() {
    return this.allNotifications.filter(notification => notification.isRead);
  }

  clearAllUnread() {
    this.notificationService.clearNotification(this.employeeId).subscribe((response)=>{
      console.log(response);
      this.incidentService.getNotificationCount(this.employeeId);
      this.fetchNotifications();
      });
  }

  onAnimationEnd(notification: notifications, index: number) {
    if (this.isClearingAll) {
      this.unreadNotifications.forEach(notification => notification.isRead = true);
      if (index === this.unreadNotifications.length - 1) {
        this.isClearingAll = false;
      }
    }
  }

  markAsRead(notification: notifications) {
    this.onAnimationEnd(notification,1);
    this.notificationService.readNotification(this.employeeId,notification.id).subscribe((response)=>{
    this.incidentService.getNotificationCount(this.employeeId);
    this.fetchNotifications();
    });
  }

  private bootstrapCssUrl = '';
  ngOnInit(): void {
   this.employeeService.employeeData.subscribe((data)=>{
    if(data)
    {
      this.employeeId = data.id
    }
   });
    this.addBootstrapCss();

    this.fetchNotifications();
 
  }
  fetchNotifications(): void {
    this.notificationService.getNotifications(this.employeeId).subscribe((notifications: any[]) => {
      this.allNotifications = notifications.map(notification => {
        notification.message = JSON.parse(notification.message);
        return notification;
      });
      console.log(this.allNotifications);
    });
  }
  
  private addBootstrapCss(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = this.bootstrapCssUrl;
    link.integrity = 'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  getTimeDifference(time : string): string {
    const now = new Date();
    const past = new Date(time);
    const timeDiff = now.getTime() - past.getTime();
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    let timeDiffString = '';
  
    if (days > 0) {
      timeDiffString = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      timeDiffString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      timeDiffString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds > 0) {
      timeDiffString = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }    
  
    return timeDiffString || "just now";
  }
}
