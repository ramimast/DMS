import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchTerm: string = '';
  showList: boolean = false;
  searchItems: string[] = ['Customers','Items','Inventory Adjustments','Banking','Estimates','Sales Orders','Delivery Challans','Invoices','Credit Notes','Vendors','Expenses','Purchase Orders','Bills','Vendor Credits','Chart of Accounts','Documents','Tasks'];
  filteredItems: string[] = [];
  constructor() {
    this.filteredItems = this.searchItems; // Initialize with all items
  }
  onSearch() {
    console.log('Search term:', this.searchTerm); 
  }
  toggleList() {
    this.showList = !this.showList;
  }

  filterItems() {
    if (this.searchTerm) {
      this.filteredItems = this.searchItems.filter(item =>
        item.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredItems = this.searchItems;
    }
  }
  selectItem(item: string) {
    this.searchTerm = item;
    this.showList = false;
  }
}
