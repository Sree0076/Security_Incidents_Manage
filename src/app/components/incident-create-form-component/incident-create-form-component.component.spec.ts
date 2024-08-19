import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentCreateFormComponentComponent } from './incident-create-form-component.component';

describe('IncidentCreateFormComponentComponent', () => {
  let component: IncidentCreateFormComponentComponent;
  let fixture: ComponentFixture<IncidentCreateFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentCreateFormComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentCreateFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
