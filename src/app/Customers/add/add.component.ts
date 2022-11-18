import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  customerForm:any;
  id: number;
  submitted = false;
  tipoButton:string;


  constructor(private formBuilder: FormBuilder, private route:Router,private routeA:ActivatedRoute, private customerService:CustomerService) { 
  }

  ngOnInit(): void {
    this.tipoButton="Agregar";
    this.id=this.routeA.snapshot.params['id'];
    this.customerForm= this.formBuilder.group({
      //^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$ ^[a-zA-Z0-9_ ]*$
      companyName: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(45), Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]), 
      contactName: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(45),Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]), 
      contactTitle: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(45), Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]), 
      address: new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(45), Validators.pattern(/^[.a-zA-ZÀ-ÿ0-9\u00f1\u00d1,]+(\s*[.a-zA-ZÀ-ÿ0-9\u00f1\u00d1],*)*[.a-zA-ZÀ-ÿ0-9\u00f1\u00d1,]+$/)]), 
      city: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(45), Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]), 
      region: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(45), Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]),
      postalCode: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(/^[0-9]*$/)]),
      country: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(45), Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]),
      phone: new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]*$/)]),
      fax: new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]*$/)])
    });

    if(this.id){
      this.tipoButton="Actualizar";
      this.fillCustomerFormInputs();
    }

  }

  addCustomerV2(){
    this.submitted = true;

    if(this.customerForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Verifica el formulario',
        text: 'Tienes un error!'
      });
      return;
    }
    
    if(!this.id){
      this.createCustomer();
    }else{
      this.updateCustomer();
    }
  }

  private createCustomer(){
    this.customerService.addCustomer(this.customerForm.value).subscribe(
      res=>{

        Swal.fire(
          'Buen Trabajo',
          'Cliente Agregado!',
          'success'
        );
        console.log(res);
        this.goToList();
      }, err=> console.log(err));
  }

  private updateCustomer(){
    this.customerService.updateCustomer(this.id,this.customerForm.value).subscribe(
      res=>{
        Swal.fire(
          'Buen Trabajo',
          'Cliente Actualizado!',
          'success'
        );
        this.goToList();
      }, err=>console.log(err));
  }

  private fillCustomerFormInputs(){
    this.customerService.getCustomerById(this.id).subscribe(
      res=>{
        this.customerForm.patchValue(res);
      },err=> console.log(err));
  }

  goToList(){
      this.route.navigate(['/list-customers']);
  }
}
