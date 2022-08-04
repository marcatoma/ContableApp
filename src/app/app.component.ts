import { Component } from '@angular/core';
//models
import { Contable } from 'src/models/contable';
//forms
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contableApp';
  cont: Contable;
  listaContable: Contable[] = [
    { servicio: 'Visa EEUU', detalle: 'tour', valorGanancia: 80, valorServicio: 980, valorTotal: 1060 },
    { servicio: 'Visa EU', detalle: 'espana', valorGanancia: 80, valorServicio: 920, valorTotal: 1000 },
    { servicio: 'Tour galapagos', detalle: 'plan basico', valorGanancia: 40, valorServicio: 560, valorTotal: 600 },
    { servicio: 'Visa MX', detalle: 'visa mexico', valorGanancia: 70, valorServicio: 670, valorTotal: 740 },
    { servicio: 'Tour ARG', detalle: 'tour Argentina', valorGanancia: 60, valorServicio: 700, valorTotal: 760 },
    { servicio: 'Asesoria', detalle: 'consulta', valorGanancia: 10, valorServicio: 50, valorTotal: 60 },
  ];

  ContableForm = new FormGroup({
    servicio: new FormControl('', Validators.required),
    detalle: new FormControl('', Validators.required),
    precioServicio: new FormControl(0.0, Validators.required),
    precioGanancia: new FormControl(0.0, Validators.required),
    precioTotal: new FormControl(0.0, Validators.required)
  });
  constructor() {
    this.cont = new Contable();

  }
  resetFomulario() {
    this.ContableForm = new FormGroup({
      servicio: new FormControl('', Validators.required),
      detalle: new FormControl('', Validators.required),
      precioServicio: new FormControl(0.0, Validators.required),
      precioGanancia: new FormControl(0.0, Validators.required),
      precioTotal: new FormControl(0.0, Validators.required)
    });
  }
  updatePrecioTotal(event: any) {
    let ps = this.ContableForm.get('precioServicio')?.value;
    let pg = this.ContableForm.get('precioGanancia')?.value;
    pg = pg ? pg : 0;
    ps = ps ? ps : 0;
    const total = pg + ps;
    this.ContableForm.patchValue({
      precioTotal: total
    });
  }

  CalcularDatos(): void {
    console.log(this.ContableForm.value);
    let serv = this.ContableForm.get('servicio')?.value;
    let det = this.ContableForm.get('detalle')?.value;
    let ps = this.ContableForm.get('precioServicio')?.value;
    let pg = this.ContableForm.get('precioGanancia')?.value;
    this.cont.detalle = det ? det : '';
    this.cont.valorServicio = ps ? ps : 0;
    this.cont.valorGanancia = pg ? pg : 0;
    this.cont.valorTotal = this.cont.valorServicio + this.cont.valorGanancia;
    this.listaContable.push(this.cont);
    this.cont = new Contable();
    this.resetFomulario();
  }

  listarDatos() {
    this.listaContable.forEach(e => {
      console.warn(e);
    });
  }

}
