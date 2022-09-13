import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './EmployeeManagement/AddEmployee/AddEmployee.component';
import { AddStudentComponent } from './StudentManagement/AddStudent/AddStudent.component';
import { EmployeeListComponent } from './EmployeeManagement/EmployeeList/EmployeeList.component';

const appRoutes: Routes = [
  { path: 'Employee/add', component: AddEmployeeComponent },
  { path: 'Employee/list', component: EmployeeListComponent },
  { path: 'Student/add', component: AddStudentComponent },
]

export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    AddStudentComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    routing
  ],
  providers: [
    AddEmployeeComponent,
    EmployeeListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
