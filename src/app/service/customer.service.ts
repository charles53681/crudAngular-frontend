import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Customer } from '../models/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  private url= "http://localhost:8080/customers";

  getCustomers():Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.url+"/all");
  }

  getCustomerById(id:number):Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.url+"/byId"}/${id}`);
  }

  addCustomer(customer:Customer):Observable<Object>{
    return this.httpClient.post(this.url+"/add",customer);
  }

  updateCustomer(id:number,customer:Customer):Observable<Object>{
    return this.httpClient.put(`${this.url+ "/update"}/${id}`,customer);
  }

  deleteCustomer(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.url+ "/delete"}/${id}`);
  }
}
