import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewIncidentDataComponent } from './view-incident-data.component';

describe('ViewIncidentDataComponent', () => {
  let component: ViewIncidentDataComponent;
  let fixture: ComponentFixture<ViewIncidentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewIncidentDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIncidentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
