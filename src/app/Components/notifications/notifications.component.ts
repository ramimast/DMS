import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

interface DropdownItem {
  label: string;
  value: any;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit{
  private offcanvasService = inject(NgbOffcanvas);
  closeNotifications(): void {
    this.offcanvasService.dismiss();
  }

  ngOnInit(): void {
    this.selectedItem = this.items[0];
  }
  items: DropdownItem[] = [
    { label: 'All', value: 'All' },
    { label: 'Unread', value: '' },
    { label: 'WorkFlow Rules', value: 'workFlow_rules' },
    { label: 'Mentions', value: 'mentions' },
    { label: 'Other Notifications', value: 'Other_notifications' }
  ];

  
  
  selectedItem: DropdownItem | null = null;

  selectItem(item: DropdownItem): void {
    this.selectedItem = item;
  }
}
