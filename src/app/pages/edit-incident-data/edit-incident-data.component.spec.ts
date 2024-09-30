import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditIncidentDataComponent } from './edit-incident-data.component';

describe('EditIncidentDataComponent', () => {
  let component: EditIncidentDataComponent;
  let fixture: ComponentFixture<EditIncidentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIncidentDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditIncidentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
