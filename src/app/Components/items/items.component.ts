import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  itemForm!: FormGroup;
  selectedItem: string | undefined;
  selectedSalesItem: string | undefined;
  showMore: boolean = false;
  selectedPurchaseItem: string | undefined;
  taxes: string[] = [
    'SGST [5%]',
    'CGST [5%]',
    'GST [7%]',
    'IGST [12%]',
    'VAT [10%]',
    'Tax Group 1 [15%]',
    'Tax Group 2 [20%]'
  ];
  sales: string[] = [
    'Discount',
    'General Income',
    'Interest Income',
    'Late Fee Income',
    'Other Charges',
    'Sales',
    'Shipping Charges'
  ];
  purchase: string[] = [
    'Audit Fees',
    'GST Filing Fee',
    'HR Related',
    'Interest on TDS',
    'Postage',
    'Digital Marketing'
  ];

  filteredItems: string[] = [];
  searchTerm: string = '';
  showList: boolean = false;

  filteredSalesItems: string[] = [];
  searchSalesTerm: string = '';
  showSalesDropdown: boolean = false;

  filteredPurchaseItems: string[] = [];
  searchPurchaseTerm: string = '';
  showPurchaseDropdown: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      searchTerm: new FormControl('', Validators.required),
      itemName: new FormControl('', Validators.required),
      sku: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      status: new FormControl('all'),
      taxes: new FormControl('', Validators.required),
      salesAccount: new FormControl('', Validators.required),
      purchaseAccount: new FormControl('', Validators.required),
      itemCode: new FormControl('')
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      console.log('Form Value', this.itemForm.value);
    }
  }

  onCancel() {
    this.router.navigate(['/advanced-search-popup']);
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
    this.itemForm.patchValue({ taxes: item });
    this.showList = false;
    this.filterItems();
  }

  onSearch() {
    this.filterItems();
  }

  filterItems() {
    if (this.searchTerm) {
      this.filteredItems = this.taxes.filter(tax =>
        tax.toLowerCase().includes(this.searchTerm.toLowerCase()) && tax !== this.selectedItem
      );
    } else {
      this.filteredItems = this.taxes.filter(tax => tax !== this.selectedItem);
    }
  }

  displaySalesList(force: boolean = true) {
    if (force || !this.showSalesDropdown) {
      this.showSalesDropdown = true;
      this.filterSalesItems();
    }
  }

  toggleSalesList() {
    this.showSalesDropdown = !this.showSalesDropdown;
    if (this.showSalesDropdown) {
      this.filterSalesItems();
    }
  }

  selectSalesItem(item: string) {
    debugger
    console.log('Selected sales item:', item);
    this.selectedSalesItem = item;
    this.itemForm.patchValue({ salesAccount: item });
    this.showSalesDropdown = false;
    this.filterSalesItems();
  }

  onSalesSearch() {
    console.log('fghjnkm')
    debugger
    this.filterSalesItems();
  }

  filterSalesItems() {
    debugger
    if (this.searchSalesTerm) {
      this.filteredSalesItems = this.sales.filter(sale =>
        sale.toLowerCase().includes(this.searchSalesTerm.toLowerCase()) && sale !== this.selectedSalesItem
      );
    } else {
      this.filteredSalesItems = this.sales.filter(sale => sale !== this.selectedSalesItem);
    }
  }

  displayPurchaseList(force: boolean = true) {
    if (force || !this.showPurchaseDropdown) {
      this.showPurchaseDropdown = true;
      this.filterPurchaseItems();
    }
  }

  togglePurchaseList() {
    this.showPurchaseDropdown = !this.showPurchaseDropdown;
    if (this.showPurchaseDropdown) {
      this.filterPurchaseItems();
    }
  }

  selectPurchaseItem(item: string) {
    console.log('Selected purchase item:', item);
    this.selectedPurchaseItem = item;
    this.itemForm.patchValue({ purchaseAccount: item });
    this.showPurchaseDropdown = false;
    this.filterPurchaseItems();
  }

  onPurchaseSearch() {
    this.filterPurchaseItems();
  }

  filterPurchaseItems() {
    if (this.searchPurchaseTerm) {
      this.filteredPurchaseItems = this.purchase.filter(purchase =>
        purchase.toLowerCase().includes(this.searchPurchaseTerm.toLowerCase()) && purchase !== this.selectedPurchaseItem
      );
    } else {
      this.filteredPurchaseItems = this.purchase.filter(purchase => purchase !== this.selectedPurchaseItem);
    }
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
