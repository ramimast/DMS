import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomValidators } from '../../custom-validators';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<any>;
  tfaForm!: FormGroup<any>;
  tfa: string = '';
  showtfaForm: boolean = false;
  showPopup:boolean = false;
  timer: number = 30; // Initial timer value in seconds
  timeFormat: string = '00:30';
  updateMessage:string = '';
  isResendDisabled: boolean = false;
  intervalId:any;
  
  hide = true;
  username:any;
  password:any;
  isLinkClicked = false;
  // isButtonEnabled = false; //

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService, private route : ActivatedRoute) {}
  
  
  // private isAuthenticated: boolean = false;
  ngOnInit(): void {
    
    
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, CustomValidators.validateUsername]),
      password: new FormControl('', [Validators.required])
    });

    this.tfaForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      tfa: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]) 
    });

    // this.authhome();
  }
  
  nextError:string='';
  nextSuccess:string = '';
  onNext() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      this.loginService.authenticate(username, password).subscribe(
      (authSuccessful: any) => {
        if (authSuccessful.status === 'success') {
          this.nextSuccess=authSuccessful.message||"submit successfully";
          setTimeout(() => {
            this.showtfaForm = true;
            this.nextSuccess='';
            this.startResendTimer();
          }, 3000);
          const userValue = this.loginForm.get('username')?.value;
          const passwordValue = this.loginForm.get('password')?.value;
          this.tfaForm.get('username')?.setValue(userValue);
          this.tfaForm.get('password')?.setValue(passwordValue);
          } 
      },
      (error) => {
        // Handle error
        if (typeof error === 'string') {
          // If the error is a string, it's the custom error message
          this.nextError = error;
        } else {
          // Handle other errors
          if (error.status === 433) {
            this.showPopup = true;
              this.startTryAgain();
                // Handle unauthorized access error
            } else {
              // Handle other errors
                this.nextError = 'An unexpected error occurred during login. Please try again later.';
            }
          }
          setTimeout(() => {
            this.nextError = '';
        }, 3000);
    }
);
    } else {
      // Form is not valid, display an error or take appropriate action
      console.error('Form is not valid');
    }
  }

  resetPopup(): void {
    this.showPopup = false;
    this.router.navigate(['/']);
    // this.loginService.reset();
  }
  
  // async authhome(){
  //  if (localStorage.getItem("access_token")) {
  //     this.router.navigate(['/home']);
  //     // this.isAuthenticated=true;
  //   }
  // }
  
  sendOtpAgain:string ='';
  resendOTP() {
    // Assuming you have an authenticate service with an appropriate method for OTP resend
    const username = this.tfaForm.get('username')?.value;
    const password = this.tfaForm.get('password')?.value;

    // Call your authentication service's method to resend OTP
    this.loginService.resendCode(username, password).subscribe(
      (res: any) => {
        if (res.status === 'success') {
          this.startResendTimer();
          // Handle successful OTP resend (show success message, reset timer, etc.)
          this.sendOtpAgain="resend otp successfully";
            setTimeout(() => {
              this.sendOtpAgain='';
            }, 3000);

          console.log('OTP resent successfully');
        } else {
          // Handle unsuccessful OTP resend (show error message, etc.)
          console.error('Failed to resend OTP:', res.error);
        }
      },
      (error:any) => {
        // Handle errors from the authentication service
        console.error('An unexpected error occurred during OTP resend:', error);
      }
      );
  }


  onCodeInputChange(event:any): void {
    this.tfaForm.get('tfa')?.setValue(event.target.value.replace(/\D/g, ''));
  }


  loginSuccess:string='';
  loginError:string='';
  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password, tfa } = this.tfaForm.value;
      // const autherror='';
      // Call your authentication service's method
      this.loginService.authenticateTFA(username, password, tfa).subscribe(
      (loginSuccessful: any) => {
        if (loginSuccessful) {
          // Login successful, navigate to the next page or perform actions
          console.log('Login successful');
          this.loginSuccess=loginSuccessful.message||"Login successfully";
          setTimeout(() => {
            this.loginSuccess='';
            this.router.navigate(['/home']);
          }, 3000);
          }
      },
      // loginError
      (error) => {
        // Handle error
        if (typeof error === 'string') {
          // If the error is a string, it's the custom error message
          this.loginError = error;
        } else {
          // Handle other errors
          if (error.status === 433) {
              this.showPopup = true;
              this.startTryAgain();
                // Handle unauthorized access error
            } else {
                // Handle other errors
                this.loginError = 'An unexpected error occurred during login. Please try again later.';
            }
        }
        setTimeout(() => {
            this.loginError = '';
        }, 3000);
    }
);
    } else {
      // Form is not valid, display an error or take appropriate action
      console.error('Form is not valid');
    }
  }
  

  isClickDisabled:boolean = false;
  popupIntervalId:any;
  popupTimer = 60;
  PopuptimeFormat: string = '00:60';
  startTryAgain(){
    this.isClickDisabled = true;
    this.popupIntervalId = setInterval(() => {
      if (this.popupTimer > 0) {
        this.popupTimer--;
        this.updatePopupTimerFormat();
      } else {
        this.isClickDisabled = false;
        this.popupTimer = 60; // Reset the timer
        this.updatePopupTimerFormat();
        clearInterval(this.popupIntervalId);
        // this.ngOnDestroy();
      }
    }, 1000);
  }

  updatePopupTimerFormat() {
    const minutes = Math.floor(this.popupTimer / 60);
    const seconds = this.popupTimer % 60;
    this.PopuptimeFormat = `${this.popupPadNumber(minutes)}:${this.popupPadNumber(seconds)}`;
  }
  
  popupPadNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  
  startResendTimer() {
    this.isResendDisabled = true;
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateTimerFormat();
      } else {
        this.isResendDisabled = false;
        this.timer = 30; // Reset the timer
        this.updateTimerFormat();
        // clearInterval(this.intervalId);
        this.ngOnDestroy();
      }
    }, 1000);
  }

  updateTimerFormat() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.timeFormat = `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }
  
  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  ngOnDestroy(){
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
  }
  

  isUsernameFilled(): boolean {
    const usernameControl = this.loginForm.get('username');
    return !!usernameControl?.value && usernameControl.valid;
  }

  isUsernameEmpty(): boolean {
    const usernameControl = this.loginForm.get('username');
    return !usernameControl?.value;
  }


  goToForgotPassword() {
    // this.isLinkClicked = true;
    this.router.navigate(['/forget-password']);
}
   

}
