import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CustomValidators } from '../../custom-validators';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  userId: string = '';
  username: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  // hasUppercase: boolean = false;
  // hasLowercase: boolean = false;
  // hasSpecialChar: boolean = false;
  // hasNumber: boolean = false;
  resetPasswordSuccess: boolean = false;
  passwordResetSuccessful: boolean = false;
  updateMessage: string = '';
  timer: number = 30; // Initial timer value in seconds
  timeFormat: string = '00:30';
  isResendDisabled: boolean = false;
  intervalId:any;

  resetPasswordForm!: FormGroup<any>;
  getUsernameForm!: FormGroup<any>;
  hide = true;
  confirmhide = true;

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.getUsernameForm = this.formBuilder.group({
      username: ['', [Validators.required, CustomValidators.validateUsername]],
    })

    this.resetPasswordForm = this.formBuilder.group({
      // username: ['', [Validators.required]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      newPassword: ['', [Validators.required, CustomValidators.patternValidator(/[a-z0-9]/, {
        hasAlphanumeric: true,
      }),
      CustomValidators.patternValidator(/[A-Z]/, {
        hasUppercase: true,
      }),
      CustomValidators.patternValidator(/[@$%*#_]/, {
        hasSpecialChar: true,
      }),
      Validators.minLength(8),
      ],],
      confirmPassword: ['', [Validators.required]],
    }
    );



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

  ngOnDestroy(){
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
  }
  
  updateTimerFormat() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.timeFormat = `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  
  isButtonClickable(): boolean {
    return this.resetPasswordForm.valid && this.newPassword === this.confirmPassword;
  }

  enteredOtp = '';
  generatedOtp = '';
  isValid = false;
 
  userSuccess:string='';
  userError:string= '';
  resetPassword(){
    if (this.getUsernameForm.valid) {
      const { username } = this.getUsernameForm.value;
      this.loginService.resetPassword(username).subscribe(
        (authSuccessful: any) => {
          if (authSuccessful.status === 'success') {
            this.startResendTimer();
          // Display tfaForm
            this.userSuccess = authSuccessful.message||'generate otp successfully';
            setTimeout(() => {
              this.userSuccess = '';
              this.resetPasswordSuccess = true;
            }, 3000);
          } 
      },
      // this.userError = "User not found in our system.";
      (error) => {
        // Handle error
        if (typeof error === 'string') {
          // If the error is a string, it's the custom error message
          this.userError = error;
        } else {
          // Handle other errors
                this.userError = 'An unexpected error occurred during login. Please try again later.';  
        }
        setTimeout(() => {
            this.userError = '';
        }, 3000);
    }
);  
    } else {
      // Form is not valid, display an error or take appropriate action
      console.error('Form is not valid');
    }
  }

  
  authError:string ='';
  passwordReset:string ='';
  verifyResetPassword():void{
    if (this.resetPasswordForm.valid) {
      const { otp, newPassword, confirmPassword } = this.resetPasswordForm.value;
      this.loginService.verifyResetPassword(otp, newPassword, confirmPassword).subscribe(
        (authSuccessful: any) => {
          if (authSuccessful.status === 'success') {
          // Display tfaForm
          this.passwordReset = authSuccessful.message||'Your Password has been reset Successfully!';
          this.passwordResetSuccessful = true;

          } else {
          // Handle unsuccessful login (show error message, etc.)
          // this.authError = 'Invalid username or password';
          console.error('Unauthorized user');
        }
      },
      // authError
      (error) => {
        // Handle error
        if (typeof error === 'string') {
          // If the error is a string, it's the custom error message
          this.authError = error;
        } else {
          // Handle other errors
                this.authError = 'An unexpected error occurred during login. Please try again later.';  
        }
        setTimeout(() => {
            this.authError = '';
        }, 3000);
    }
);  
    } else {
      // Form is not valid, display an error or take appropriate action
      console.error('Form is not valid');
    }
  }

  sendOtpAgain:string='';
  resendOtp(){
    if (this.getUsernameForm.valid) {
      const { username } = this.getUsernameForm.value;
      this.loginService.resendOTP(username).subscribe(
        (authSuccessful: any) => {
          if (authSuccessful.status === 'success') {
            this.startResendTimer();
            this.sendOtpAgain='resend otp successfully';
            setTimeout(() => {
              this.sendOtpAgain='';
            }, 3000);
          // Display tfaForm
          this.resetPasswordSuccess = true;
          } else {
          // Handle unsuccessful login (show error message, etc.)
          // this.authError = 'Invalid username or password';
          console.error('Error generating OTP:');
        }
      },
      (error) => {
        // Handle errors from the authentication service
        console.error('An unexpected error occurred during login:', error);
      });
    } else {
      // Form is not valid, display an error or take appropriate action
      console.error('Form is not valid');
    }
  }

  onOtpInputChange(event:any): void {
    this.resetPasswordForm.get('otp')?.setValue(event.target.value.replace(/\D/g, ''));
  }

  onPasswordInputChange(event: any): void {
    const inputValue = event.target.value;
  const validCharactersRegex = /^[a-zA-Z0-9@#$%*_]+$/;

  if (validCharactersRegex.test(inputValue)) {
    this.resetPasswordForm.get('newPassword')?.setValue(inputValue);
  } else {
    this.resetPasswordForm.get('newPassword')?.setErrors({ 'invalidInput': true });
  }
}
  
}

