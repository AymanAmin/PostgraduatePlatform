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
import { ViewApplicationFormComponent } from './StudentManagement/ViewApplicationForm/ViewApplicationForm.component';
import { ViewStudentLeaveComponent } from './StudentManagement/ViewStudentLeave/ViewStudentLeave.component';
import { ViewPGT1Component } from './StudentManagement/ViewPGT1/ViewPGT1.component';
import { ViewPGT2Component } from './StudentManagement/ViewPGT2/ViewPGT2.component';
import { ViewPGT3Component } from './StudentManagement/ViewPGT3/ViewPGT3.component';
import { ViewClearanceFormComponent } from './StudentManagement/ViewClearanceForm/ViewClearanceForm.component';
import { SequenceFormComponent } from './SystemAdmin/SequenceForm/SequenceForm.component';
import { SequenceActionComponent } from './StudentManagement/SequenceAction/SequenceAction.component';
import { SequenceTrackingComponent } from './StudentManagement/SequenceTracking/SequenceTracking.component';
import { RequestHeaderComponent } from './StudentManagement/RequestHeader/RequestHeader.component';
import { ViewReferenceAndCertificatesComponent } from './StudentManagement/ViewReferenceAndCertificates/ViewReferenceAndCertificates.component';
import { PermissionComponent } from './SystemAdmin/Permission/Permission.component';
import { ViewCreateSequenceComponent } from './SystemAdmin/ViewCreateSequence/ViewCreateSequence.component';
import { InvoiceCreationComponent } from './Financial/InvoiceCreation/InvoiceCreation.component';
import { InvoiceListComponent } from './Financial/InvoiceList/InvoiceList.component';
import { ViewInvoiceComponent } from './Financial/ViewInvoice/ViewInvoice.component';

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
  { path: 'Student/view/:id', component: StudentComponent, data: { title: 'Student' } },
  { path: 'Order/list', component: ListOrderComponent, data: { title: 'List Order' } },
  { path: 'Order/view/:id', component: ViewRequestComponent, data: { title: 'View Order' } },
  { path: 'Specialization/list', component: ListSpecializationsComponent, data: { title: 'Specializations' } },
  { path: 'Specialization/list/:id', component: ListSpecializationsComponent, data: { title: 'Specializations' } },
  { path: 'Department/list', component: ListDepartmentComponent, data: { title: 'Departments' } },
  { path: 'Department/list/:id', component: ListDepartmentComponent, data: { title: 'Departments' } },
  { path: 'Program/list', component: ListProgramComponent, data: { title: 'Programs' } },
  { path: 'Program/list/:id', component: ListProgramComponent, data: { title: 'Programs' } },
  { path: 'TypeLeave/list', component: TypeLeaveComponent, data: { title: 'Types Leave' } },
  { path: 'TypeLeave/list/:id', component: TypeLeaveComponent, data: { title: 'Types Leave' } },
  { path: 'EmailTemplate/list', component: EmailTemplateComponent, data: { title: 'Email Template' } },
  { path: 'EmailTemplate/list/:id', component: EmailTemplateComponent, data: { title: 'Email Template' } },
  { path: 'Sequence/list', component: AddSequenceModelComponent, data: { title: 'Sequence Model' } },
  { path: 'Sequence/list/:id', component: AddSequenceModelComponent, data: { title: 'Sequence Model' } },
  { path: 'SequenceStatus/list', component: AddSquecneStatusComponent, data: { title: 'Sequence Status' } },
  { path: 'SequenceStatus/list/:id', component: AddSquecneStatusComponent, data: { title: 'Sequence Status' } },
  { path: 'CreateSequence/list', component: CreateSequenceComponent, data: { title: 'Create Sequence' } },
  { path: 'ViewSequence/list', component: ViewCreateSequenceComponent, data: { title: 'View Sequence' } },
  { path: 'CreateSequence/list/:id', component: CreateSequenceComponent, data: { title: 'Create Sequence' } },
  { path: 'SequenceForm/list', component: SequenceFormComponent, data: { title: 'Sequence Form' } },
  { path: 'SequenceForm/list/:id', component: SequenceFormComponent, data: { title: 'Sequence Form' } },
  { path: 'Login/page', component: LoginComponent, data: { title: 'Login' } },
  { path: 'Schedule/ThesisDefense/info', component: ThesisDefenseComponent, data: { title: 'Thesis Defense' } },
  { path: 'Schedule/ThesisDefense/info/:id', component: ThesisDefenseComponent, data: { title: 'Thesis Defense' } },
  { path: 'Schedule/Seminar/info', component: SeminarComponent, data: { title: 'Add Seminar' } },
  { path: 'Schedule/Seminar/info/:id', component: SeminarComponent, data: { title: 'Update Seminar' } },
  { path: 'Schedule/Show', component: ShowCalendarComponent, data: { title: 'View Calendar' } },
  { path: 'Student/Registration', component: RegistrationStudentComponent, data: { title: 'Registration Student' } },

  { path: 'ApplicationForm/add/:id', component: ApplicationFormComponent, data: { title: 'Application Form' } },
  { path: 'Leave/add/:id', component: LeaveComponent, data: { title: 'Leave' } },
  { path: 'StudentAttachment/add/:id', component: StudentAttachmentComponent, data: { title: 'Student Attachment' } },
  { path: 'RecommendationLetter/add/:id', component: RecommendationLetterComponent, data: { title: 'Recommendation Letter' } },
  { path: 'ReferenceAndCertificates/add/:id', component: ReferenceAndCertificatesComponent, data: { title: 'Reference And Certificates' } },
  { path: 'PGT1/add/:PG_R_Type/:id', component: PGTComponent, data: { title: 'PG-T1' } },
  { path: 'PGT2/add/:PG_R_Type/:id', component: PGTComponent, data: { title: 'PG-T2' } },
  { path: 'PGT3/add/:PG_R_Type/:id', component: PGTComponent, data: { title: 'PG-T3' } },
  { path: 'PGT1/add/:PG_R_Type', component: PGTComponent, data: { title: 'PG-T1' } },
  { path: 'PGT2/add/:PG_R_Type', component: PGTComponent, data: { title: 'PG-T2' } },
  { path: 'PGT3/add/:PG_R_Type', component: PGTComponent, data: { title: 'PG-T3' } },

  { path: 'ApplicationForm/add', component: ApplicationFormComponent, data: { title: 'Application Form' } },
  { path: 'Leave/add', component: LeaveComponent, data: { title: 'Leave' } },
  { path: 'StudentAttachment/add', component: StudentAttachmentComponent, data: { title: 'Student Attachment' } },
  { path: 'RecommendationLetter/add', component: RecommendationLetterComponent, data: { title: 'Recommendation Letter' } },
  { path: 'ReferenceAndCertificates/add', component: ReferenceAndCertificatesComponent, data: { title: 'Reference And Certificates' } },
  { path: 'PGT1/add', component: PGTComponent, data: { title: 'PG-T1' } },
  { path: 'PGT2/add', component: PGTComponent, data: { title: 'PG-T2' } },
  { path: 'PGT3/add', component: PGTComponent, data: { title: 'PG-T3' } },

  { path: 'ApplicationForm/View/:id', component: ViewApplicationFormComponent, data: { title: 'View Application Form' } },
  { path: 'StudentLeave/View/:id', component: ViewStudentLeaveComponent, data: { title: 'View Student Leave' } },
  { path: 'ReferenceAndCertificates/View/:id', component: ViewReferenceAndCertificatesComponent, data: { title: 'View Reference And Certificates' } },
  { path: 'ClearanceForm/View/:id', component: ViewClearanceFormComponent, data: { title: 'View Clearance Form' } },
  { path: 'PGT1/View/:id', component: ViewPGT1Component, data: { title: 'PG-R' } },
  { path: 'PGT2/View/:id', component: ViewPGT2Component, data: { title: 'PG-R' } },
  { path: 'PGT3/View/:id', component: ViewPGT3Component, data: { title: 'PG-R' } },
  { path: 'Permission/add/:id', component: PermissionComponent, data: { title: 'Permission' } },
  { path: 'Permission/add', component: PermissionComponent, data: { title: 'Permission' } },
  { path: 'Financial/InvoiceCreation', component: InvoiceCreationComponent, data: { title: 'Invoice Creation' } },
  { path: 'Financial/InvoiceList', component: InvoiceListComponent, data: { title: 'Invoice List' } },
  { path: 'Financial/ViewInvoice/:id', component: ViewInvoiceComponent, data: { title: 'View Invoice' } },
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
    SequenceFormComponent,
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
    ViewRequestComponent,
    ViewApplicationFormComponent,
    ViewStudentLeaveComponent,
    ViewClearanceFormComponent,
    ViewPGT1Component,
    ViewPGT2Component,
    ViewPGT3Component,
    SequenceActionComponent,
    SequenceTrackingComponent,
    RequestHeaderComponent,
    ViewReferenceAndCertificatesComponent,
    PermissionComponent,
    ViewCreateSequenceComponent,
    InvoiceCreationComponent,
    InvoiceListComponent,
    ViewInvoiceComponent
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
