import { Component, EventEmitter, Output, TemplateRef, inject } from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-detials',
  standalone: true,
  imports: [],
  templateUrl: './user-detials.component.html',
  styleUrl: './user-detials.component.scss'
})
export class UserDetialsComponent {
  // @Output() closeEvent = new EventEmitter<void>();
  user: any;
  constructor( private loginService: LoginService){}
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

  userDetailsClose(): void {
    this.offcanvasService.dismiss();
  }

  // private modalService = inject(NgbModal);
  
  // ChangePassword(changePasswordContent: TemplateRef<any>) {
	// 	this.modalService.open(changePasswordContent, { windowClass: 'dark-modal' });
	// }
  ChangePassword() {
	}

  logout() {
    this.loginService.logout().subscribe(
      () => {
        // window.location.reload();
      },
      (err) => {
        alert(`Logging out failed: ${err.message}`);
      }
    );
  }


}
