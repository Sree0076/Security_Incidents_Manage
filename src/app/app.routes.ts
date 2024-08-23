import { Route } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminDasboardComponent } from './pages/admin-dasboard/admin-dasboard.component';
import { UserDasboardComponent } from './pages/user-dasboard/user-dasboard.component';
import { IncidentCreateFormComponentComponent } from './components/incident-create-form-component/incident-create-form-component.component';

import { NotificationComponentComponent } from './components/notification-component/notification-component.component';
import { FirstLoginContentComponent } from './components/first-login-content/first-login-content.component';
import { ViewIncidentFormComponent } from './components/view-incident-form/view-incident-form.component';

export const appRoutes: Route[] = [
  { path: '', component: LoginPageComponent },
  { path: 'admin', component: AdminDasboardComponent },
  { path: 'user', component: UserDasboardComponent },
  { path: 'form', component: IncidentCreateFormComponentComponent },
  { path: 'noti', component: NotificationComponentComponent },
  { path: 'initial-page', component: FirstLoginContentComponent },
  { path: 'view-incident', component: ViewIncidentFormComponent },
];
