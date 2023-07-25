import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ClearnceForm',
  templateUrl: './ClearnceForm.component.html',
  styleUrls: ['./ClearnceForm.component.css']
})
export class ClearnceFormComponent implements OnInit {

  LangCode: any = "us-en";

  GN_Code: string = this.route.snapshot.params['id'];
  Student_GN_Code :any = localStorage.getItem("GN_Code");
  NewRequest:boolean = false;  ActiveUpdate:boolean = false;
  StudentInfo:any;file:any;
  Note:string = "";

  btn_spinner:any;
  btn_status:boolean = false;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
     this.titleService.setTitle("Clearnce Request");
   else
     this.titleService.setTitle("طلب الاخلاء");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.UpdateButtonSpinner(false);
    this.CheckCanMakeRequest();
    if(this.GN_Code != undefined)
      this.getStudentInfo();

      console.log("Can Update: "+ this.ActiveUpdate + " - Can Make New: " + this.NewRequest);
  }

  getStudentInfo(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/StudentInfo.ashx?FormCode=1005&GN_Code='+ this.GN_Code+'&LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentInfo = JSON.parse(jsonInfo);
        if(this.StudentInfo.OrderStatusID == "15")
          this.ActiveUpdate = true;
      }
    )
  }

  CheckCanMakeRequest(){
    this.http.get(environment.baseUrl + '/API/StudentManagment/ClearnceRequest/Get/CheckCanMakeRequest.ashx?Student_GN_Code='+ this.Student_GN_Code).subscribe(
      data => {
        if(data == "1") this.NewRequest = false; else this.NewRequest = true;
      }
    )
  }

  CreateRequest(TypeAction:any){
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("Student_GN_Code", this.Student_GN_Code);
    formData.append("TypeAction", TypeAction);
    formData.append("Note", this.Note);

    this.http.post(environment.baseUrl + '/API/StudentManagment/ClearnceRequest/Set/CreateClearnce.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2"){
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          /*if (!(this.file == null || this.file == undefined)) {
            this.uploadFile(response, 'Sequence_File');
          }*/
          //this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.router.navigateByUrl('/ClearanceForm/View/'+ response);
          this.UpdateButtonSpinner(false);
          document.getElementById("btnInfo")?.click();
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
      this.btn_spinner = "<span>" + this.lb_CreateRequest + "</span>";
      this.btn_status = true;
    }
  }

  uploadFile(GN_Code: any, Type: any) {
    if (this.file == null || this.file == undefined)
      return;

    var formData: any = new FormData();
    formData.append("GN_Code", GN_Code);
    formData.append('file', this.file);
    formData.append('Type', Type);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));

    this.http.post(environment.baseUrl + '/API/FileManagment/Set/UploadFile.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          document.getElementById("btnInfo")?.click();
          this.file = undefined;
        }
      },
      (error) => console.log(error)
    );
  }

  onFileChange(files: FileList, Type: string) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.file = reader.result as string;
    };
  }

  lb_CreateRequest:any;lb_Loading:any;lb_Message:any;lb_ViewRequest:any;
  lb_UpdateRequest:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_CreateRequest="Create Clearnce";
      this.lb_Loading = "Loading";
      this.lb_Message = "You have a request under process, you can't update or create a new request ";
      this.lb_ViewRequest = "View Requests";
      this.lb_UpdateRequest = "Update Request";
    }else{
      this.lb_CreateRequest = "إنشاء طلب اخلاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_Message = "لديك طلب قيد المعالجة ، لا يمكنك انشاء او تحديث طلب ";
      this.lb_ViewRequest = "عرض الطلبات";
      this.lb_UpdateRequest = "تحديث الطلب";
    }
  }

}
