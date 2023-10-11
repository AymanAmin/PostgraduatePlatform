import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ViewPGT1',
  templateUrl: './ViewPGT1.component.html',
  styleUrls: ['./ViewPGT1.component.css']
})
export class ViewPGT1Component implements OnInit {

  LangCode: any = "us-en";
  GN_Code: string = this.route.snapshot.params['id'];

  Supervisor: string = " - ";
  COSupervisor: string = " - "
  SupervisorDate: string = " - " ;
  SupervisorStatus: string = "";
  SupervisorStatusID : any = 0;
  COSupervisorDate: string = " - ";
  Co_SupervisorStatus: string = "";
  Co_SupervisorStatusID : any = 0;
  ThesisArabic: string = "";
  ThesisEnglish: string = "";
  PG_T_Type: string = "PG_R1";
  FormCode: string = "1002-1";
  PageName: string = "";
  Reason : string = "";
  IsSuperVisorApproved:boolean = true;
  IsCOSuperVisorApproved:boolean = true;
  IsSuperVisor_COSuperVisor_Approved:boolean = true;
  IsDepartmentStep: boolean = true;

  Examiner_1_Name:string = ""; Examiner_4_Name:string = "";
  Examiner_2_Name:string = ""; Examiner_5_Name:string = "";
  Examiner_3_Name:string = "";
  btnList:any;

  btn_SaveExaminer:boolean = false;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("View PG-R");
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.PageName = "Master Thesis Defense";
    else
      this.PageName = "طلب مناقشة رسالة";

