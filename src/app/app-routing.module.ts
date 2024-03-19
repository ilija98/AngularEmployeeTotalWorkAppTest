import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { RandomPageComponent } from './random-page/random-page.component';

const routes: Routes = [
  { path: '', component: EmployeeTableComponent },
  /*{ path: '', redirectTo: '/employees', pathMatch: 'full' }, // Redirekcija sa prazne putanje na /employees
  { path: 'employees', component: EmployeeTableComponent },
  { path: 'random', component: RandomPageComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [EmployeeTableComponent];