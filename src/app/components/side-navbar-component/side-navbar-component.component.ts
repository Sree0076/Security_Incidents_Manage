import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSharedService } from '../../services/shared/employee/employee.shared.service';
import { Employee } from '../../models/employee-interface';
import { BadgeModule } from 'primeng/badge';
import { AuthServiceService } from 'src/app/services/Authentication/auth.service.service';
import { NotificationComponentComponent, notifications } from '../notification-component/notification-component.component';
import { VariablesSharedService } from 'src/app/services/shared/sharedVariables/variables.shared.service';
import { SidebarModule } from 'primeng/sidebar';
import { Router } from '@angular/router';
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
import { TableTruncatePipe } from "../../pipes/table/table-truncate.pipe";
import { IncidentServiceService } from 'src/app/services/incident/incident.service.service';

@Component({
  selector: 'app-side-navbar-component',
  standalone: true,
  imports: [CommonModule, BadgeModule, NotificationComponentComponent, SidebarModule, TableTruncatePipe],
  templateUrl: './side-navbar-component.component.html',
  styleUrl: './side-navbar-component.component.css',
})
export class SideNavbarComponentComponent implements OnInit {
  constructor(private employeeService : EmployeeSharedService, private authService : AuthServiceService,  private router : Router, private incidentService : IncidentSharedService )   {}

  @Output() sidebarToggle = new EventEmitter<boolean>();
  isExpanded = false;
  employeeData: Employee | null = null;
  isNotificationView=false;
  isAdmin=false;
  isViewDashboard = true;
  notificationCount!: number ;
  ngOnInit() {
    this.getEmployeeData();
    this.isAdmin = this.router.url.includes('admin');
    if (this.employeeData?.role.permission.userManagement && 
      !this.employeeData?.role.permission.incidentManagement && 
      this.router.url.includes('usermanage')) {
    this.isViewDashboard = false;
  }
  if(this.employeeData)
  {
    this.incidentService.getNotificationCount(this.employeeData.id);
    this.incidentService.unReadNotificationsCount$.subscribe(
      (count: number) => {
        this.notificationCount = count;
      }
    );
  }
  
  }


  toggleSidebar() {
    
    const sidebar = document.querySelector('.sidebar');
    const nav = document.querySelector('nav');
    if (sidebar) {
      console.log("open");
      sidebar.classList.toggle('open');
      this.menuBtnChange();
    }
    if (nav) {
      nav.classList.toggle('open');
    }
    this.isExpanded = !this.isExpanded;
    this.sidebarToggle.emit(this.isExpanded);
  }

  menuBtnChange() {
    const closeBtn = document.querySelector('#btn');
    if(closeBtn)
      {
        if (closeBtn && document.querySelector('.sidebar')?.classList.contains('open')) {
          closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
        } else {
    
          closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
        }
      }
    }

    getEmployeeData()
    {
      this.employeeService.employeeData.subscribe(data => {
        if (data) {
          this.employeeData=data;
        }
      });
    }
   log_out()
   {
    this.authService.logout();
   }
   openNotification() {
   this.isNotificationView=true;
  }
  usermanage() {
    this.router.navigate(['/usermanage']);
    }

  navigateToDashboard()
  {
    if(this.employeeData?.role.name==='user')
    {
      this.router.navigate(['/user']);  
    }
    else{
      this.router.navigate(['/admin']); 
    }
  }

  async switchUser()
  {
    if(this.employeeData?.role.permission.incidentManagement )
    {
      if(this.router.url.includes('admin') )
      {
        await this.incidentService.fetchIncidentData(true)
        this.router.navigate(['/user']); 
      }
      else{
        await this.incidentService.fetchIncidentData(false)
        this.router.navigate(['/admin']); 
      }
    }
    else if(this.employeeData?.role.permission.userManagement)
    {
      if(this.router.url.includes('usermanage') )
        {
          await this.incidentService.fetchIncidentData(true)
          this.router.navigate(['/user']); 
        }
        else{
          await this.incidentService.fetchIncidentData(false)
          this.router.navigate(['/usermanage']); 
        }
    }
  }
}
