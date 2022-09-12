import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './EmployeeManagement/AddEmployee/AddEmployee.component';
import { AddStudentComponent } from './StudentManagement/AddStudent/AddStudent.component';

const appRoutes: Routes = [
  { path: 'Employee/add', component: AddEmployeeComponent },
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
    AddEmployeeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
