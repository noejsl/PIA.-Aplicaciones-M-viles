import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


document.getElementById("perfilForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  
 
  var nombre = (document.getElementById("nombre") as HTMLInputElement).value;
  var gustos = (document.getElementById("gustos") as HTMLInputElement).value;
  var edad = parseInt((document.getElementById("edad") as HTMLInputElement).value);
  var librosPrestados = parseInt((document.getElementById("librosPrestados") as HTMLInputElement).value);

  
  alert("Perfil actualizado exitosamente.");
});

