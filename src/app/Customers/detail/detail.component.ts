import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  customerForm: FormGroup;

  id: number;

  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private customerService: CustomerService) { 
  }
  
  ngOnInit(): void {
    this.customerForm= this.formBuilder.group({
      companyName: new FormControl(''), 
      contactName: new FormControl(''), 
      contactTitle: new FormControl(''), 
      address: new FormControl(''), 
      city:new FormControl(''), 
      region: new FormControl(''),
      postalCode: new FormControl(''),
      country: new FormControl(''),
      phone: new FormControl(''),
      fax: new FormControl('')
    });

    this.id = this.route.snapshot.params['id'];
    this.fillCustomerFormInputs();

  }

  private fillCustomerFormInputs(){
    this.customerService.getCustomerById(this.id).subscribe(
      res=>{
        this.customerForm.patchValue(res);
      },err=> console.log(err));
  }

}
