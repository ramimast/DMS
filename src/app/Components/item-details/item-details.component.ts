import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemOverviewComponent } from '../item-overview/item-overview.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { HistoryComponent } from '../history/history.component';

interface DropdownItem {
  label: string;
  value: any;
}

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [NgbModule, CommonModule, FormsModule, RouterLink, NgbTooltipModule, ItemOverviewComponent, TransactionsComponent, HistoryComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {
  selectedItem: any;
  constructor(private itemsService: ItemsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
    this.selectedItemfilter = this.items[0];
    // localStorage.removeItem('selectedItem');
    
    this.itemsService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
      console.log('Received selected item:', this.selectedItem);  // Debugging log
    });
  }

  data: any[] = [];
  filteredData: any[] = [];
  paginatedData: any[] = [];
  itemsPerPage: number = 25;
  currentPage: number = 1;
  pageSizes: number[] = [10, 25, 50, 100, 200];
  totalItemsVisible: boolean = false;

  selectedItemfilter: DropdownItem | null = null;
  items: DropdownItem[] = [
    { label: 'All Items', value: 'All' },
    { label: 'Active Items', value: 'Active' },
    { label: 'Inactive Items', value: 'Inactive' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Purchases', value: 'Purchases' },
    { label: 'Services', value: 'Services' },
    { label: 'Inventory Items', value: 'Inventory Items' },
    { label: 'Non-inventory Items', value: 'Non-inventory Items' },
  ];



  fetchData(): void {
    this.itemsService.fetchData().subscribe((data) => {
      console.log('Fetched data:', data);  // Debugging log
      this.data = Array.isArray(data) ? data : [];
      console.log('Assigned data:', this.data);  // Debugging log
      this.filterData();
      this.updatePaginatedData();
    });
  }

  onDropdownChange(): void {
    this.filterData();
    this.updatePaginatedData();
  }

  filterData(): void {
    console.log('Filtering data:', this.data);  // Debugging log
    if (this.selectedItemfilter?.value === 'All') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter(item =>
        item.Status === this.selectedItemfilter?.value || item.Category === this.selectedItemfilter?.value
      );
    }
  }

  updatePaginatedData(): void {
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = this.currentPage * this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startItem, endItem);
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  onItemsPerPageChange(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  getPages(): { page: number, range: string }[] {
    const totalPages = this.getTotalPages();
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
    return [{ page: this.currentPage, range: `${startItem}-${endItem}` }];
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  getTotalItems(): number {
    return this.filteredData.length;
  }

  onRowClick(item: any) {
    this.itemsService.setSelectedItem(item);
    // console.log('Item clicked:', item);
    // this.router.navigateByUrl('item-details');
  }

  unselectedname(){
    // this.selectedName = false;
    this.router.navigate(['/items']);
    localStorage.removeItem('selectedItem');
  }

  activeTab = 'tab1';
  
  changeTab(tab: string): void {
    this.activeTab = tab;
  }
  

  goToEditItem(){
    this.router.navigate(['/edit-item'], { state: { selectedItem: this.selectedItem } });
  }
// <div *ngIf="selectedItem">
// <h1>{{selectedItem.name}}</h1>
// </div>


}
