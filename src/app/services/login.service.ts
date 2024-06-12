import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // isLoginError = new EventEmitter<any>()
  constructor(private http:HttpClient, private router:Router) { }

  private apiUrl = 'https://jamnamlpqa.imast.in/api/v1';

  private userkey:string = '';

  authenticate(username: any, password: any): Observable<any> {
    const credentials = { username, password };

    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
    .pipe(
      // catchError(this.handleError),
      catchError((error: any) => {
        // Modify this part to extract and pass the error message
        const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
        return throwError(errorMessage);
    }),
      switchMap((authResponse) => {
        if (authResponse && authResponse.status === 'success') {

          localStorage.setItem('userkey', authResponse.userkey as string);
          
          console.log('Authentication successful');
          return of(authResponse);
        }
        // Handle other scenarios if needed
        console.log('Authentication failed.');
        return of(authResponse);
      })
      );
    }
      
    // private isAuthenticated: boolean = false;

      authenticateTFA(username: any, password: any, otp:any): Observable<any> {
        
        const userkey = localStorage.getItem('userkey');
        const credentials = { username, password, otp, userkey };
    
    return this.http.post<any>(`${this.apiUrl}/login-verify`, credentials)
    .pipe(
      catchError((error: any) => {
        // Modify this part to extract and pass the error message
        const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
        return throwError(errorMessage);
    }),
      switchMap((authResponse) => {
        if (authResponse && authResponse.status === 'success') {
          // Authentication successful, proceed to handle OTP or other actions
          const tokens = authResponse.token_details;
          // console.log(tokens.access_token);
          // this.isAuthenticated = true;
          localStorage.setItem('access_token', tokens.access_token);
          localStorage.setItem('refresh_token', tokens.refresh_token);
          console.log('Authentication successful');
          return of(authResponse);
        }
        // Handle other scenarios if needed
        console.log('Authentication failed.');
        return of(authResponse);
      })
      );
    }
    
    // isAuthenticatedUser(): boolean {
    //   // Check if the user is authenticated (e.g., token exists)
    //   return this.isAuthenticated || !!localStorage.getItem('access_token');
    // }

    

    private popupState = new BehaviorSubject<boolean>(false);
    popupState$ = this.popupState.asObservable();
  
    openPopup(): void {
      this.popupState.next(true);
    }
    

    refreshToken(): Observable<any> {
      const refresh_token = localStorage.getItem('refresh_token');
      const credentials = {refresh_token};
      if (!refresh_token) {
        throw new Error('No valid refresh token found in storage');
      }
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      return this.http.post<any>(`${this.apiUrl}/refresh-token`, credentials, httpOptions)
          .pipe(
            catchError((error: any) => {
              // Modify this part to extract and pass the error message
              const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
              return throwError(errorMessage);
          }),
            switchMap((authResponse) => {
              if (authResponse && authResponse.status === 'success') {
                // Authentication successful, proceed to handle OTP or other actions
                const tokens = authResponse.response
                // console.log(tokens.access_token);
                // this.isAuthenticated = true;
                localStorage.setItem('access_token', tokens.access_token);
                localStorage.setItem('refresh_token', tokens.refresh_token);
                console.log('Refresh page successful');

                this.router.navigate(['/home']);
                return of(authResponse);
              }
              // Handle other scenarios if needed
              console.log('Authentication failed.');
              return of(authResponse);
            })
            );
          }


  resetPassword(username: any): Observable<any> {
    const credentials = { username };
    return this.http.post<any>(`${this.apiUrl}/forget-password`, credentials)
    .pipe(
      catchError((error: any) => {
        // Modify this part to extract and pass the error message
        const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
        return throwError(errorMessage);
    }),
      switchMap((authResponse) => {
        if (authResponse && authResponse.status === 'success') {
          // Authentication successful, proceed to handle OTP or other actions
          console.log('Authentication successful');
          localStorage.setItem('userkey', authResponse.userkey as string);
          
          return of(authResponse);
        }
      
        // Handle other scenarios if needed
        console.log('Authentication failed.');
        return of(authResponse);
      })
    );
  }

  verifyResetPassword(otp: number, new_password:string, confirm_password: string): Observable<any>{
    const userkey = localStorage.getItem('userkey');
        const credentials = { otp, new_password, confirm_password, userkey };
    
    return this.http.post<any>(`${this.apiUrl}/verify-reset-password`, credentials)
    .pipe(
      catchError((error: any) => {
        // Modify this part to extract and pass the error message
        const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
        return throwError(errorMessage);
    }),
      switchMap((authResponse) => {
        if (authResponse && authResponse.status === 'success') {
          // Authentication successful, proceed to handle OTP or other actions\
          console.log('password reset successful');
          localStorage.removeItem('userkey');
          return of(authResponse);
        }
        // Handle other scenarios if needed
        console.log('Authentication failed.');
        return of(authResponse);
      })
      );
}


