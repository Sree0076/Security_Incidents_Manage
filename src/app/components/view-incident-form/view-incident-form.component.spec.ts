import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewIncidentFormComponent } from './view-incident-form.component';

describe('ViewIncidentFormComponent', () => {
  let component: ViewIncidentFormComponent;
  let fixture: ComponentFixture<ViewIncidentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewIncidentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIncidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
