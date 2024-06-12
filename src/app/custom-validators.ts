import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl):  ValidationErrors|null  => {
          if (!control.value) {
            // if control is empty return no error
            return null;
          }
      
          // test the value of the control against the regexp supplied
          const valid = regex.test(control.value);
      
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? null : error;
        };
      }

      
     static validateUsername(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        
        if (!value) {
          return null; // No validation error if the field is empty
        }
    
        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        // Regular expression for mobile number validation (assuming 10 digits)
        const mobileRegex = /^[0-9]{10,10}$/;
        
        if (emailRegex.test(value) || mobileRegex.test(value)) {
          return null; // Validation passes
        } else {
          return { invalidUsername: true }; // Validation fails
        }
      }
}
