import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private emailRegexPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public hide = true;

  public email: FormControl = new FormControl('', [Validators.required,
    Validators.pattern(this.emailRegexPattern)]);

  constructor() {
  }

  ngOnInit(): void {
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.errors ? 'Not a valid email' : '';
  }
}
