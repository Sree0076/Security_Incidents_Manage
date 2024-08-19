import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavbarComponentComponent } from './side-navbar-component.component';

describe('SideNavbarComponentComponent', () => {
  let component: SideNavbarComponentComponent;
  let fixture: ComponentFixture<SideNavbarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavbarComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavbarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
