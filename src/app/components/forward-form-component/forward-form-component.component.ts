/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentSharedService } from 'src/app/services/shared/incident/incident.shared.service';
import { Router } from '@angular/router';
import { ForwardServiceService } from 'src/app/services/forwardForm/forward.service.service';
import { ForwardPipePipe } from 'src/app/pipes/forward/forward-pipe.pipe';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-forward-form-component',
  standalone: true,
  imports: [
    CommonModule,
    ForwardPipePipe,
    DialogModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './forward-form-component.component.html',
  styleUrl: './forward-form-component.component.css',
})
export class ForwardFormComponentComponent implements OnInit {
  breakpoints = {
    '1199px': '60vw',
    '900px': '70vw',
    '700px': '75vw',
    '595px': '90vw',
    '500px': '95vw',
    '460px': '99vw',
    '380px': '99vw',
  };

  @Output() dialogClosed = new EventEmitter<void>();
  @Input() visibility = false;
  forwardIncidentId = 0;
  user_details: any[] = [];
  searchTerm = '';
  selectedUsers: any[] = [];

  selectedUsersId: number[] = [];
  message = '';

  constructor(
    public forwardFormService: ForwardServiceService,
    private incidentService: IncidentSharedService,
    private router: Router
  ) {}
  isForwardform = true;

  ngOnInit(): void {
    this.forwardFormService.getAllUsers(false).subscribe((data) => {
      this.user_details = data;
      console.log(data);
    });
    this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
      this.forwardIncidentId = incidentId;
    });
  }

  handleDialogClose() {
    this.dialogClosed.emit();
  }

  addUser(user: any) {
    if (!this.selectedUsers.find((u) => u.id === user.id)) {
      this.selectedUsers.push(user);
    }
  }

  // Remove user from the selected list
  removeUser(user: any) {
    this.selectedUsers = this.selectedUsers.filter((u) => u.id !== user.id);
  }

  getSelectedUserIds(): number[] {
    return this.selectedUsers.map((user) => user.id);
  }
    forward(): void{
      console.log(this.selectedUsers);
      console.log(this.message);
      this.forwardFormService.forwardIncident(this.forwardIncidentId,this.getSelectedUserIds(),this.message).subscribe((response) => {
        console.log('Incident forwarded successfully', response);
        this.router.navigate(['/admin']);
      });
    this.handleDialogClose();
    this.resetForm();
  }
  resetForm(): void {
    this.selectedUsers = [];
    this.searchTerm = '';
    this.message = '';
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the scroll height

    // Check if the textarea is empty, then reset the height to 1 line
    if (!textarea.value) {
      textarea.style.height = 'auto'; // Reset to auto first to ensure proper resizing
      textarea.rows = 1; // Reset the rows attribute to 1 line
    }
  }
}
