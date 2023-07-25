import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-SequenceAction',
  templateUrl: './SequenceAction.component.html',
  styleUrls: ['./SequenceAction.component.css']
})
export class SequenceActionComponent implements OnInit {

  LangCode: any = "us-en";
  Note: string = "";
  Emp_GN_Code: any;
  @Input() FormCode: string = "";
  GN_Code: string = this.route.snapshot.params['id'];
  SequenceList: any; btnList: any; file: any;
  btnActive:boolean = true;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.Emp_GN_Code = localStorage.getItem("GN_Code");
    this.GetLabelName(this.LangCode);
    this.getBtnList();
    this.getSequenceList();
  }

  getSequenceList() {
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/SequenceList.ashx?GN_Code=' + this.GN_Code + '&LangCode=' + this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SequenceList = JSON.parse(jsonInfo);
      }
    )
  }

  getBtnList() {
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/ButtonList.ashx?Emp_GN_Code=' + this.Emp_GN_Code + '&FormCode=' + this.FormCode + '&GN_Code=' + this.GN_Code + '&LangCode=' + this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.btnList = JSON.parse(jsonInfo);
      }
    )
  }

  UpdateStatus(Type: number) {
    this.btnActive = false;
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("FormCode", this.FormCode);
    formData.append("Note", this.Note);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("Type", Type);

    this.http.post(environment.baseUrl + '/API/RequestManagment/Set/UpdateStatus.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.Note = "";
          if (this.file == null || this.file == undefined) {
            console.log("without file");
            document.getElementById("btnInfo")?.click();
            this.getBtnList();
            this.getSequenceList();
          }
          else {
            this.uploadFile(response, 'Sequence_File')
          }
        }
        else {
          document.getElementById("btnDanger")?.click();
        }
      },
      (error) => {
        document.getElementById("btnDanger")?.click();
        console.log(error);
      }
    )
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
          this.getBtnList();
          this.getSequenceList();
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

  lb_Approve_btn: any; lb_Reject_btn: any; lb_Trackorder: any; top_class: any; lb_Attachment: any;RestoreBtn:any;
  SequenceName: any; SequenceD: any; lb_Sequence: any; lb_Optional_btn: any; lb_Comment: any; lb_Attachment_View: any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Sequence = "Traking Sequence";
      this.lb_Approve_btn = "Approve";
      this.lb_Reject_btn = "Reject";
      this.lb_Trackorder = "Track Order";
      this.top_class = "ms-auto";
      this.lb_Optional_btn = "Optional";
      this.lb_Comment = "Write your comment";
      this.lb_Attachment = "Attachment";
      this.lb_Attachment_View = "View Attachment";
      this.RestoreBtn = "Restore";
    }
    else {
      this.lb_Sequence = "تتبع التسلسل";
      this.lb_Approve_btn = "موافقه";
      this.lb_Reject_btn = "رفض";
      this.lb_Trackorder = "تتبع الطلب";
      this.top_class = "me-auto";
      this.lb_Optional_btn = "إختياري";
      this.lb_Comment = "اكتب تعليقك هنا";
      this.lb_Attachment = "مستند مرفق";
      this.lb_Attachment_View = "عرض المرفق";
      this.RestoreBtn = "تراجع";
    }
  }

}
