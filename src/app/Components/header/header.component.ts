import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetialsComponent } from '../user-detials/user-detials.component';
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../notifications/notifications.component';
import { LoginService } from '../../services/login.service';
import { OrganizationComponent } from '../organization/organization.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule, UserDetialsComponent, NgbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchTerm: string = '';
  showList: boolean = false;
  searchItems: string[] = ['Customers','Items','Inventory Adjustments','Banking','Estimates','Sales Orders','Delivery Challans','Invoices','Credit Notes','Vendors','Expenses','Purchase Orders','Bills','Vendor Credits','Chart of Accounts','Documents','Tasks'];
  filteredItems: string[] = [];
  constructor(private loginService: LoginService) {
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
  

  user: any;
  // constructor( ){}
ngOnInit(): void {

  this.loginService.getUser().subscribe((user) =>{
    if (user != null && user !== undefined){
      console.log("User is logged in");
      this.user = user.user_details;
    }else{
      console.log("No User Logged In")
      this.user="";
    }
  });
}
  private offcanvasService = inject(NgbOffcanvas);

	openUserDetials() {
		this.offcanvasService.open(UserDetialsComponent, { position: 'end',  panelClass: 'mt-5' });
	}

	openNotifications() {
		this.offcanvasService.open(NotificationsComponent, { position: 'end',  panelClass: 'mt-5' });
	}

  // isOpen = false;
	openOrganization() {
		this.offcanvasService.open(OrganizationComponent, { position: 'end',  panelClass: 'mt-5' });
    // this.isOpen = !this.isOpen;
	}


}
