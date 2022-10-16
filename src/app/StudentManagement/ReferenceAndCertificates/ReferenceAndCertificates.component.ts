import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ReferenceAndCertificates',
  templateUrl: './ReferenceAndCertificates.component.html',
  styleUrls: ['./ReferenceAndCertificates.component.css']
})
export class ReferenceAndCertificatesComponent implements OnInit {
  LangCode: string = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";
  lb_FormTitle:string="Reference And Certificates";

  ngOnInit() {
    this.loadJsFile("assets/js/MyScript.js");
    this.GetLabelName(this.LangCode);
  }

  goToDiv(DivID: string) {
    var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  public loadJsFile(url: any) {

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }


  // Label Data
   lb_Receiver:any; ReceiverList:any;lb_Letter:any;lb_SaveChange:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Receiver="Receiver";
      this.ReceiverList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Letter="Letter";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_Receiver="الجهه المرسل الية";
      this.ReceiverList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Letter="الخطاب";
      this.lb_SaveChange = "حفظ";
    }
  }

}
