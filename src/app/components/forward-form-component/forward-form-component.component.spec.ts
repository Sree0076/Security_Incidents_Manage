import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForwardFormComponentComponent } from './forward-form-component.component';

describe('ForwardFormComponentComponent', () => {
  let component: ForwardFormComponentComponent;
  let fixture: ComponentFixture<ForwardFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForwardFormComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForwardFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
