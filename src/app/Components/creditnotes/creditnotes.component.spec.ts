import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditnotesComponent } from './creditnotes.component';

describe('CreditnotesComponent', () => {
  let component: CreditnotesComponent;
  let fixture: ComponentFixture<CreditnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditnotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
