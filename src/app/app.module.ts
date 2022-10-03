import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './EmployeeManagement/AddEmployee/AddEmployee.component';
import { AddStudentComponent } from './StudentManagement/AddStudent/AddStudent.component';
import { NotFoundComponent } from './SystemAdmin/NotFound/NotFound.component';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './EmployeeManagement/ListEmployee/ListEmployee.component';
import { FilterPipe } from './filter.pipe';
import { ListSpecializationsComponent } from './SystemAdmin/ListSpecializations/ListSpecializations.component';
import { ListDepartmentComponent } from './SystemAdmin/ListDepartment/ListDepartment.component';
import { ListProgramComponent } from './SystemAdmin/ListProgram/ListProgram.component';
import { TypeLeaveComponent } from './SystemAdmin/TypeLeave/TypeLeave.component';
import { ProfileEmployeeComponent } from './EmployeeManagement/ProfileEmployee/ProfileEmployee.component';
import { HomeComponent } from './Home/Home.component';
import { CkPasswordService } from './EmployeeManagement/service/CkPassword.service';
import { StudentListComponent } from './StudentManagement/StudentList/StudentList.component';
import { ListOrderComponent } from './OrdersManagement/ListOrder/ListOrder.component';
import { EmailTemplateComponent } from './SystemAdmin/EmailTemplate/EmailTemplate.component';
import { AddSequenceModelComponent } from './SystemAdmin/AddSequenceModel/AddSequenceModel.component';
import { AddSquecneStatusComponent } from './SystemAdmin/AddSquecneStatus/AddSquecneStatus.component';
import { CreateSequenceComponent } from './SystemAdmin/CreateSequence/CreateSequence.component';
import { LoginComponent } from './Login/Login.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'الصفحة الرئيسية' } },
  { path: 'Employee/add', component: AddEmployeeComponent, data: { title: 'Add Employee' } },
  { path: 'Employee/add/:id', component: AddEmployeeComponent, data: { title: 'Update Employee' } },
  { path: 'Employee/list', component: ListEmployeeComponent, data: { title: 'List Employee' } },
  { path: 'Employee/profile', component: ProfileEmployeeComponent, data: { title: 'Profule Employee' } },
  { path: 'Student/add', component: AddStudentComponent, data: { title: 'Add Student' } },
  { path: 'Student/add/:id', component: AddStudentComponent, data: { title: 'Update Student' } },
  { path: 'Student/list', component: StudentListComponent, data: { title: 'List of Student' } },
  { path: 'Order/list', component: ListOrderComponent, data: { title: 'List Order' } },
  { path: 'Specialization/list', component: ListSpecializationsComponent, data: { title: 'Specializations' } },
  { path: 'Department/list', component: ListDepartmentComponent, data: { title: 'Departments' } },
  { path: 'Program/list', component: ListProgramComponent, data: { title: 'Programs' } },
  { path: 'TypeLeave/list', component: TypeLeaveComponent, data: { title: 'Types Leave' } },
  { path: 'EmailTemplate/list', component: EmailTemplateComponent, data: { title: 'Email Template' } },
  { path: 'Sequence/list', component: AddSequenceModelComponent, data: { title: 'Sequence Model' } },
  { path: 'SequenceStatus/list', component: AddSquecneStatusComponent, data: { title: 'Sequence Status' } },
  { path: 'CreateSequence/list', component: CreateSequenceComponent, data: { title: 'Create Sequence' } },
  { path: 'Login/page', component: LoginComponent, data: { title: 'Login' } },
  { path: '**', component: NotFoundComponent ,data: { title: 'Not Found' }}
]

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  // onSameUrlNavigation: 'reload'
  //scrollPositionRestoration: "enabled"
};

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    AddStudentComponent,
    NotFoundComponent,
    FilterPipe,
    ListOrderComponent,
    ListSpecializationsComponent,
    ListDepartmentComponent,
    ListProgramComponent,
    TypeLeaveComponent,
    StudentListComponent,
    ProfileEmployeeComponent,
    EmailTemplateComponent,
    AddSequenceModelComponent,
    AddSquecneStatusComponent,
    CreateSequenceComponent,
    HomeComponent,
    LoginComponent,
   ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes, routerOptions)
  ],
  providers: [ CkPasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