      this.titleService.setTitle(this.PageName);
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getBtnList();
    this.getData();
    this.GetExaminer();
    this.GetLabelName(this.LangCode);
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/PG_R/Get/PG_R_Info.ashx?GN_Code=' + this.GN_Code + '&LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.GetOrderInfo(MainInfoData);
      }
    )
  }

  update_btn_SaveExaminer(){
    if(this.Examiner_1_Name.trim() != "" && this.Examiner_2_Name.trim() != "" && this.Examiner_3_Name.trim() != "")
      this.btn_SaveExaminer = true;
    else
    this.btn_SaveExaminer = false;
  }

  getBtnList() {
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/ButtonList.ashx?Emp_GN_Code=' + localStorage.getItem("GN_Code") + '&FormCode=' + this.FormCode + '&GN_Code=' + this.GN_Code + '&LangCode=' + this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.btnList = JSON.parse(jsonInfo);
        if(this.btnList.NextBtn == null && this.btnList.OptionBtn == null && this.btnList.PrevBtn == null ){
            this.IsDepartmentStep = false;
        }
        console.log(this.btnList);
      }
    )
  }

  GetOrderInfo(MainInfoData: any) {
    //console.log(MainInfoData);
    if (MainInfoData) {
      this.PG_T_Type = this.LangCode === "us-en" ? MainInfoData.Name_En : MainInfoData.Name_Ar;
      this.ThesisEnglish = MainInfoData.Thesis_Title_En;
      this.ThesisArabic = MainInfoData.Thesis_Title_Ar;
      this.Supervisor = MainInfoData.SupervisorName;
      this.COSupervisor = MainInfoData.Co_SupervisorName;
      this.SupervisorDate = (MainInfoData.SupervisorDate == null)? "  " :MainInfoData.SupervisorDate;
      this.COSupervisorDate = (MainInfoData.Co_SupervisorDate == null)? "  " :MainInfoData.Co_SupervisorDate;
      this.SupervisorStatus = MainInfoData.SupervisorStatus;
      this.SupervisorStatusID = MainInfoData.SupervisorType;
      this.Co_SupervisorStatus = MainInfoData.Co_SupervisorStatus;
      this.Co_SupervisorStatusID = MainInfoData.Co_SupervisorType;
      this.Check_SuperVisor_COSuperVisor_Approval(MainInfoData);

      if(MainInfoData.Status_GN_Name == "موافقة المشرفين")
        this.IsDepartmentStep = true;
      else
        this.IsDepartmentStep = false;
    }
  }

  Check_SuperVisor_COSuperVisor_Approval(MainInfoData: any){
    if(MainInfoData.SupervisorName != null && MainInfoData.SupervisorDate == null){
      if(localStorage.getItem("GN_Code") == MainInfoData.SupervisorGN_Code)
        this.IsSuperVisorApproved = false;

        this.IsSuperVisor_COSuperVisor_Approved = false;
    }

    if(MainInfoData.Co_SupervisorName != null && MainInfoData.Co_SupervisorDate == null){
      if(localStorage.getItem("GN_Code") == MainInfoData.Co_SupervisorGN_Code)
        this.IsCOSuperVisorApproved = false;

        this.IsSuperVisor_COSuperVisor_Approved = false;
    }
  }

  Supervisor_Approve(Type:any){
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("Type", Type);
    formData.append("Reason", this.Reason);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    this.http.post(environment.baseUrl + '/API/RequestManagment/Set/Supervisors_Approval.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          window.location.reload();
        }
      },
        (error) => {
          console.log(error);
        });
  }

  GetExaminer(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/ExaminersName.ashx?GN_Code=' + this.GN_Code + '&LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let Examiners = JSON.parse(jsonInfo);
        console.log(Examiners.Examiner_1_Name);
        this.Examiner_1_Name = Examiners.Examiner_1_Name;
        this.Examiner_2_Name = Examiners.Examiner_2_Name;
        this.Examiner_3_Name = Examiners.Examiner_3_Name;
        this.Examiner_4_Name = Examiners.Examiner_4_Name;
        this.Examiner_5_Name = Examiners.Examiner_5_Name;
      }
    )
  }

  SaveExaminer(){
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("Examiner_1_Name", this.Examiner_1_Name);
    formData.append("Examiner_2_Name", this.Examiner_2_Name);
    formData.append("Examiner_3_Name", this.Examiner_3_Name);
    formData.append("Examiner_4_Name", this.Examiner_4_Name);
    formData.append("Examiner_5_Name", this.Examiner_5_Name);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    this.http.post(environment.baseUrl + '/API/RequestManagment/Set/ExaminersName.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          window.location.reload();
        }
      },
        (error) => {
          console.log(error);
        });
  }

  lb_date: any; lb_OrderDetails: any; lb_OrderNo: any; lb_OrderDate: any; lb_OrderType: any;lb_Reason:any;
  lb_Program: any; lb_Category: any; lb_Speciality: any; lb_PGTDetails: any; lb_COSupervisor: any;lb_Save:any;
  lb_Supervisor: any; lb_DateFrom: any; lb_DateTo: any; lb_ThesisEnglish: any; lb_ThesisArabic: any; lb_Sequence: any;
  lb_Approve: any; lb_Reject: any; lb_Trackorder: any; top_class: any;lb_SupervisorAndCoSupervisor:any;
  lb_Examiner_1_Name:any;lb_Examiner_2_Name:any;lb_Examiner_3_Name:any;lb_Examiner_4_Name:any;lb_Examiner_5_Name:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_date = "Date: ";
      this.lb_OrderDetails = "Request Details";
      this.lb_OrderNo = "Request No: ";
      this.lb_OrderDate = "Request Date: ";
      this.lb_OrderType = "Request Type: ";
      this.lb_Category = "Category: ";
      this.lb_Program = "Program: ";
      this.lb_Speciality = "Speciality: ";
      this.lb_PGTDetails = "Details"
      this.lb_COSupervisor = "CO-Supervisor: ";
      this.lb_Supervisor = "Supervisor: ";
      this.lb_DateFrom = "Date: ";
      this.lb_DateTo = "Date: ";
      this.lb_ThesisEnglish = "Title Thesis English: ";
      this.lb_ThesisArabic = "Title Thesis Arabic: ";
      this.lb_Sequence = "Sequence";
      this.lb_Approve = "Approve";
      this.lb_Reject = "Reject";
      this.lb_Trackorder = "Track Order";
      this.top_class = "ms-auto"
      this.lb_SupervisorAndCoSupervisor = "Approval of supervisor and Co-supervisor";
      this.lb_Reason = "Reject Reason";
      this.lb_Save = "Save";
      this.lb_Examiner_1_Name = "Examiner 1 Name";
      this.lb_Examiner_2_Name = "Examiner 2 Name";
      this.lb_Examiner_3_Name = "Examiner 3 Name";
      this.lb_Examiner_4_Name = "Examiner 4 Name (if applicable)";
      this.lb_Examiner_5_Name = "Examiner 5 Name (if applicable)";
    }
    else {
      this.lb_date = "التاريخ: ";
      this.lb_OrderDetails = "تفاصيل الطلب";
      this.lb_OrderNo = "رقم الطلب: ";
      this.lb_OrderDate = "تاريخ الطلب: ";
      this.lb_OrderType = "نوع الطلب: ";
      this.lb_Category = "التصنيف: ";
      this.lb_Program = "البرنامج: ";
      this.lb_Speciality = "التخصص: ";
      this.lb_PGTDetails = "تفاصيل"
      this.lb_COSupervisor = "المشرف المساعد: ";
      this.lb_Supervisor = "المشرف: ";
      this.lb_DateFrom = "تاريخ: ";
      this.lb_DateTo = "تاريخ: ";
      this.lb_ThesisEnglish = "عنوان البحث إنجليزي: ";
      this.lb_ThesisArabic = "عنوان البحث عربي: ";
      this.lb_Sequence = "التسلسل";
      this.lb_Approve = "قبول";
      this.lb_Reject = "رفض";
      this.lb_Trackorder = "تتبع الطلب";
      this.top_class = "me-auto"
      this.lb_SupervisorAndCoSupervisor = "موافقة المشرف و المشرف المساعد";
      this.lb_Reason = "سبب الرفض";
      this.lb_Save = "حفظ";
      this.lb_Examiner_1_Name = "اسم الممتحن الاول";
      this.lb_Examiner_2_Name = "اسم الممتحن الثاني";
      this.lb_Examiner_3_Name = "اسم الممتحن الثالث";
      this.lb_Examiner_4_Name = "اسم الممتحن الرابع (إن وجد)";
      this.lb_Examiner_5_Name = "اسم الممتحن الخامس (إن وجد)";
    }
  }
}
