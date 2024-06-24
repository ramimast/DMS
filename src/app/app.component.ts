import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { ItemsComponent } from './Components/items/items.component';
import { AdvancedSearchPopupComponent } from './Components/advanced-search-popup/advanced-search-popup.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { PurchaseComponent } from './Components/purchase/purchase.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { SalesComponent } from './Components/sales/sales.component';
import { TaxesComponent } from './Components/taxes/taxes.component';
import { WarehousesComponent } from './Components/warehouses/warehouses.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { ItemMastersComponent } from './Components/item-masters/item-masters.component';
import { InventoryadjustmentsComponent } from './Components/inventoryadjustments/inventoryadjustments.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { VendorsComponent } from './Components/vendors/vendors.component';
import { PurchasesorderComponent } from './Components/purchasesorder/purchasesorder.component';
import { BillsComponent } from './Components/bills/bills.component';
import { VendorcreditsComponent } from './Components/vendorcredits/vendorcredits.component';
import { SaleorderComponent } from './Components/saleorder/saleorder.component';
import { InvoicesComponent } from './Components/invoices/invoices.component';
import { CreditnotesComponent } from './Components/creditnotes/creditnotes.component';
import { FooterComponent } from './Components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,VendorsComponent,PurchasesorderComponent,FooterComponent,InvoicesComponent,CreditnotesComponent,SaleorderComponent,BillsComponent,VendorcreditsComponent,InventoryComponent,AdvancedSearchPopupComponent,InventoryadjustmentsComponent,ItemsComponent,CommonModule,RouterModule,SidenavComponent,PaymentComponent,PurchaseComponent,ReportsComponent,SalesComponent,TaxesComponent,WarehousesComponent,SettingsComponent,ItemMastersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
