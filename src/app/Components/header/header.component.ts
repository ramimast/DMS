import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdvancedSearchPopupComponent } from '../advanced-search-popup/advanced-search-popup.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,AdvancedSearchPopupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchTerm: string = '';
  showList: boolean = false;
  showAdvancedSearchPopup = false;
  selectedItem: any;
  activeItems: Set<any> = new Set();
  searchItems: string[] = [
    'Customers', 'Items', 'Inventory Adjustments', 'Banking', 'Estimates',
    'Sales Orders', 'Delivery Challans', 'Invoices', 'Credit Notes', 'Vendors',
    'Expenses', 'Purchase Orders', 'Bills', 'Vendor Credits', 'Chart of Accounts',
    'Documents', 'Tasks'
  ];
  filteredItems: string[] = [];

  constructor() {
    this.filteredItems = this.searchItems;
  }

  onSearch() {
    console.log('Search term:', this.searchTerm);
    this.filterItems();
  }

  toggleList() {
    this.showList = !this.showList;
  }

  filterItems() {
    debugger
    if (this.searchTerm) {
      this.filteredItems = this.searchItems.filter(item =>
        item.toLowerCase().includes(this.searchTerm.toLowerCase()) && item !== this.selectedItem
      );
    } else {
      this.filteredItems = this.searchItems.filter(item => item !== this.selectedItem);
    }
  }
  selectItem(item: string) {
    this.searchTerm = '';
    this.selectedItem = item;
    this.showList = false;
  } 
  openAdvancedSearchPopup() {
    this.showAdvancedSearchPopup = true;
  }

  closeAdvancedSearchPopup() {
    this.showAdvancedSearchPopup = false;
  }
}
