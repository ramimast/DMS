import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ItemsComponent } from '../items/items.component';
@Component({
  selector: 'app-advanced-search-popup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet,ItemsComponent],
  templateUrl: './advanced-search-popup.component.html',
  styleUrls: ['./advanced-search-popup.component.scss']
})
export class AdvancedSearchPopupComponent {
  showList: boolean = false;
  searchTerm: string = '';
  selectedItem: string | undefined;
  itemList: string[] = [
    'Customers', 'Items', 'Inventory Adjustments',
    'Sales Orders', 'Invoices', 'Credit Notes', 'Vendors',
    'Purchase Orders', 'Bills', 'Vendor Credits', 'Chart of Accounts',
    'Documents', 'Tasks'
  ];
  filteredItems: string[] = [];

  @Output() closePopupEvent = new EventEmitter<boolean>();

  constructor(private router: Router) { }
  closePopup() {
    this.closePopupEvent.emit(true);
  }

  showItemList(force: boolean = true) {
    if (force || !this.showList) {
      this.showList = true;
      this.filterItems();
    }
  }

  toggleList() {
    this.showList = !this.showList;
    if (this.showList) {
      this.filterItems();
    }
  }

  selectItem(item: string) {
    console.log('Selected item:', item);
    this.selectedItem = item;
    this.searchTerm = item;
    this.showList = false;
    this.filterItems();
  }

  onSearch() {
    this.filterItems();
  }

  filterItems() {
    if (this.searchTerm) {
      this.filteredItems = this.itemList.filter(item =>
        item.toLowerCase().includes(this.searchTerm.toLowerCase()) && item !== this.selectedItem
      );
    } else {
      this.filteredItems = this.itemList.filter(item => item !== this.selectedItem);
    }
  }
}