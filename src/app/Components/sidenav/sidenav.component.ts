import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  constructor(private router: Router) { }
  subMenuState: { [key: string]: boolean } = {};
  isClosed = false;
  expandedMenu: string | null = null;

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }

  toggleSubMenu(menu: string) {
    this.expandedMenu = (this.expandedMenu === menu) ? null : menu;
  }
  navigateToItemsPage() {
    this.router.navigate(['/item-masters']);
  }
  navigateToInventoryPage() {
    this.router.navigate(['/inventoryadjustments'])
  }
  navigateToInventory() {
    this.router.navigate(['/inventory'])
  }
  navigateToVendors() {
    this.router.navigate(['/vendors'])
  }
  navigatePurchaseOrders() {
    this.router.navigate(['/purchasesorder'])
  }
  navigateBills() {
    this.router.navigate(['/bills'])
  }
  navigateVendorCredits() {
    this.router.navigate(['/vendorcredits'])
  }
  navigateCustomer(){
    this.router.navigate(['/customer'])
  }
  navigateSaleorder(){
    this.router.navigate(['/saleorder'])
  }
  navigateInvoices(){
    this.router.navigate(['/invoices'])
  }
  navigateCreditnotes(){
    this.router.navigate(['/creditnotes'])
  }
  navigateWarehouses(){
    this.router.navigate(['/warehouses'])
  }
  navigateTaxes(){
    this.router.navigate(['/taxes'])
  }
  navigateReports(){
    this.router.navigate(['/reports'])
  }
  naviagatePaymenets(){
    this.router.navigate(['/payment'])
  }
  navigateSettings(){
    this.router.navigate(['/settings'])
  }
}