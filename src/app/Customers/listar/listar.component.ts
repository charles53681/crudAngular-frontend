import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/service/customer.service';
//import { NgbPaginationModule, NgbAlertModule } from '@n';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public page=1;
  public pageSize=5;

  customerLength:number;

  customers: Customer[];
  constructor(private customerSerivce:CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.getCustomers();
  }


  private getCustomers(){
    this.customerSerivce.getCustomers().subscribe(
      res=>{
        this.customers=res;
        this.customerLength=res.length;
      });
  }

  updateCustomer2(id:number){
    this.router.navigate(['add-customer',id]);
  }

  deleteCustomer(id:number){

    Swal.fire({
      title: 'Estas seguro?',
      text: "No se podran revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El registro se elimino.',
          'success'
        )
          this.customerSerivce.deleteCustomer(id).subscribe(
            res=>{
              console.log(res);
              this.getCustomers();
            });
    
      }
    })
  }

  detailCustomer(id:number){
    this.router.navigate(['detail-customers',id]);
  }


  
}
