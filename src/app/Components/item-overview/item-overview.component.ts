import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-overview.component.html',
  styleUrl: './item-overview.component.scss'
})
export class ItemOverviewComponent implements OnInit{

  selectedItem:any;
  constructor(private itemsService: ItemsService){}

  ngOnInit(): void {
    this.itemsService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
      console.log('Received selected item:', this.selectedItem);  // Debugging log
    });
  }

}
