import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/authetication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {
  email: any;

  constructor(public route: Router, public authService: AutheticationService) { }

  ngOnInit() {
  }

  async resetpassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.route.navigate(['/login']);
    } catch (err) {
      console.log(err);
    }
  }
}
