import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './Customers/add/add.component';
import { DetailComponent } from './Customers/detail/detail.component';
import { ListarComponent } from './Customers/listar/listar.component';

const routes: Routes = [
  {path: 'list-customers', component:ListarComponent},
 // {path: '', component:ListarComponent},
  {path: 'add-customer', component:AddComponent},
  {path: 'add-customer/:id', component:AddComponent},  
  {path: 'detail-customers/:id', component:DetailComponent}


];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
