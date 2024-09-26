import { Injectable, Inject, OnDestroy } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  PopupRequest,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { lastValueFrom, Subject } from 'rxjs';
import { filter, takeUntil, tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EmployeeSharedService } from '../shared/employee/employee.shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService implements OnDestroy {
  private readonly _destroying$ = new Subject<void>();
  role = '';

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private employeeService: EmployeeSharedService
  ) {
    this.initialize();
  }

  // Initialization
  private initialize() {
    this.setupAuthListeners();
    this.handleRedirect();
  }

  private setupAuthListeners() {
    this.authService.handleRedirectObservable().subscribe();

    this.authService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe(() => {
        this.handleAccountChange();
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  private handleRedirect() {
    // Handle redirects after login
    this.authService.handleRedirectObservable().subscribe();
  }

  // Auth Handling
  private handleAccountChange() {
    if (this.authService.instance.getAllAccounts().length === 0) {
      window.location.pathname = '/';
    } else {
      this.setLoginDisplay();
    }
  }

  private setLoginDisplay() {
    const isLoggedIn = this.authService.instance.getAllAccounts().length > 0;
    if (isLoggedIn) {
      this.redirectBasedOnRole();
    }
  }

  private checkAndSetActiveAccount() {
    const activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  async redirectBasedOnRole() {
    const account = this.authService.instance.getActiveAccount();

    if (account?.idToken) {
      try {
        await this.employeeService.fetchEmployeeData(account.idToken);
        await this.getRoles();
        await this.handleRedirection();
      } catch (error) {
        console.error('Error during role redirection:', error);
      }
    }
  }

  private async handleRedirection() {
    if(!this.router.url.includes('usermanage'))
    {
      if (this.role === 'Admin-Incidents' || this.role === 'SuperAdmin' ) {
        this.router.navigate(['/admin']);
      } else if (this.role === 'user') {
        this.router.navigate(['/user']);
      }
      else if (this.role === 'Admins-User') {
        this.router.navigate(['/usermanage']);
      }
    }
  }

  loginPopup() {
    const loginObservable = this.msalGuardConfig.authRequest
      ? this.authService.loginPopup({
          ...this.msalGuardConfig.authRequest,
        } as PopupRequest)
      : this.authService.loginPopup();

    loginObservable.subscribe({
      next: (response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
        this.redirectBasedOnRole();
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }

  logout() {
    this.authService.logoutPopup({
      mainWindowRedirectUri: '/',
    });
    localStorage.removeItem('accessToken');
  }

  // Role Management
  async getRoles(): Promise<void> {
    await lastValueFrom(
      this.employeeService.employeeData.pipe(
        tap((data) => {
          if (data) {
            console.log(data);
            this.role = data.role.name;
          }
        }),
        take(1)
      )
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    );
  }

  // Cleanup
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
