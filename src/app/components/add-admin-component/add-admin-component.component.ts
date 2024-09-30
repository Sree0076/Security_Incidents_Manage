/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForwardServiceService } from 'src/app/services/forwardForm/forward.service.service';
import { EmployeeServiceService } from 'src/app/services/employee/employee.service.service';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ForwardPipePipe } from '../../pipes/forward/forward-pipe.pipe';
import { VariablesSharedService } from 'src/app/services/shared/sharedVariables/variables.shared.service';
import { FilterPipe } from 'src/app/pipes/addadmin/filter.pipe';

interface userDetails {
  id: number;
  user_icon: string;
  name: string;
  department: string;
  designation: string;
  email: string;
}
@Component({
  selector: 'app-add-admin-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    ForwardPipePipe,
    FilterPipe,
  ],
  templateUrl: './add-admin-component.component.html',
  styleUrl: './add-admin-component.component.css',
})
export class AddAdminComponentComponent implements OnInit {
  breakpoints = {
    '1199px': '60vw',
    '900px': '70vw',
    '700px': '75vw',
    '595px': '90vw',
    '500px': '95vw',
    '460px': '99vw',
    '380px': '99vw',
  };
  visibility = false;
  forwardIncidentId = 0;
  user_details: any[] = [];
  searchTerm = '';
  selectedUser: any;
  selectedUsersId: number[] = [];
  message = '';
  checkboxes: { [key: string]: boolean } = {
    incidentManagement: false,
    adminManagement: false,
  };
  constructor(
    public forwardFormService: ForwardServiceService,
    private usermanagement: EmployeeServiceService,
    private addadminmodalService: VariablesSharedService
  ) {}
  isForwardform = false;
  ngOnInit(): void {
    this.addadminmodalService.addAdminModalVisible$.subscribe((visible) => {
      this.visibility = visible;
    });

    this.forwardFormService.getAllUsers(true).subscribe((data) => {
      this.user_details = data;
      console.log(data);
    });
  }

  addUser(user: userDetails) {
    this.selectedUser = user;
  }

  removeUser() {
    this.selectedUser = undefined;
  }

  add() {
    if (this.selectedUser) {
      const data = {
        employeeId: this.selectedUser.id,
        assignedBy: 2,
        isIncidentMangenet: this.checkboxes['incidentManagement'],
        isUserMangenet: this.checkboxes['adminManagement'],
        status: true,
      };
      console.log(data);

      this.usermanagement.createUser(data).subscribe((response) => {
        console.log('Admin added successfully', response);
        this.closeModal();
      });
    }
  }

  isAddButtonDisabled(): boolean {
    return !(
      this.selectedUser &&
      (this.checkboxes['incidentManagement'] ||
        this.checkboxes['adminManagement'])
    );
  }

  resetForm() {
    this.searchTerm = '';
    this.selectedUser = undefined;
    this.checkboxes = {
      incidentManagement: false,
      adminManagement: false,
    };
  }

  closeModal() {
    this.resetForm();
    this.visibility = false;
  }
}
