import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, 
    public authService: AutheticationService,
    private router: Router // Inyectar Router en el constructor
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email : ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$") ]
      ],
      password : ['', [
        Validators.required
      ]],
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm.valid) {
      const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((err) => {
        console.log(err)
        loading.dismiss();
    });
      
      if (user) {
        loading.dismiss();
        this.router.navigate(['/home']); // Usar router en lugar de route
      }
    } else {
      console.log('Please provide all the required values!');
    }
  }
}
