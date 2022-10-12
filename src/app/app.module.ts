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
import { ApplicationFormComponent } from './StudentManagement/ApplicationForm/ApplicationForm.component';
import { RecommendationLetterComponent } from './StudentManagement/RecommendationLetter/RecommendationLetter.component';
import { ReferenceAndCertificatesComponent } from './StudentManagement/ReferenceAndCertificates/ReferenceAndCertificates.component';
import { LeaveComponent } from './StudentManagement/Leave/Leave.component';
import { StudentComponent } from './StudentManagement/Student/Student.component';
import { ThesisDefenseComponent } from './Schedule/ThesisDefense/ThesisDefense.component';
import { ShowCalendarComponent } from './Schedule/ShowCalendar/ShowCalendar.component';
import { SeminarComponent } from './Schedule/Seminar/Seminar.component';
import { PGTComponent } from './StudentManagement/PG-T/PG-T.component';
import { StudentAttachmentComponent } from './StudentManagement/StudentAttachment/StudentAttachment.component';
import { RegistrationStudentComponent } from './RegistrationStudent/RegistrationStudent.component';
import { ViewRequestComponent } from './OrdersManagement/ViewRequest/ViewRequest.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'الصفحة الرئيسية' } },
  { path: 'Employee/add', component: AddEmployeeComponent, data: { title: 'Add Employee' } },
  { path: 'Employee/add/:id', component: AddEmployeeComponent, data: { title: 'Update Employee' } },
  { path: 'Employee/list', component: ListEmployeeComponent, data: { title: 'List Employee' } },
  { path: 'Employee/profile', component: ProfileEmployeeComponent, data: { title: 'Profule Employee' } },
  { path: 'Student/add', component: AddStudentComponent, data: { title: 'Add Student' } },
  { path: 'Student/add/:id', component: AddStudentComponent, data: { title: 'Update Student' } },
  { path: 'Student/list', component: StudentListComponent, data: { title: 'List of Student' } },
  { path: 'Student/view', component: StudentComponent, data: { title: 'Student' } },
  { path: 'Order/list', component: ListOrderComponent, data: { title: 'List Order' } },
  { path: 'Order/view/:id', component: ViewRequestComponent, data: { title: 'View Order' } },
  { path: 'Specialization/list', component: ListSpecializationsComponent, data: { title: 'Specializations' } },
  { path: 'Department/list', component: ListDepartmentComponent, data: { title: 'Departments' } },
  { path: 'Program/list', component: ListProgramComponent, data: { title: 'Programs' } },
  { path: 'TypeLeave/list', component: TypeLeaveComponent, data: { title: 'Types Leave' } },
  { path: 'EmailTemplate/list', component: EmailTemplateComponent, data: { title: 'Email Template' } },
  { path: 'Sequence/list', component: AddSequenceModelComponent, data: { title: 'Sequence Model' } },
  { path: 'SequenceStatus/list', component: AddSquecneStatusComponent, data: { title: 'Sequence Status' } },
  { path: 'CreateSequence/list', component: CreateSequenceComponent, data: { title: 'Create Sequence' } },
  { path: 'Login/page', component: LoginComponent, data: { title: 'Login' } },
  { path: 'Schedule/ThesisDefense/info', component: ThesisDefenseComponent, data: { title: 'Thesis Defense' } },
  { path: 'Schedule/ThesisDefense/info/:id', component: ThesisDefenseComponent, data: { title: 'Thesis Defense' } },
  { path: 'Schedule/Seminar/info', component: SeminarComponent, data: { title: 'Add Seminar' } },
  { path: 'Schedule/Seminar/info/:id', component: SeminarComponent, data: { title: 'Add Seminar' } },
  { path: 'Schedule/Show', component: ShowCalendarComponent, data: { title: 'View Calendar' } },
  { path: 'Student/Registration', component: RegistrationStudentComponent, data: { title: 'Registration Student' } },
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
    ThesisDefenseComponent,
    ShowCalendarComponent,
    SeminarComponent,
    StudentComponent,
    LeaveComponent,
    ApplicationFormComponent,
    RecommendationLetterComponent,
    ReferenceAndCertificatesComponent,
    PGTComponent,
    StudentAttachmentComponent,
    RegistrationStudentComponent,
    ViewRequestComponent
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
