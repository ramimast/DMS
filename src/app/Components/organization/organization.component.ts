import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent {

  private offcanvasService = inject(NgbOffcanvas);
  closeOrganization(): void {
    this.offcanvasService.dismiss();
  }
}
