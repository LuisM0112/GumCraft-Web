import { Component } from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent {

  mostrarIngredientes = false
  mostrarIngredientesRelleno = false

  cambiarEstado(){
    this.mostrarIngredientes = !this.mostrarIngredientes
  }
  cambiarEstadoConRelleno(){
    this.mostrarIngredientesRelleno = !this.mostrarIngredientesRelleno
  }

}
