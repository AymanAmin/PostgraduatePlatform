import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ReferenceAndCertificates',
  templateUrl: './ReferenceAndCertificates.component.html',
  styleUrls: ['./ReferenceAndCertificates.component.css']
})
export class ReferenceAndCertificatesComponent implements OnInit {
  LangCode: any = "us-en";

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;
  R_R_C_TList:any;

  ReferenceAndCertificates: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];
  Student_GN_Code : any =localStorage.getItem("GN_Code");
  BriefSummary_Data:any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Reference letters and certificates");
  else
       this.titleService.setTitle("خطابات مرجعية وشهادات");
  }

  ngOnInit() {

    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/Multi-choice.js");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.getReceiver();
    this.getR_R_C_Type();
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
    this.ReferenceAndCertificates = new FormGroup({
      Receiver_GN_Code: new FormControl(null, [Validators.required]),
      R_R_C_Type_Id: new FormControl(null, [Validators.required]),
      BriefSummary: new FormControl(null),
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/ReferenceCertificate/Get/ReferenceCertificateInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.BriefSummary_Data = MainInfoData.BriefSummary;
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(ReferenceAndCertificatesData: any) {
    //console.log(ReferenceAndCertificatesData);
    this.BriefSummary_Data = decodeURIComponent(atob(ReferenceAndCertificatesData.Letter));
    if (ReferenceAndCertificatesData) {
      this.ReferenceAndCertificates.patchValue({
      Receiver_GN_Code: ReferenceAndCertificatesData.R_R_C_Type_Id,
      R_R_C_Type_Id: ReferenceAndCertificatesData.R_R_C_Type_Id,
      BriefSummary: ReferenceAndCertificatesData.Letter
      });
    }
  }

  OnSubmit(IsDeleted:boolean) {
    this.UpdateButtonSpinner(true);

    var div = document.getElementById('BriefSummary');
    var data = div?.getAttribute("value");
    var BriefSummary = btoa(encodeURIComponent(data || ""));
    var formData: any = new FormData();

    formData.append("GN_Code", this.GN_Code);
    formData.append("Student_GN_Code", this.Student_GN_Code);
    formData.append("Receiver_GN_Code", this.ReferenceAndCertificates.get('Receiver_GN_Code')?.value);
    formData.append("R_R_C_Type_Id", this.ReferenceAndCertificates.get('R_R_C_Type_Id')?.value);
    formData.append("Letter", BriefSummary);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));

    this.http.post(environment.baseUrl + '/API/StudentManagment/ReferenceCertificate/Set/ReferenceCertificateInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2"){
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
         // this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.router.navigateByUrl('/ReferenceAndCertificates/View/'+ response);
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

  // Label Data
  lb_FormTitle:any;lb_Details:any; lb_Receiver:any; ReceiverList:any;lb_Letter:any;
  lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;lb_RequestType:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle="Reference letters and certificates";
      this.lb_Details = "Please fill all details for the Reference letters and certificates Requst";
      this.lb_Receiver="Receiver";
      this.lb_Letter="Letter";
      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
      this.lb_RequestType = "Request Type";
    }
    else {
      this.lb_FormTitle="بيانات طلب خطابات مرجعية وشهادات";
      this.lb_Details = "الرجاء تعبئة جميع بيانات طلب خطابات مرجعية وشهادات";
      this.lb_Receiver="الجهه المرسل الية";
      this.lb_Letter="الخطاب";
      this.lb_Cancel = "إلغاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_SaveChange = "حفظ";
      this.lb_RequestType = "نوع الطلب";
    }
  }

  getReceiver() {
    this.http.get(environment.baseUrl + '/API/EmployeeManagment/Get/EmployeeList.ashx').subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          this.ReceiverList = JSON.parse(jsonInfo);
        }
      )
  }
  getR_R_C_Type() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/ReferenceCertificate/Get/R_R_C_Type.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.R_R_C_TList = JSON.parse(jsonInfo);
      }
    )
  }

}
