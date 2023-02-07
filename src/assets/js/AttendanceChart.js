
setTimeout(AttendLoadChart, 500);

  function AttendLoadChart() {
    console.log("call");
    var LangCode = localStorage.getItem("LangCode");
    var CheckIn = document.getElementById("CheckIn").value;
    var CheckOut = document.getElementById("CheckOut").value;
    AttendFill(LangCode,CheckIn,CheckOut);
  }

  function AttendFill(LangCode,CheckInNo,CheckOutNo) {
    var CheckIn = ' Check In ';
    var CheckOut = ' Check Out ';
    var Day = ' Fingerprint ';
    var AttendanceLeave = ' Attendance / leave ';
    if(LangCode != "us-en"){
      CheckIn = ' حضور ';
      CheckOut = ' إنصراف ';
      AttendanceLeave = ' الحضور / الانصراف ';
      Day = ' بصمة ';
    }

    var options = {
      series: [{
      name: CheckOut,
      data: [CheckOutNo]
    }, {
      name: CheckIn,
      data: [CheckInNo]
    }],
      chart: {
      type: 'bar',
      height: 220
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [AttendanceLeave],
    },
    yaxis: {
      title: {
        text: ' ('+ Day +')'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return " " + val + " " + Day
        }
      }
    }
    };

    var chart = new ApexCharts(document.querySelector("#chartAttend"), options);
    chart.render();
  }
