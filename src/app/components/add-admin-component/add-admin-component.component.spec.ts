import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAdminComponentComponent } from './add-admin-component.component';

describe('AddAdminComponentComponent', () => {
  let component: AddAdminComponentComponent;
  let fixture: ComponentFixture<AddAdminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAdminComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
