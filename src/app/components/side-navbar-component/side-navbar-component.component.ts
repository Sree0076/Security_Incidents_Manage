import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSharedService } from '../../services/shared/employee/employee.shared.service';
import { Employee } from '../../models/employee-interface';
import { BadgeModule } from 'primeng/badge';
import { AuthServiceService } from 'src/app/services/Authentication/auth.service.service';
import { NotificationComponentComponent } from '../notification-component/notification-component.component';
import { VariablesSharedService } from 'src/app/services/shared/sharedVariables/variables.shared.service';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-side-navbar-component',
  standalone: true,
  imports: [CommonModule,BadgeModule,NotificationComponentComponent,SidebarModule],
  templateUrl: './side-navbar-component.component.html',
  styleUrl: './side-navbar-component.component.css',
})
export class SideNavbarComponentComponent implements OnInit {
  constructor(private employeeService : EmployeeSharedService, private authService : AuthServiceService, private notificationService : VariablesSharedService,)   {}

  @Output() sidebarToggle = new EventEmitter<boolean>();
  isExpanded = false;
  employeeData: Employee | null = null;
isnoti=false;
  ngOnInit() {
   this.getEmployeeData();
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
   this.isnoti=true;
  }
}
