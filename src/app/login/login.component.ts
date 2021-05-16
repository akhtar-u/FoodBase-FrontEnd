import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private emailRegexPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public hide = true;

  public email: FormControl = new FormControl('', [Validators.required,
    Validators.pattern(this.emailRegexPattern)]);
  public password: FormControl = new FormControl('', Validators.required);


  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.errors ? 'Not a valid email' : '';
  }

  getPassErrorMessag(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  signIn(): void{
    if (this.password.invalid || this.email.invalid){
      this.snackBar.open('You must enter both a valid email and password!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: 'reset-bar'
      });
    }
    else{
      console.log('Sending sign in request...');
    }

  }

  openSnackBar(): void {
    this.snackBar.open('Your password has been reset!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: 'reset-bar'
    });
  }
}
