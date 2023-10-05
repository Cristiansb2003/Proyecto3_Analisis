import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cantidad: number = 1;
  valorX!: number;
  valorY!: number;
  paresXY: { x: number, y: number }[] = [];

  agregarPar() {
    if (this.valorX !== undefined && this.valorY !== undefined) {
      this.paresXY.push({ x: this.valorX, y: this.valorY });
      // Limpia los valores de X e Y después de agregarlos al arreglo
      this.valorX = 0;
      this.valorY = 0;
      console.log("hol")
    }
  }
}
