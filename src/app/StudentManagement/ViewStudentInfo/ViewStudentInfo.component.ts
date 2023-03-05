import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ViewStudentInfo',
  templateUrl: './ViewStudentInfo.component.html',
  styleUrls: ['./ViewStudentInfo.component.css']
})
export class ViewStudentInfoComponent implements OnInit {

  LangCode: any = "us-en";
  GN_Code: string = this.route.snapshot.params['id'];

  tatalRecords: any;
  StudentAttachmentList: any;
  PerPage:any;
  page: number = 1;
  searchedKeyword: string = "";
  FormCode: string = "1004";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("View Student Information");
    else
      this.titleService.setTitle("عرض بيانات الطالب");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getData();
    this.GetLabelName(this.LangCode);
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/StudentInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.GetOrderInfo(MainInfoData);
      }

    )

    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentAttachment/Get/StudentAttachment_List.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentAttachmentList = JSON.parse(jsonInfo);
        console.log(this.StudentAttachmentList );
      }

    )
  }


  StudentName_En: string = "";
  StudentName_Ar: string = "";
  Gender_Name: string = "";
  Phone:string = "";
  Email:string = "";
  CitizenShip: string = "";
  NationalNo: string = "";
  Nationality_Name: string = "";
  IssueDate: string = "";
  ExpiryDate: string = "";
  DateOfBirth: string = "";
  PlaceOfBirth: string = "";
  MaritalStatus: string = "";
  City: string = "";
  Address: string = "";
  ZipCode: string = "";
  Speciality_Name: string = "";
  Program_Name: string = "";
  ApplicantCategory_Name: string = "";
  Student_No: string = "";
  University: string = "";
  GPA: string = "";
  ExamTestKSAHealthSpecialties: string = "";
  EnglishTestScore: string = "";

  GetOrderInfo(MainInfoData: any) {
    this.StudentName_En =MainInfoData.FirstName_En +" "+ MainInfoData.FatherName_En+" "  + MainInfoData.GrandFatherName_En  +" "+ MainInfoData.FamilyName_En;
    this.StudentName_Ar =MainInfoData.FirstName_Ar +" " + MainInfoData.FatherName_Ar  +" "+ MainInfoData.GrandFatherName_Ar  +" "+ MainInfoData.FamilyName_Ar;

    this.Phone = MainInfoData.Phone;
    this.Email = MainInfoData.Email;
    this.Gender_Name = MainInfoData.Gender_Name;
    this.CitizenShip = MainInfoData.CitizenShip;
    this.NationalNo = MainInfoData.CardNational_ID;
    this.Nationality_Name = MainInfoData.Nationality_Name;
    this.Speciality_Name = MainInfoData.Speciality_Name;
    this.Program_Name = MainInfoData.Program_Name;
    this.ApplicantCategory_Name = MainInfoData.ApplicantCategory_Name;
    this.Student_No = MainInfoData.Student_No;
    this.University = MainInfoData.University;
    this.GPA = MainInfoData.GPA;
    this.GPA = MainInfoData.GPA;
    this.IssueDate =  this.convertDate(MainInfoData.CardIssueDate);
    this.ExpiryDate = this.convertDate(MainInfoData.CardExpiryDate);
    this.DateOfBirth = this.convertDate(MainInfoData.DateOfBirth);
    this.PlaceOfBirth = MainInfoData.PlaceOfBirth;
    this.MaritalStatus = MainInfoData.MaritalStatus;
    this.City = MainInfoData.City;
    this.Address = MainInfoData.Address;
    this.ZipCode = MainInfoData.ZipCode;
    this.ExamTestKSAHealthSpecialties = MainInfoData.ExamTestKSAHealthSpecialties;
    this.EnglishTestScore = MainInfoData.EnglishTestScore;
  }
  lb_FormTitle:any;lb_Details:any;lb_PersonInformation: any; lb_CitizenShip: any;
  lb_studentName_En: any;lb_studentName_Ar: any;top_class: any;lb_ZipCode: any;
  lb_Category :any;CategoryList: any;lb_Program:any;ProgramList:any;
  lb_Speciality:any;SpecialityList:any;lb_Phone:any;
  lb_FristName_En:any;lb_FatherName_En:any;lb_GrandFatherName_En:any;lb_FamilyName_En:any;
  lb_FristName_Ar:any;lb_FatherName_Ar:any;lb_GrandFatherName_Ar:any;lb_FamilyName_Ar:any;
  lb_Email:any;lb_RetypeEmail:any;lb_Citizenship:any;CitizenshipList:any;lb_Gender: any;
  lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;GenderList: any;

  lb_FormTitle2:any;lb_Student_No:any;lb_City:any;
  lb_DateOfBirth:any;lb_PlaceOfBirth:any;lb_NationalIdNo:any;lb_IssueDate:any;
  lb_ExpiryDate:any;lb_MaritalStatus:any;MaritalStatusList:any;lb_Address:any;
  lb_University:any;lb_GPA:any;lb_HealthSpecialties:any;lb_EnglishTestScore:any;

  lb_FormTitle3:any;
  lb_Attachment_Name:any;lb_Action:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle3="Attachment";
      this.lb_FormTitle2=" Addational Info ";
      this.lb_FormTitle="Person Information";
      this.lb_Details = "Please fill all details for the studant information";
      this.lb_PersonInformation = "Person Information"
      this.lb_studentName_En ="Student Name (English) : ";
      this.lb_studentName_Ar ="Student Name (Arabic) : ";
      this.lb_Category = "Applicant Category : ";
      this.lb_Program = "Program : ";
      this.lb_Speciality = "Collage : ";
      this.lb_Phone="Phone : ";
      this.lb_Email="Email : ";
      this.lb_Citizenship = "Citizen Ship : ";
      this.lb_NationalIdNo="National Id No : ";
      this.lb_Gender="Gender : ";

      this.lb_DateOfBirth ="Date Of Birth : ";
      this.lb_PlaceOfBirth="Place Of Birth : ";
      this.lb_NationalIdNo="Saudi Personal Id Card(Number) : ";
      this.lb_IssueDate="Issue Date : ";
      this.lb_ExpiryDate="Expiry Date : ";
      this.lb_MaritalStatus="Marital Status : ";
      this.lb_University="University : ";
      this.lb_GPA="GPA : ";
      this.lb_HealthSpecialties="Examination score of the Saudi Commission for Health Specialties : ";
      this.lb_EnglishTestScore="English Test Score : ";
      this.lb_City="City : ";
      this.lb_ZipCode="Zip Code : ";
      this.lb_Address="Address : ";
      this.lb_Student_No="Student No";
      this.top_class = "ms-auto";
      this.lb_Attachment_Name="Attachment Name";
      this.lb_Action= "View";
    }
    else {
      this.lb_FormTitle3="المرفقات";
      this.lb_FormTitle2= "المعلومات الإضافية ";
      this.lb_FormTitle="البيانات الأساسية";
      this.lb_Details = "الرجاء تعبئة جميع بيانات الطالب";
      this.lb_PersonInformation = "المعلومات الشخصية"
      this.lb_studentName_En = "إسم الطالب (بالانجليزي) : ";
      this.lb_studentName_Ar ="إسم الطالب (عربي) : ";
      this.lb_Category = "نوع التقديم : ";
      this.lb_Program = "البرنامج : ";
      this.lb_Speciality = "الكلية : ";
      this.lb_Phone="رقم الجوال : ";
      this.lb_Email="البريد الإلكتروني : ";
      this.lb_Citizenship = "الجنسية : ";
      this.lb_NationalIdNo="رقم الهوية : ";
      this.lb_Gender="الجنس : ";

      this.lb_DateOfBirth ="تاريخ الميلاد (عربي) : ";
      this.lb_PlaceOfBirth="مكان الميلاد (عربي) : ";
      this.lb_NationalIdNo="رقم بطاقة الهوية الشخصية السعودية : ";
      this.lb_IssueDate="تاريخ الإصدار : ";
      this.lb_ExpiryDate="تاريخ انتهاء الصلاحية : ";
      this.lb_MaritalStatus="الحالة الاجتماعية : ";
      this.lb_University="الجامعة : ";
      this.lb_GPA="المعدل التراكمي : ";
      this.lb_HealthSpecialties=" درجة اختبار الهيئة السعودية للتخصصات الصحية : ";
      this.lb_EnglishTestScore="درجة اختبار اللغة الإنجليزية : ";
      this.lb_City="المدينة : ";
      this.lb_ZipCode="الرمز البريدي : ";
      this.lb_Address="العنوان : ";
      this.lb_Student_No="رقم الطالب : ";

      this.lb_Attachment_Name="إسم المرفق";
      this.lb_Action= "عرض";
      this.top_class = "me-auto";


    }
  }

  convertDate(FullDate:any){
    if(FullDate){
      let dateTime = FullDate.split("T");
      let date = dateTime[0].split("-");
      var year = date[0];
      var month = date[1];
      var day = date[2];
      return year+'-'+month+'-'+day;
    }else{
           return FullDate;
    }

  }


}
