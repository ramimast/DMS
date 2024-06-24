import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, RouterLink],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss'
})
export class NewItemComponent {

  // formData = {
  //   name: '',
  //   email: ''
  // };

  // onsubmit() {
  //   console.log('Form Submitted!', this.formData);
  //   // Here you can handle form submission, e.g., send data to a server
  // }
  // constructor(){}

  isSalesInfoChecked: boolean = true; // Checkbox is checked by default
  salesPrice: string = '' ;
  minimumOrderQuantitySales:string = '' ;

  isPurchaseInfoChecked:boolean = true;
  purchasePrice: string = '';
  mrpPrice: string = '';
  minimumOrderQuantityPurchase!:number;

  isInventoryInfoChecked:boolean = true;
  triggerQty:string = '';
  maxQty:string = '';
  minQty:string = '';

  name: string = '';
  aliasDetail: string = '';
  category: string = '';
  subCategory: string = '';
  sku: string = '';
  hsnCode: string = '';
  // units:string = '';
  // imageUrl: string = '';
  // isActive: boolean = false;

  toggleInput() {
    debugger
    // This function will be called when the checkbox is changed
    // No additional logic is needed here for enabling/disabling the input
  }

  productType: string = 'goods';
  TaxableType: string = 'taxable';
  units:string[] = [
    'box',
    'cm',
    'ft',
    'in',
    'g',
    'kg',
    'km',
    'lb',
    'mg',
    'm',
    'pcs',
    'sqft'
    // Add more items as needed
  ];
  
  selectedUnits: string = '';
  searchTermUnits: string = '';
  filteredUnits: string[] = this.units;
  
  constructor(private itemsSerivce: ItemsService) {
    this.filteredUnits = this.units;  // Initialize filteredItems with all items
    this.filteredIntraTaxRate = this.IntraTaxRate;  // Initialize filteredItems with all items
    this.filteredInterTaxRate = this.InterTaxRate;
  }

  filterUnits() {
    const searchTermLower = this.searchTermUnits.toLowerCase();
    this.filteredUnits = this.units.filter(unit =>
      unit.toLowerCase().includes(searchTermLower)
    );
  }

  selectUnit(unit: string) {
    this.selectedUnits = unit;
    // this.onDropdownChange();
  }


  IntraTaxRate: string[] = [
    'CSGST@18',
    'CSGST@28',
    'CSSG@18',
    'CSSG@28'  ];

  selectedIntraTaxRate: string = '';
  searchTermIntraTaxRate: string = '';
  filteredIntraTaxRate: string[] = this.IntraTaxRate;

  filterIntraTaxRate() {
    const searchTermLower = this.searchTermIntraTaxRate.toLowerCase();
    this.filteredIntraTaxRate = this.IntraTaxRate.filter(taxRate =>
      taxRate.toLowerCase().includes(searchTermLower)
    );
  }

  selectIntraTaxRate(taxRate: string) {
    this.selectedIntraTaxRate = taxRate;
    // this.onDropdownChange();
  }


  InterTaxRate: string[] = [
    'IGST@18',
    'IGST@28' ];

  selectedInterTaxRate: string = '';
  searchTermInterTaxRate: string = '';
  filteredInterTaxRate: string[] = this.InterTaxRate;

  filterInterTaxRate() {
    const searchTermLower = this.searchTermInterTaxRate.toLowerCase();
    this.filteredInterTaxRate = this.InterTaxRate.filter(taxRate =>
      taxRate.toLowerCase().includes(searchTermLower)
    );
  }

  selectInterTaxRate(taxRate: string) {
    this.selectedInterTaxRate = taxRate;
    // this.onDropdownChange();
  }

  // onDropdownChange() {
  //   // Your logic for handling the dropdown change
  // }
  @ViewChild('fileInput') fileInput!: ElementRef;
  imagePreview: any;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage(event: Event) {
    event.stopPropagation();
    this.imagePreview = null;
  }

  triggerFileInput(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.fileInput.nativeElement.click();
  }


  onInputChange(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  onSubmit(form:any) {
    debugger
    if(form.valid){
      console.log('onSubmit method called');
      const newItem = {
        name: this.name,
        alias_detail: this.aliasDetail,
        category: this.category,
        sub_category: this.subCategory,
        sku: this.sku,
        unit: this.selectedUnits,
        hsn: this.hsnCode,
        imageUrl: this.imagePreview,
        tax: {
          tax_preference: this.TaxableType,
          intra_state_tax_rate: this.selectedIntraTaxRate,
          inter_state_tax_rate: this.selectedInterTaxRate
        },
        purchase_info: {
          cost_Price: this.purchasePrice,
          Minimum_order_quantity: this.minimumOrderQuantityPurchase
        },
        sales_info: {
          mrp_price: this.mrpPrice,
          sales_price: this.salesPrice,
          Minimum_order_quantity: this.minimumOrderQuantitySales
        },
        inventory_info: {
          trigger_qty: this.triggerQty,
          max_qty: this.maxQty,
          min_qty: this.minQty
        }
      };
      this.itemsSerivce.addItem(newItem).subscribe(response => {
        console.log('Item added:', response);
      });
    }else{
      console.log("form is not valid");
    }
  }
}