import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './EmployeeManagement/AddEmployee/AddEmployee.component';
import { AddStudentComponent } from './StudentManagement/AddStudent/AddStudent.component';
import { NotFoundComponent } from './SystemAdmin/NotFound/NotFound.component';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './EmployeeManagement/ListEmployee/ListEmployee.component';
import { FilterPipe } from './filter.pipe';
import { ListOrderComponent } from './EmployeeManagement/OrdersManagement/ListOrder/ListOrder.component';

const appRoutes: Routes = [
  { path: 'Employee/add', component: AddEmployeeComponent,data: { title: 'Add Employee' } },
  { path: 'Employee/add/:id', component: AddEmployeeComponent,data: { title: 'Update Employee' } },
  { path: 'Employee/list', component: ListEmployeeComponent ,data: { title: 'List Employee' }},
  { path: 'Student/add', component: AddStudentComponent,data: { title: 'Add Student' } },
  { path: 'Order/list', component: ListOrderComponent,data: { title: 'List Order' } },
  { path: '**', component: NotFoundComponent ,data: { title: 'Not Found' }}
]

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    AddStudentComponent,
    NotFoundComponent,
    FilterPipe,
    ListOrderComponent,
   ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
