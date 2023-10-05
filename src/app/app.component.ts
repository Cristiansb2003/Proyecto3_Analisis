import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { YourDialogComponentComponent } from './your-dialog-component/your-dialog-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cantidad: number = 1;
  valorX!: number;
  valor_int!:number;
  valorY!: number;
  paresXY: { x: number, y: number }[] = [];
  dataSource = new MatTableDataSource(this.paresXY); // Crea una instancia de MatTableDataSource
  resultadoInterpolado!:number | undefined;

  constructor(private dialog: MatDialog){}
  agregarPar() {
    if (this.valorX !== undefined && this.valorY !== undefined) {
      const existePar = this.paresXY.some(par => par.x === this.valorX && par.y === this.valorY);

      if (!existePar) {
        const nuevoPar = { x: this.valorX, y: this.valorY };
        this.paresXY.push(nuevoPar);

        // Ordena el arreglo por el valor de x de menor a mayor
        this.paresXY.sort((a, b) => a.x - b.x);

        this.valorX = 0;
        this.valorY = 0;
        this.dataSource.data = [...this.paresXY];
      } else {
        // Abre un cuadro de diálogo de Angular Material para mostrar el mensaje de error
        const dialogRef = this.dialog.open(YourDialogComponentComponent, {
          data: 'El par ya existe en la lista.'
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('El cuadro de diálogo se ha cerrado.');
        });
      }
    }
  }
   

  calcularResultadoInterpolado() {
    if (this.paresXY.length > 1 && this.valor_int !== undefined) {
      const matrix = this.matrixFild(this.paresXY);
      const terminosC = this.calcularValores(matrix, this.paresXY.map(par => par.y));
      const coeficienteFinal = this.finalCoeficientes(this.paresXY.map(par => par.x), this.valor_int);
      let resultado = terminosC[0];

      for (let i = 1; i < this.paresXY.length; i++) {
        resultado += terminosC[i] * coeficienteFinal[i - 1];
      }

      this.resultadoInterpolado = resultado;
    } else {
      this.resultadoInterpolado = undefined;
    }
  }

  matrixFild(pares: { x: number, y: number }[]): number[][] {
    const coeficientes: number[][] = [];

    for (let i = 0; i < pares.length; i++) {
      let coeficiente = 1;
      const valorX = pares[i].x;
      const coeficientesV: number[] = [1];

      for (let j = 0; j < pares.length - 1; j++) {
        coeficiente = (valorX - pares[j].x) * coeficiente;
        coeficientesV.push(coeficiente);
      }

      coeficientes.push(coeficientesV);
    }

    return coeficientes;
  }

  finalCoeficientes(x: number[], valX: number): number[] {
    const vecCoefientes: number[] = [];

    for (let i = 0; i < x.length; i++) {
      let coeficiente = 1;

      for (let j = 0; j < i; j++) {
        coeficiente = coeficiente * (valX - x[j]);
      }

      vecCoefientes.push(coeficiente);
    }

    vecCoefientes.shift();
    return vecCoefientes;
  }

  calcularValores(m: number[][], y: number[]): number[] {
    const terminosC: number[] = [1];

    for (let i = 0; i < y.length; i++) {
      let independiente = y[i];

      for (let j = 0; j <= i; j++) {
        if (j === i && j === 0) {
          terminosC[i] = independiente;
        } else if (j === i) {
          const coeficiente = independiente / m[i][j];
          independiente -= terminosC[0];
          terminosC.push(coeficiente);
        } else {
          if (j === 0) {
            independiente -= terminosC[0];
          } else {
            independiente -= m[i][j] * terminosC[j];
          }
        }
      }
    }

    return terminosC;
  }
}
