import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showError = false;
  public loading = false;
  public loginError = {
    message: ""
  }

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
   }

  ngOnInit(): void {
  }

  async login() {
    this.showError = false;
    this.loading = true;
    try {
      await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      this.router.navigateByUrl('dashboard');
      console.log("Logged in");
      
    } catch (error: any) {
      console.log(error);
      this.showError = true;
      this.loading = false;
      this.loginError.message = error.message
    }
  }

}
