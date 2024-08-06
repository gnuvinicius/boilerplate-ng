import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

}
