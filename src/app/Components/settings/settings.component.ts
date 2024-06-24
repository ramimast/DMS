import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  activeSection: string = 'organisation-profile';
  organisation = {
    name: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    taxInfo: '',
    address: ''
  };
  setActiveSection(section: string) {
    this.activeSection = section;
  }

  saveOrganisationDetails() {
    // Save organisation details logic here
    console.log(this.organisation);
  }
}
