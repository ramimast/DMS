import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesorderComponent } from './purchasesorder.component';

describe('PurchasesorderComponent', () => {
  let component: PurchasesorderComponent;
  let fixture: ComponentFixture<PurchasesorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchasesorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
