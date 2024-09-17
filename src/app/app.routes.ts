import { Route, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminDasboardComponent } from './pages/admin-dasboard/admin-dasboard.component';
import { UserDasboardComponent } from './pages/user-dasboard/user-dasboard.component';
import { IncidentCreateFormComponentComponent } from './components/incident-create-form-component/incident-create-form-component.component';
import { NotificationComponentComponent } from './components/notification-component/notification-component.component';
import { UserManageComponent } from './pages/user-manage/user-manage.component';
import { ViewIncidentDataComponent } from './pages/view-incident-data/view-incident-data.component';
import { EditIncidentDataComponent } from './pages/edit-incident-data/edit-incident-data.component';
import { FirstLoginContentComponent } from './components/first-login-content/first-login-content.component';
import { MsalGuard } from '@azure/msal-angular';
import { roleGuard } from './role.guard';

export const appRoutes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'admin', component: AdminDasboardComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['Admin-Incidents', 'SuperAdmin'] } },
    { path: 'user', component: UserDasboardComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['user', 'Admin-Incidents','Admins-User', 'SuperAdmin'] } },
    { path: 'create-incident', component: IncidentCreateFormComponentComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['user', 'Admin-Incidents','Admins-User', 'SuperAdmin'] } },
    { path: 'view-incident', component: ViewIncidentDataComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['user', 'Admin-Incidents','Admins-User', 'SuperAdmin'] } },
    { path: 'edit-incident', component: EditIncidentDataComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['user','Admins-User', 'Admin-Incidents', 'SuperAdmin'] } },
    { path: 'usermanage', component: UserManageComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['Admins-User', 'SuperAdmin'] } },
    { path: 'initial-page', component: FirstLoginContentComponent },
    { path: 'noti', component: NotificationComponentComponent },
  ];
