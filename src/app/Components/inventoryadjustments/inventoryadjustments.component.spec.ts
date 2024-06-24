import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryadjustmentsComponent } from './inventoryadjustments.component';

describe('InventoryadjustmentsComponent', () => {
  let component: InventoryadjustmentsComponent;
  let fixture: ComponentFixture<InventoryadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryadjustmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
