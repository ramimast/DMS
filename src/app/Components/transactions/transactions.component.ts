import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

interface DropdownItem {
  label: string;
  value: any;
}
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

  ngOnInit(): void {
    this.selectedSortItems = this.sortItems[0];
    this.selectedFilterItem = this.filterItems[0];
  }
  filterItems: DropdownItem[] = [
    { label: 'Estimates', value: 'All' },
    { label: 'Sales Orders', value: '' },
    { label: 'Invoices', value: 'workFlow_rules' },
    { label: 'Delivery Challans', value: 'mentions' },
    { label: 'Credit Notes', value: 'mentions' },
    { label: 'Recurring Invoices', value: 'mentions' },
    { label: 'Purchase Orders', value: 'mentions' },
    { label: 'Bills', value: 'mentions' },
    { label: 'Vendor Credits', value: 'mentions' }
  ];

  selectedFilterItem: DropdownItem | null = null;

  selectFiletrItem(item: DropdownItem): void {
    this.selectedFilterItem = item;
  }

  sortItems: DropdownItem[] = [
    { label: 'All', value: 'All' },
    { label: 'Draft', value: '' },
    { label: 'Sent', value: 'workFlow_rules' },
    { label: 'Client Viewed', value: 'mentions' },
    { label: 'Accepted', value: 'mentions' },
    { label: 'Invoiced', value: 'mentions' },
    { label: 'Declined', value: 'mentions' },
    { label: 'Expired', value: 'mentions' }
  ];

  selectedSortItems: DropdownItem | null = null;

  selectSortItem(item: DropdownItem): void {
    this.selectedSortItems = item;
  }

}
