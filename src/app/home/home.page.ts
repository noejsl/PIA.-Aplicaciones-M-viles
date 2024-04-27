import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from '../authetication.service';
import { MiperfilPage } from '../pages/miperfil/miperfil.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user:any

  constructor(public route: Router, public authService :AutheticationService) {
    this.user = authService.getProfile
  }
  
  async logout(){
    this.authService.signOut().then(()=>{
      this.route.navigate(['/landing'])


    }).catch((Error)=>{
      console.log(Error);
      


    })
    
    


  }

}
