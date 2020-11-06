import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
  { path: 'checkbox', component: CheckboxComponent },
  { path: 'input', component: InputComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
