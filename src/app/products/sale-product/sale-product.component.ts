import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Client } from 'src/app/clients/client';

@Component({
  selector: 'app-sale-product',
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.scss'],
})
export class SaleProductComponent implements OnInit {
  form: FormGroup;
  name = '';
  imageurl = '';
  description = '';
  quantity = 0;
  price = 0;
  isNew: boolean = true;
  isDebt: boolean = false;
  clients: Client[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = fb.group({
      id: [0],
      name: [''],
      imageurl: [''],
      description: [''],
      quantity: [0],
      price: [0],
      montPayed: [
        0,
        [Validators.required, Validators.min(0)],
      ],
      quantityToBuy: [
        0,
        [Validators.required, Validators.min(1)],
      ],
      idclient: [0],
      nameclient: "",
      ciclient: ""
    });
  }
  prestamoBuy(checkStatus: any) {
    this.isDebt = checkStatus.target.checked;
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getClients()
    if (id) {
      this.isNew = false;
      this.http.get(environment.apiEndpoint + '/products/' + id).subscribe(
        (response: any) => {
          // Manejar la respuesta del servidor
          this.form.patchValue({
            id: response.id,
            name: response.name,
            imageurl: response.imageurl,
            description: response.description,
            quantity: response.quantity,
            price: response.price,
          }); // datos id
        },
        (error) => {
          console.error(error); // Manejar el error en caso de que ocurra
        }
      );
    }
  }
  onSubmit() {
    // post sale product
    // Enviar los datos al servidor para grabar en la base de datos
    if (this.form.value.quantityToBuy <= this.form.value.quantity) {
      if (
        this.form.value.montPayed <=
        (this.form.value.price * this.form.value.quantityToBuy)
      ) {
        if (this.isDebt) {
          // venta ft prestamo
          if(this.form.value.idclient != 0 && this.form.value.nameclient != "" && this.form.value.ciclient != ""){
            this.ventaDebtPost()
          } else {
            alert('Tiene que seleccionar un usuario en el campo del ci de clientes registrados, si no aparece porfavor registre al cliente')
          }
        } else if (
          this.form.value.montPayed ==
          (this.form.value.price * this.form.value.quantityToBuy)
        ) {
          // venta post
          this.ventaPost()
        } else {
          alert('El monto a cancelar debe ser igual al pago total');
        }
      } else {
        alert('El monto cancelado no puede ser superior del total a pagar');
      }
    } else {
      alert(
        'La cantidad a comprar no puede ser mayor a la cantidad disponible'
      );
    }
  }
  ventaPost() {
    // realizar compra
    this.http
      .post(environment.apiEndpoint + '/buys', {
        idproduct: this.form.value.id,
        quantity: this.form.value.quantityToBuy,
        datebuy: new Date().toISOString().split('T')[0],
        price: this.form.value.price,
        montpayed: this.form.value.montPayed,
      })
      .subscribe(
        (res) => {
          //exito
          Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: '',
          });
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error(error);
          // error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
  }
  ventaDebtPost() {
    // realizar compra
    this.http
      .post(environment.apiEndpoint + '/buys', {
        idproduct: this.form.value.id,
        quantity: this.form.value.quantityToBuy,
        datebuy: new Date().toISOString().split('T')[0],
        price: this.form.value.price,
        montpayed: this.form.value.montPayed,
      })
      .subscribe(
        (res) => {
          this.http
          .post(environment.apiEndpoint + '/debts', {
            idclient: this.form.value.idclient,
            idproduct: this.form.value.id,
            debtamount: (this.form.value.price * this.form.value.quantityToBuy),
            paidamount: this.form.value.montPayed,
          })
          .subscribe(
            (res) => {
              //exito
              Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: '',
              });
              this.router.navigate(['/products']);
            },
            (error) => {
              console.error(error);
              // error
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              });
            }
          );
        },
        (error) => {
          console.error(error);
          // error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
  }
  getClients() {
    this.http.get(environment.apiEndpoint + '/clients').subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor
        this.clients = response; // respuesta del servidor
        this.clients.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }); // ordenar por name
        console.log(this.clients);

      },
      (error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      }
    );
  }
  public saveCode(e:any): void {
    let ci = e.target.value;
    let client = this.clients.filter(x => x.ci === ci)[0];
    this.form.patchValue({
      idclient: client.id,
      nameclient: client.name + " " + client.lastname,
      ciclient: client.ci
    })
  }
}
