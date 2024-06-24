import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMastersComponent } from './item-masters.component';

describe('ItemMastersComponent', () => {
  let component: ItemMastersComponent;
  let fixture: ComponentFixture<ItemMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMastersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
