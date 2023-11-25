import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isSignInMode = true;
  errorMsg: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to query paramaters to determine auth mode
    this.route.queryParams.subscribe((queryParams) => {
      this.isSignInMode = queryParams['action'] === 'sign-in';
    });
  }

  // Function to handle form submission for authentication
  onAuthSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password, firstName, lastName } = form.value;

      if (this.isSignInMode) {
        // Sign in
        this.authService.signIn(email, password).subscribe(
          () => {
            this.router.navigate(['/taskslist']);
          },
          (error) => {
            this.errorMsg = error.message;
          }
        );
      } else {
        // Sign up
        this.authService.signUp(email, password, firstName, lastName).subscribe(
          () => {
            this.successMessage = 'Sign-up successful!';
            // Clear the form
            form.reset();
            // Wait before redirecting
            setTimeout(() => {
              this.router.navigate(['/taskslist']);
            }, 2000); // 2 seconds delay
          },
          (error) => {
            this.errorMsg = 'Something went wrong';
          }
        );
      }
    }
  }
  // Function to toggle between sign-in and sign-up
  toggleAuthMode() {
    this.isSignInMode = !this.isSignInMode;
    this.errorMsg = '';
    this.successMessage='';
  }
}

