import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchPopupComponent } from './advanced-search-popup.component';

describe('AdvancedSearchPopupComponent', () => {
  let component: AdvancedSearchPopupComponent;
  let fixture: ComponentFixture<AdvancedSearchPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSearchPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancedSearchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
