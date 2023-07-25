import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-debt',
  templateUrl: './new-debt.component.html',
  styleUrls: ['./new-debt.component.scss'],
})
export class NewDebtComponent implements OnInit {
  form: FormGroup;
  name = '';
  imageurl = '';
  description = '';
  quantity = 0;
  price = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = fb.group({
      id: [0],
      idclient: [0],
      idproduct: [0],
      debtamount: [0],
      paidamount: [0, [Validators.required]],
      idbuy: [0],
      nameclient: [''],
      lastname: [''],
      ci: [''],
      productname: [''],
      quantity: [0],
      datebuy: [''],
    });
  }
  isNew: boolean = true;
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.http.get(environment.apiEndpoint + '/debts/' + id).subscribe(
        (response: any) => {
          // Manejar la respuesta del servidor
          this.form.patchValue({
            id: response.id,
            idclient: response.idclient,
            idproduct: response.idproduct,
            debtamount: parseFloat(response.debtamount),
            paidamount: parseFloat(response.paidamount),
            idbuy: parseInt(response.idbuy),
            nameclient: response.nameclient,
            lastname: response.lastname,
            ci: response.ci,
            productname: response.productname,
            quantity: parseInt(response.quantity),
            datebuy: response.datebuy,
          }); // datos id
          console.log(this.form.value);
        },
        (error) => {
          console.error(error); // Manejar el error en caso de que ocurra
        }
      );
    }
  }
  onSubmit() {
    if (this.form.value.paidamount >= 0) {
      if (this.form.value.paidamount <= this.form.value.debtamount) {
        // edit exist debt
        this.http
          .put(
            environment.apiEndpoint + '/debts/' + this.form.value.id,
            {
              idclient:this.form.value.idclient,
              idproduct:this.form.value.idproduct,
              debtamount:this.form.value.debtamount,
              paidamount:this.form.value.paidamount,
              idbuy:this.form.value.idbuy,
            }
          )
          .subscribe(
            (res) => {
              //exito
              Swal.fire({
                icon: 'success',
                title: 'Edited!',
                text: '',
              });
              this.router.navigate(['/debts']);
            },
            (error) => console.error(error)
          );
      } else {
        alert(
          'El monto a cancelar tiene que ser menor o igual al monto total de la deuda'
        );
      }
    } else {
      alert('El monto a pagar tiene que ser 0 o mayor');
    }
  }
}
