
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IncidentServiceService } from 'src/app/services/incident/incident.service.service';
export interface notifications{
  title: any,
  message: any,
  Priority: any,
  timeAgo: string,
  isRead:boolean
}
@Component({
  selector: 'app-notification-component',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './notification-component.component.html',
  styleUrl: './notification-component.component.css',
})

export class NotificationComponentComponent implements OnInit {

  constructor(private notificationService:IncidentServiceService)
  {}
  @Input() notificationVisible = false;

  allNotifications: notifications[] = [];

  isClearingAll = false;


  get unreadNotifications() {
    return this.allNotifications.filter(notification => !notification.isRead);
  }

  get allNotificationsWithoutUnread() {
    return this.allNotifications.filter(notification => notification.isRead);
  }

  clearAllUnread() {
    this.isClearingAll = true;
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
    notification.isRead = true;
  }
  private bootstrapCssUrl = '';
  ngOnInit(): void {
    this.addBootstrapCss();

    this.fetchNotifications();
 
  }
  fetchNotifications(): void {
    this.notificationService.getNotifications(1).subscribe((notifications: any[]) => {
      this.allNotifications = notifications.map(notification => {
        // Parse the message field into an object
        notification.message = JSON.parse(notification.message);
  
        // Return the modified notification object
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
}
