import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.production';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = environment.firebaseAPIKey;
  private idToken: string | null = null;

  constructor(private http: HttpClient) {}

  // Function to handle user sign-up
  signUp(email: string, password: string, firstName?: string, lastName?: string): Observable<any> {
    const signUpData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    // POST request to Firebase API for signing up
    return this.http.post(
      `${this.baseUrl}signUp?key=${this.apiKey}`,
      signUpData
    );
  }
  // Function to handle user sign-in
  signIn(email: string, password: string): Observable<any> {
    const signInData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.baseUrl}signInWithPassword?key=${this.apiKey}`, signInData)
      .pipe(
        // Store the idToken when the user signs in successfully
        tap((response: any) => {
          if (response && response.idToken) {
            this.idToken = response.idToken;
          }
        }),

        // Error handling for sign-in requests
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error('Something went wrong!'));
        })
      );
  }

  // Function to see if user is authenticated
  isUserAuthenticated(): Observable<boolean> {
    if (this.idToken) {
      // If the token exists, check authentication status
      return this.checkUserAuthenticationStatus(this.idToken);
    } else {
      // No idToken available, user is not authenticated
      return of(false);
    }
  }

  // Helper function to validate user authentication status with Firebase
  private checkUserAuthenticationStatus(idToken: string): Observable<boolean> {
    const requestUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.apiKey}`;
    const requestData = { idToken: idToken };

    return this.http.post(requestUrl, requestData).pipe(
      map((response: any) => {
        // Determine user authentication status from the response
        if (response && response.users && response.users.length > 0) {
          return true; // User is authenticated
        } else {
          return false; // User is not authenticated
        }
      })
    );
  }
}
