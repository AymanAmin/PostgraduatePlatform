import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ApplicationForm',
  templateUrl: './ApplicationForm.component.html',
  styleUrls: ['./ApplicationForm.component.css']
})
export class ApplicationFormComponent implements OnInit {
  LangCode: any = "us-en";

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  ApplicationForm: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: any =localStorage.getItem("GN_Code"); //this.route.snapshot.params['id'];

  //BriefSummary_Data:any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
    this.titleService.setTitle("Addational Info");
      else
      this.titleService.setTitle("بيانات إضافية");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/Multi-choice.js");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    if(this.GN_Code)
      this.getData();

    this.UpdateButtonSpinner(false);
  }

  public loadJsFile(url: any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  CreateForm() {
    this.ApplicationForm = new FormGroup({
      FirstName_Ar: new FormControl(null,[Validators.required]),
      FatherName_Ar: new FormControl(null,[Validators.required]),
      GrandFatherName_Ar: new FormControl(null,[Validators.required]),
      FamilyName_Ar: new FormControl(null,[Validators.required]),
      DateOfBirth: new FormControl(null,[Validators.required]),
      PlaceOfBirth: new FormControl(null,[Validators.required]),
      CardNational_ID: new FormControl(null, [Validators.required]),
      IssueDate: new FormControl(null, [Validators.required]),
      ExpiryDate: new FormControl(null, [Validators.required]),
      MaritalStatus: new FormControl(null, [Validators.required]),
      University: new FormControl(null, [Validators.required]),
      GPA: new FormControl(null, [Validators.required]),
      ExamTestKSAHealthSpecialties: new FormControl(null, [Validators.required]),
      EnglishTestScore : new FormControl(null, [Validators.required]),
      City: new FormControl(null, [Validators.required]),
      ZipCode: new FormControl(null, [Validators.required]),
      Address: new FormControl(null, [Validators.required]),
      Student_No : new FormControl(null, [Validators.required]),

    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/StudentInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(ApplicationData: any) {
    console.log(ApplicationData);
    if (ApplicationData) {
      this.ApplicationForm.patchValue({
      FirstName_Ar: ApplicationData.FirstName_Ar,
      FatherName_Ar: ApplicationData.FatherName_Ar,
      GrandFatherName_Ar: ApplicationData.GrandFatherName_Ar,
      FamilyName_Ar: ApplicationData.FamilyName_Ar,
      DateOfBirth: this.convertDate(ApplicationData.DateOfBirth),
      PlaceOfBirth: ApplicationData.PlaceOfBirth,
      MaritalStatus: ApplicationData.MaritalStatus,
      University: ApplicationData.University,
      GPA: ApplicationData.GPA,
      ExamTestKSAHealthSpecialties:ApplicationData.ExamTestKSAHealthSpecialties,
      EnglishTestScore : ApplicationData.EnglishTestScore,
      City: ApplicationData.City,
      ZipCode: ApplicationData.ZipCode,
      Address: ApplicationData.Address,
      IssueDate:this.convertDate(ApplicationData.CardIssueDate) ,
      ExpiryDate: this.convertDate(ApplicationData.CardExpiryDate),
      CardNational_ID: ApplicationData.CardNational_ID,
      Student_No: ApplicationData.Student_No
      });
    }
  }

  OnSubmit(IsDeleted:boolean) {
    this.UpdateButtonSpinner(true);

    var formData: any = new FormData();

    formData.append("GN_Code", this.GN_Code);
    formData.append("FirstName_Ar", this.ApplicationForm.get('FirstName_Ar')?.value);
    formData.append("FatherName_Ar", this.ApplicationForm.get('FatherName_Ar')?.value);
    formData.append("GrandFatherName_Ar", this.ApplicationForm.get('GrandFatherName_Ar')?.value);
    formData.append("FamilyName_Ar", this.ApplicationForm.get('FamilyName_Ar')?.value);
    formData.append("DateOfBirth", this.ApplicationForm.get('DateOfBirth')?.value);
    formData.append("PlaceOfBirth", this.ApplicationForm.get('PlaceOfBirth')?.value);
    formData.append("MaritalStatus", this.ApplicationForm.get('MaritalStatus')?.value);

    formData.append("University", this.ApplicationForm.get('University')?.value);
    formData.append("GPA", this.ApplicationForm.get('GPA')?.value);
    formData.append("ExamTestKSAHealthSpecialties", this.ApplicationForm.get('ExamTestKSAHealthSpecialties')?.value);
    formData.append("EnglishTestScore", this.ApplicationForm.get('EnglishTestScore')?.value);

    formData.append("City", this.ApplicationForm.get('City')?.value);
    formData.append("ZipCode", this.ApplicationForm.get('ZipCode')?.value);
    formData.append("Address", this.ApplicationForm.get('Address')?.value);
    formData.append("IssueDate", this.ApplicationForm.get('IssueDate')?.value);
    formData.append("ExpiryDate", this.ApplicationForm.get('ExpiryDate')?.value);
    formData.append("CardNational_ID", this.ApplicationForm.get('CardNational_ID')?.value);
    formData.append("Student_No", this.ApplicationForm.get('Student_No')?.value);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("FormType", "ApplicationForm");
    this.http.post(environment.baseUrl + '/API/StudentManagment/StudentInfo/Set/StudentInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2"){
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.UpdateButtonSpinner(false);
          document.getElementById("btnInfo")?.click();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => {
        document.getElementById("btnInfo")?.click();
        console.log(error);
      }
    )
  }

  UpdateButtonSpinner(IsLoading: boolean) {
    console.log("spinner: " + IsLoading);
    if (IsLoading) {
      this.btn_spinner = "<span class='spinner-border spinner-border-sm mx-2' role='status' aria-hidden='true'></span>  "+ this.lb_Loading;
      this.btn_status = false;
    }
    else {
      this.btn_spinner = "<span>" + this.lb_SaveChange + "</span>";
      this.btn_status = true;
    }
  }

  goToDiv(DivID: string) {
    var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
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

  // Label Data
  lb_FormTitle:any;lb_Details:any;lb_FristName_Ar:any;lb_FatherName_Ar:any;lb_GrandFatherName_Ar:any;lb_FamilyName_Ar:any;
  lb_DateOfBirth:any;lb_PlaceOfBirth:any;lb_NationalIdNo:any;lb_IssueDate:any;
  lb_ExpiryDate:any;lb_MaritalStatus:any;MaritalStatusList:any;lb_Address:any;
  lb_University:any;lb_GPA:any;lb_HealthSpecialties:any;lb_EnglishTestScore:any;
  lb_City:any;lb_ZipCode:any;lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;lb_Student_No:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle="Application Form";
      this.lb_Details = "Please fill all details for the application form";
      this.lb_FristName_Ar = "Frist Name(Arabic)";
      this.lb_FatherName_Ar = "Father Name(Arabic)";
      this.lb_GrandFatherName_Ar = "Grand Father Name(Arabic)";
      this.lb_FamilyName_Ar = "Family Name(Arabic)";
      this.lb_DateOfBirth ="Date Of Birth";
      this.lb_PlaceOfBirth="Place Of Birth";
      this.lb_NationalIdNo="Saudi Personal Id Card(Number)";
      this.lb_IssueDate="Issue Date";
      this.lb_ExpiryDate="Expiry Date";
      this.lb_MaritalStatus="Marital Status";

      this.lb_University="University";
      this.lb_GPA="GPA";
      this.lb_HealthSpecialties="Examination score of the Saudi Commission for Health Specialties";
      this.lb_EnglishTestScore="English Test Score";

      this.MaritalStatusList = [{ "Id": 1, "Name": "Single" },{ "Id": 2, "Name": "Married" }];
      this.lb_City="City";
      this.lb_ZipCode="Zip Code";
      this.lb_Address="Address";
      this.lb_Student_No="Student No";
      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_FormTitle="بيانات التقديم";
      this.lb_Details = "الرجاء تعبئة جميع بيانات التقديم";
      this.lb_FristName_Ar = "(عربي)الأسم الأول";
      this.lb_FatherName_Ar = "(عربي)إسم الأب";
      this.lb_GrandFatherName_Ar = "(عربي)إسم الجد";
      this.lb_FamilyName_Ar = "(عربي)إسم العائلة";
      this.lb_DateOfBirth ="(عربي)تاريخ الميلاد";
      this.lb_PlaceOfBirth="(عربي)مكان الميلاد";
      this.lb_NationalIdNo="رقم بطاقة الهوية الشخصية السعودية";
      this.lb_IssueDate="تاريخ الإصدار";
      this.lb_ExpiryDate="تاريخ انتهاء الصلاحية";
      this.lb_MaritalStatus="الحالة الاجتماعية";

      this.lb_University="الجامعة";
      this.lb_GPA="المعدل التراكمي";
      this.lb_HealthSpecialties=" درجة اختبار الهيئة السعودية للتخصصات الصحية";
      this.lb_EnglishTestScore="درجة اختبار اللغة الإنجليزية";

      this.MaritalStatusList = [{ "Id": 1, "Name": "أعذب" },{ "Id": 2, "Name": "متزوج" }];
      this.lb_City="المدينة";
      this.lb_ZipCode="الرمز البريدي";
      this.lb_Address="العنوان";
      this.lb_Student_No="رقم الطالب";
      this.lb_Cancel = "إلغاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_SaveChange = "حفظ";
    }
  }

}
