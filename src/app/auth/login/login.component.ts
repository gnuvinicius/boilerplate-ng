import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';
import { Subscription } from 'rxjs';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router = inject(Router);
  authService = inject(AuthService);

  apiAuth = axios.create({ baseURL: 'http://localhost:8080/auth/api/v1/login' });

  public isLogged: boolean = false;
  public hide = true;
  public subscription: Subscription | undefined;
  public showFormForgetPassword = false;
  public forgetPassword = true;
  public showUpdatePassword = false;

  public showErrorAlert = false;
  public showInfoAlert = false;
  public alertMessage = '';
  public alertType = 'info';

  public isLoading = false;

  public companies: [] = [];

  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async signin(username: string | null, password: string | null): Promise<any> {
    return await this.apiAuth.post('', { email: username, password });
  }

  async requestResetPassword(email: string): Promise<any> {
    return await this.apiAuth.get(`reset-password?login=${email}`);
  }

  async requestUpdatePassword(payload: any): Promise<any> {
    return await this.apiAuth.post('reset-password', payload);
  }

  async handleSubmitUser() {
    this.isLoading = true;
    try {
      const response = await this.signin(
        this.loginForm.controls['username'].value,
        this.loginForm.controls['password'].value
      );
      this.authService.login(response.data.access_token);
      this.router.navigate(['/home']);
      this.authService.setLoginStatus(true);
    } catch (error: any) {
      if (error.response.status === 403) {
        this.showErrorAlert = true;
        setTimeout(() => (this.showErrorAlert = false), 5000);
        this.alertMessage = 'usuário ou senha inválidos';
      }
    }
    this.isLoading = false;
  }



}
