import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AttendanceChart',
  templateUrl: './AttendanceChart.component.html',
  styleUrls: ['./AttendanceChart.component.css']
})
export class AttendanceChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadJsFile("assets/js/AttendanceChart.js");
  }

  public loadJsFile(url: any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

}
