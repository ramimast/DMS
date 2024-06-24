import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorcreditsComponent } from './vendorcredits.component';

describe('VendorcreditsComponent', () => {
  let component: VendorcreditsComponent;
  let fixture: ComponentFixture<VendorcreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorcreditsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorcreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
