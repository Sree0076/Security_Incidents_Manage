import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstLoginContentComponent } from './first-login-content.component';

describe('FirstLoginContentComponent', () => {
  let component: FirstLoginContentComponent;
  let fixture: ComponentFixture<FirstLoginContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstLoginContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FirstLoginContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
