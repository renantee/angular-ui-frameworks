import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersTableComponent } from './customers-table/customers-table.component';
import { DashComponent } from './dash/dash.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { SalesTableComponent } from './sales-table/sales-table.component';

const routes: Routes = [
  { path: 'customers', component: CustomersTableComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'orders', component: OrdersTableComponent },
  { path: 'products', component: ProductsTableComponent },
  { path: 'sales', component: SalesTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }