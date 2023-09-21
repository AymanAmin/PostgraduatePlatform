import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-AddEmployee',
  templateUrl: './AddEmployee.component.html',
  styleUrls: ['./AddEmployee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  LangCode: any = "us-en";
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  EmployeeForm: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];
  BriefSummary_Data:any = "";
  DepartmentList:any;ListDep:any;
  GroupPermissionList:any;
  ProgramList: any;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Employee Info");
      else
      this.titleService.setTitle("بيانات موظف");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.getProgram();
    this.getDepartmentList();
    this.getGroupPermissionList();
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

  ActiveValue(IsActive: any) {
    this.IsActive = IsActive.checked;
  }

  CreateForm() {
    this.EmployeeForm = new FormGroup({
      Name_Ar: new FormControl('', [Validators.required]),
      Name_En: new FormControl(null, [Validators.required]),
      PhoneNo: new FormControl(null, [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      Gender: new FormControl(null, [Validators.required]),
      JobTitle: new FormControl('Software', [Validators.required]),
      Username: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
      Password: new FormControl(null),
      PasswordConfirm: new FormControl(null),
      UILanguage: new FormControl("en-us"),
      BriefSummary: new FormControl(null),
      GroupId: new FormControl(null, [Validators.required]),
      Department: new FormControl(null, [Validators.required]),
      Program_GN_Code: new FormControl(null, [Validators.required]),
      IsActive: new FormControl(false)
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/EmployeeManagment/Get/EmlpoyeeInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(EmployeeData: any) {
    this.BriefSummary_Data = this.decodeHTMLEntities(decodeURIComponent(EmployeeData.BriefSummary));
    var list = [];
    for(let i = 0; i < EmployeeData.Department.length; i ++){
      //console.log(EmployeeData.Department[i].Department_Id);
      list.push(""+EmployeeData.Department[i].Department_Id);
    }

    if (EmployeeData) {
      console.log(EmployeeData);
      this.IsActive = EmployeeData.Credential.IsActive;
      this.EmployeeForm.patchValue({
        Name_Ar: EmployeeData.Name_Ar,
        Name_En: EmployeeData.Name_En,
        PhoneNo: EmployeeData.PhoneNo,
        Email: EmployeeData.Email,
        Gender: EmployeeData.Gender,
        JobTitle: EmployeeData.JobTitle,
        Username: EmployeeData.Credential.Username,
        Password: EmployeeData.Credential.Password,
        UILanguage: EmployeeData.Credential.UILanguage,
        PasswordConfirm: EmployeeData.Credential.Password,
        BriefSummary: EmployeeData.BriefSummary,
        Department: list,
        Program_GN_Code: EmployeeData.Program_GN_Code,
        GroupId: EmployeeData.GroupId,
        IsActive: EmployeeData.Credential.IsActive
      });
    }
  }

  IsSelected(DepartmentID:number){
    //console.log(this.ListDep);
    var Obj = this.ListDep.find((x: { Department_Id: number; }) => x.Department_Id == DepartmentID);
    return Obj != null ? "selected": "";
  }

   encodeHTMLEntities(rawStr:any) {
    return rawStr.replace(/[\u00A0-\u9999<>\&]/g, ((i: string) => `&#${i.charCodeAt(0)};`));
  }

  decodeHTMLEntities(rawStr:any) {
    return rawStr.replace(/&#(\d+);/g, ((match:any, dec:any) => `${String.fromCharCode(dec)}`));
  }

  OnSubmit(IsDeleted:boolean) {
    this.UpdateButtonSpinner(true);

    var div = document.getElementById('BriefSummary');
    var data = div?.getAttribute("value");
    var BriefSummary =  encodeURIComponent(this.encodeHTMLEntities(data || ""));
    console.log(BriefSummary);
    //return;
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("Name_Ar", this.EmployeeForm.get('Name_Ar')?.value);
    formData.append("Name_En", this.EmployeeForm.get('Name_En')?.value);
    formData.append("PhoneNo", this.EmployeeForm.get('PhoneNo')?.value);
    formData.append("Email", this.EmployeeForm.get('Email')?.value);
    formData.append("Gender", this.EmployeeForm.get('Gender')?.value);
    formData.append("JobTitle", this.EmployeeForm.get('JobTitle')?.value);
    formData.append("Username", this.EmployeeForm.get('Username')?.value);
    formData.append("Password", this.EmployeeForm.get('Password')?.value);
    formData.append("PasswordConfirm", this.EmployeeForm.get('PasswordConfirm')?.value);
    formData.append("BriefSummary", BriefSummary);
    formData.append("UILanguage", this.EmployeeForm.get('UILanguage')?.value);
    formData.append("Department", this.EmployeeForm.get('Department')?.value);
    formData.append("Program_GN_Code", this.EmployeeForm.get('Program_GN_Code')?.value);
    formData.append("GroupId", this.EmployeeForm.get('GroupId')?.value);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("Type", 1);
    formData.append("IsActive", this.IsActive);
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/EmployeeManagment/Set/EmlpoyeeInfo.ashx', formData).subscribe(
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
          this.UpdateButtonSpinner(false);
          document.getElementById("btnDanger")?.click();
        }
      },
      (error) => {
        document.getElementById("btnDanger")?.click();
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
      this.btn_spinner = "<span>" + this.lb_Save_Change + "</span>";
      this.btn_status = true;
    }
  }

  getDepartmentList() {
    this.http.get(environment.baseUrl + '/API/EmployeeManagment/Get/ListOfDepartments.ashx?GN_Code='+this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.DepartmentList = JSON.parse(jsonInfo);
        this.loadJsFile("assets/js/Multi-choice.js");
        //console.log(this.DepartmentList);
      }
    )
  }

  getGroupPermissionList() {
    this.http.get(environment.baseUrl + '/API/Permission/Group/Get/GroupList.ashx?GN_Code='+this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.GroupPermissionList = JSON.parse(jsonInfo);
        //console.log(this.GroupPermissionList);
      }
    )
  }

  getProgram() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/ProgramManagment/Get/ProgramList.ashx').subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          this.ProgramList = JSON.parse(jsonInfo);
        }
      )
  }


  // Label Data
  lb_EmpInfo: any; lb_EmpDetails: any; lb_EmpName: any; lb_EmpNameEn: any; lb_EmpPhone: any;
  lb_EmpEmail: any; lb_EmpGender: any; lb_EmpSection: any; lb_JobTitle: any;lb_Program:any;
  lb_EmpIsActive: any; lb_EmpIsActiveD: any; lb_EmpBrief: any; lb_EmpBriefD: any;lb_All_Program:any;
  lb_EmpUserName: any; lb_EmpPassword: any; lb_EmpCPassword: any; lb_Language: any;
  lb_Save_Change: any; lb_Cancel: any;Erorr_username: any;lb_Loading:any;lb_Select:any;
  GenderList: any;lb_EmpPermission:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_EmpInfo = "Employee Info";
      this.lb_EmpDetails = "Please fill all details for the employee";
      this.lb_EmpName = "Full Name Arabic";
      this.lb_EmpNameEn = "Full Name English";
      this.lb_EmpPhone = "Phone No";
      this.lb_EmpEmail = "E-mail";
      this.lb_EmpGender = "Gender";
      this.lb_EmpSection = "Section";
      this.lb_JobTitle = "Job Title";
      this.lb_EmpIsActive = "Is Active ?";
      this.lb_EmpIsActiveD = "If it is open, this means that the employee's account works";
      this.lb_EmpBrief = "Brief summary";
      this.lb_EmpBriefD = "A brief summary does not exceed 400 letter from the employee";
      this.lb_EmpUserName = "Username";
      this.lb_EmpPassword = "Password";
      this.lb_EmpCPassword = "Confirm Password";
      this.lb_Language = "UI Language";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.Erorr_username = "Please Check the username length.";
      this.lb_Loading = "Loading";
      this.lb_Select = "- Select - ";
      this.lb_EmpPermission = "Group Permissions";
      this.lb_Program = "Program";
      this.lb_All_Program = "All Program";
      this.GenderList = [{ "Id": 1, "Name": "Female" }, { "Id": 2, "Name": "Male" }];
    }
    else {
      this.lb_EmpInfo = "بيانات الموظف";
      this.lb_EmpDetails = "الرجاء تعبئة جميع بيانات الموظف";
      this.lb_EmpName = "إسم بالكامل بالعربي";
      this.lb_EmpNameEn = "إسم بالكامل بالنجليزي";
      this.lb_EmpPhone = "رقم الجوال";
      this.lb_EmpEmail = "البريد الاكتروني";
      this.lb_EmpGender = "الجنس";
      this.lb_EmpSection = "القسم";
      this.lb_EmpIsActive = "هل نشط ؟";
      this.lb_EmpIsActiveD = "اذا كانت مفتوحة هذا يعني انه حساب الموظف يعمل";
      this.lb_EmpBrief = "نبذه مختصره";
      this.lb_EmpBriefD = "نبذه مختصره لا تتعدى ٤٠٠ حرف عن الموظف";
      this.lb_EmpUserName = "إسم الدخول";
      this.lb_EmpPassword = "كلمة المرور";
      this.lb_EmpCPassword = "تأكيد كلمة المرور";
      this.lb_Language = "لغة النظام";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.Erorr_username = "الرجاء التحقق من طول كلمة المرور.";
      this.lb_Loading = "جاري التحميل";
      this.lb_Select = " - اختر - ";
      this.lb_EmpPermission = "مجموعة الصلاحيات";
      this.lb_Program = "البرنامج";
      this.lb_All_Program = "كل البرامج";
      this.GenderList = [{ "Id": 1, "Name": "انثى" }, { "Id": 2, "Name": "ذكر" }];
    }
  }

}
