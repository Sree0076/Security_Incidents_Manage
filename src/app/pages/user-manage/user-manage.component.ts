/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin, UpdateAdmin } from 'src/app/models/user-manage-interface';
import { EmployeeServiceService } from 'src/app/services/employee/employee.service.service';
import { EmployeeSharedService } from 'src/app/services/shared/employee/employee.shared.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AddAdminComponentComponent } from 'src/app/components/add-admin-component/add-admin-component.component';
import { VariablesSharedService } from 'src/app/services/shared/sharedVariables/variables.shared.service';
import { SideNavbarComponentComponent } from "../../components/side-navbar-component/side-navbar-component.component";
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
@Component({
  selector: 'app-user-manage',
  standalone: true,
  providers:[ConfirmationService,MessageService],
  imports: [FormsModule, CommonModule, ConfirmDialogModule,
    ToastModule, AddAdminComponentComponent, SideNavbarComponentComponent],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css',
})
export class UserManageComponent implements OnInit {
  isViewAddAdminModal=false;
  users: Admin[] = [];
  filteredUsers: Admin[] = [];
  nameFilter= '';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';
  isSidebarExpanded = false;

  handleSidebarToggle(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
  constructor(
    private userManagementService: EmployeeServiceService,
    private SignalRService : IncidentSharedService,
    private employeeDataService: EmployeeSharedService,
    private confirmationService: ConfirmationService,
     private messageService: MessageService,
     private addadminmodalService: VariablesSharedService,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.employeeDataService.employeeData.subscribe((employee) => {
      console.log(employee);
      if (employee) {
        this.userManagementService.getUsers(employee.id).subscribe((users) => {
          this.users = users;
          this.filteredUsers = users;
        });
      }
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.employeeName.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
        (this.statusFilter === 'all' ||
          (this.statusFilter === 'active' && user.status) ||
          (this.statusFilter === 'inactive' && !user.status))
    );
  }

  toggleStatus(user: Admin): void {
    if (user.isEditing) {
      user.status = !user.status;
    }
  }
  
  saveUser(user: Admin): void {
    user.isEditing = false;
    const adminData: UpdateAdmin = {
      adminId: user.adminId,
      isIncidentMangenet: user.isIncidentMangenet,
      isUserMangenet: user.isUserMangenet,
      status: user.status,
    };

    this.userManagementService.updateUser(user.adminId, adminData).subscribe(
      (updatedUser) => {
          this.showSuccess("Admin data updated Succesfully");
          this.filterUsers();

          console.log('Updated user:', JSON.stringify(updatedUser, null, 2));
        }
    );
  }

  editUser(user: Admin): void {
    user.isEditing = true;
  }
  cancelEdit(user: Admin)
  {
    user.isEditing = false;
  }

  onApproval(user: Admin ) {

    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {

       this.saveUser(user);
      },
      reject: () => {
      }
  });
  }
  showSuccess(message: string) {
    console.log(message);
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${message}`,
      });
      setTimeout(() => {
         this.fetchUsers();
      }, 2000);
    }, 100);
  }

  showDialog() {
    this.isViewAddAdminModal = true; 
    this.addadminmodalService.showAddAdminModal();
  }

}
