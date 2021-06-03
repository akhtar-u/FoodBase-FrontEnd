import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('emailOne') emailOne!: ElementRef;
  @ViewChild('emailTwo') emailTwo!: ElementRef;
  @ViewChild('passOne') passOne!: ElementRef;
  @ViewChild('passTwo') passTwo!: ElementRef;

  private emailRegexPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public hide = true;

  public email: FormControl = new FormControl('', [Validators.required,
    Validators.pattern(this.emailRegexPattern)]);
  public password: FormControl = new FormControl('', Validators.required);
  public username: FormControl = new FormControl('', Validators.required);


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

  signIn(): void {
    if (this.password.invalid || this.email.invalid) {
      this.openSnackBar('You must enter both a valid email and password!');
    } else {
      this.openSnackBar('Signing in ...');
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: 'reset-bar'
    });
  }

  resetPassword(): void {
    if (this.email.invalid) {
      this.openSnackBar('Please enter a valid email to reset password');
    } else {
      this.openSnackBar('Password sent to email if account exists.');
    }
  }

  register(): void {
    if (this.email.invalid || this.username.invalid || this.password.invalid) {
      this.openSnackBar('Enter valid values for fields!');
    } else if (this.emailOne.nativeElement.value !== this.emailTwo.nativeElement.value) {
      this.openSnackBar('Both emails must match!');
    } else if (this.passOne.nativeElement.value !== this.passTwo.nativeElement.value) {
      this.openSnackBar('Both passwords must match');
    } else if (this.passOne.nativeElement.value.length < 8) {
      this.openSnackBar('Password length must be at least 8 characters!');
    }
  }
}