verifyChangePassword(old_password: number, new_password:string, confirm_password: string): Observable<any>{
      const credentials = { old_password, new_password, confirm_password};
      const access_token = localStorage.getItem('access_token');

      if (!access_token) {
        // Handle the case where the token is not available
        console.error('Access token not available');
        return throwError('Access token not available');
      }
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        }),
      };
  
  return this.http.post<any>(`${this.apiUrl}/change-password`, credentials, httpOptions)
  .pipe(
    catchError((error: any) => {
      // Modify this part to extract and pass the error message
      const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
      return throwError(errorMessage);
  }),
    switchMap((authResponse) => {
      if (authResponse && authResponse.status === 'success') {
        // Authentication successful, proceed to handle OTP or other actions\
        console.log('password change successful');
        return of(authResponse);
      }
      // Handle other scenarios if needed
      console.log('Authentication failed.');
      return of(authResponse);
    })
    );
  }

  resendCode(username: string, password:string): Observable<any> {
    // Implement the logic to resend OTP
    // Make an HTTP request to your server to generate and send a new OTP
    const credentials = { username, password }; // Adjust as needed

    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
    .pipe(
      catchError((error: any) => {
        // Modify this part to extract and pass the error message
        const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
        return throwError(errorMessage);
    }),
      switchMap((authResponse) => {
        if (authResponse && authResponse.status === 'success') {
          console.log('Authentication successful');
          return of(authResponse);
        }
        // Handle other scenarios if needed
        console.log('Authentication failed.');
        return of(authResponse);
      })
      );
  }

  resendOTP(username: any): Observable<any> {
    const credentials = { username };
    return this.http.post<any>(`${this.apiUrl}/forget-password`, credentials)
    .pipe(
      catchError((error: any) => {
        // Modify this part to extract and pass the error message
        const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
        return throwError(errorMessage);
    }),
      switchMap((authResponse) => {
        if (authResponse && authResponse.status === 'success') {
          // Authentication successful, proceed to handle OTP or other actions
          console.log('Authentication successful');
          // localStorage.setItem('userkey', authResponse.userkey as string);
          
          return of(authResponse);
        }
      
        // Handle other scenarios if needed
        console.log('Authentication failed.');
        return of(authResponse);
      })
    );
  }

  getUser(): Observable<any> {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      // Handle the case where the token is not available
      console.error('Access token not available');
      return throwError('Access token not available');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      }),
    };

    return this.http.get<any>(`${this.apiUrl}/get-user`, httpOptions)
    .pipe(
      catchError((error: any) => {
        // Modify this part to extract and pass the error message
        const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
        return throwError(errorMessage);
    }),
      switchMap((authResponse) => {
        if (authResponse && authResponse.status === 'success') {
          // Authentication successful, proceed to handle OTP or other actions
          console.log('get userdetails', authResponse.status);
          // console.log('get userdetails', authResponse.user_details.name);
          return of(authResponse);
        } else {
          // Authentication failed, redirect to login page
          alert(`Authentication Failed! ${authResponse.message}`);
          // window.location.href='';

          return of(authResponse);
        }
      
      })
    )
  }

  
  
  logout(): Observable<any> {
    // Clear user data from local storage
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      // Handle the case where the token is not available
      console.error('Access token not available');
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      }),
    };

    return this.http.get<any>(`${this.apiUrl}/log-out`, httpOptions)
    .pipe(
      // catchError(this.handleError),
      catchError((error: any) => {
        // Modify this part to extract and pass the error message
        const errorMessage = error && error.error && error.error.message ? error.error.message : 'An unexpected error occurred during login.';
        return throwError(errorMessage);
    }),
      switchMap((authResponse) => {
        if (authResponse && authResponse.status === 'success') {
          // Authentication successful, proceed to handle OTP or other actions
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('userkey');
          localStorage.removeItem('selectedData');
          this.router.navigate(['/login']);
          // this.isAuthenticated = false;
          console.log('log-out successful');
          return of(authResponse);
        }
        // Handle other scenarios if needed
        console.log('log-out failed.');
        return of(authResponse);
      })
    );
  }





}
