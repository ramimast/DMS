import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, RouterLink],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent {

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
  selectedItem:any;
  
  constructor(private itemsSerivce: ItemsService, private router: Router) {
    this.filteredUnits = this.units;  // Initialize filteredItems with all items
    this.filteredIntraTaxRate = this.IntraTaxRate;  // Initialize filteredItems with all items
    this.filteredInterTaxRate = this.InterTaxRate;

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedItem = navigation.extras.state['selectedItem'];
      this.selectedUnits = this.selectedItem.unit;
      this.imagePreview = this.selectedItem.imageUrl;
      this.selectedIntraTaxRate = this.selectedItem.tax.intra_state_tax_rate
      this.selectedInterTaxRate = this.selectedItem.tax.inter_state_tax_rate
    }
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
    // debugger
    if(form.valid){
      this.selectedItem.unit = this.selectedUnits;
      this.selectedItem.imageUrl = this.imagePreview;
      
      this.selectedItem.tax.intra_state_tax_rate = this.selectedIntraTaxRate
      this.selectedItem.tax.inter_state_tax_rate = this.selectedInterTaxRate
      this.itemsSerivce.updateItem(this.selectedItem).subscribe(response => {
        console.log('Item updated:', response);
        this.router.navigate(['/item-details'], { state: { selectedItem: response } });
      });
      // this.router.navigate(['/item-details'], { state: { selectedItem: this.selectedItem } });
    }else{
      console.log("form is not valid");
    }
  }
}
