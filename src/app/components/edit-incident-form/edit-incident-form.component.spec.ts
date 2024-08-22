import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditIncidentFormComponent } from './edit-incident-form.component';

describe('EditIncidentFormComponent', () => {
  let component: EditIncidentFormComponent;
  let fixture: ComponentFixture<EditIncidentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIncidentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditIncidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
