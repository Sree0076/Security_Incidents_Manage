import { Route } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminDasboardComponent } from './pages/admin-dasboard/admin-dasboard.component';
import { UserDasboardComponent } from './pages/user-dasboard/user-dasboard.component';
import { IncidentCreateFormComponentComponent } from './components/incident-create-form-component/incident-create-form-component.component';
import { NotificationComponentComponent } from './components/notification-component/notification-component.component';
import { UserManageComponent } from './pages/user-manage/user-manage.component';
import { ViewIncidentDataComponent } from './pages/view-incident-data/view-incident-data.component';
import { EditIncidentDataComponent } from './pages/edit-incident-data/edit-incident-data.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { FirstLoginContentComponent } from './components/first-login-content/first-login-content.component';

export const appRoutes: Route[] = [
  { path: '', component: LoginPageComponent },
  { path: 'admin', component: AdminDasboardComponent },
  { path: 'user', component: UserDasboardComponent },
  { path: 'form', component: IncidentCreateFormComponentComponent },
  { path: 'noti', component: NotificationComponentComponent },
  { path: 'usermanage', component: UserManageComponent },
  { path: 'viewform', component: ViewIncidentDataComponent },
  { path: 'editform', component: EditIncidentDataComponent },
  { path: 'user-edit', component: EditFormComponent },
  { path: 'initial-page', component: FirstLoginContentComponent },
];
