import { Routes } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { ItemMastersComponent } from './Components/item-masters/item-masters.component';
import { InventoryadjustmentsComponent } from './Components/inventoryadjustments/inventoryadjustments.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { PurchaseComponent } from './Components/purchase/purchase.component';
import { VendorsComponent } from './Components/vendors/vendors.component';
import { PurchasesorderComponent } from './Components/purchasesorder/purchasesorder.component';
import { BillsComponent } from './Components/bills/bills.component';
import { VendorcreditsComponent } from './Components/vendorcredits/vendorcredits.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { SaleorderComponent } from './Components/saleorder/saleorder.component';
import { InvoicesComponent } from './Components/invoices/invoices.component';
import { CreditnotesComponent } from './Components/creditnotes/creditnotes.component';
import { WarehousesComponent } from './Components/warehouses/warehouses.component';
import { TaxesComponent } from './Components/taxes/taxes.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { AdminlayoutComponent } from './Components/adminlayout/adminlayout.component';
import { ItemsComponent } from './Components/items/items.component';
export const routes: Routes = [
  {
    path:'',component:AdminlayoutComponent,
    children: [
    { path: 'item-masters', component: ItemMastersComponent },
    {path:'inventoryadjustments',component:InventoryadjustmentsComponent},
    {path:'inventory',component:InventoryComponent},
    {path:'purchase',component:PurchaseComponent},
    {path:'vendors',component:VendorsComponent},
    {path:'purchasesorder',component:PurchasesorderComponent},
    {path:'bills',component:BillsComponent},
    {path:'vendorcredits',component:VendorcreditsComponent},
    {path:'customer',component:CustomerComponent},
    {path:'saleorder',component:SaleorderComponent},
    {path:'invoices',component:InvoicesComponent},
    {path:'creditnotes',component:CreditnotesComponent},
    {path:'warehouses',component:WarehousesComponent},
    {path:'taxes',component:TaxesComponent},
    {path:'reports',component:ReportsComponent},
    {path:'payment',component:PaymentComponent},
    {path:'settings',component:SettingsComponent},
    {path:'items',component:ItemsComponent}
  ]
  }


];
