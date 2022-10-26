$(document).ready(function () {

});

const myTimeout = setTimeout(CallCalendar, 500);

function CallCalendar() {
  var LangCode = localStorage.getItem("LangCode");
  var jsonInfo = document.getElementById("CalendarData").value;
  if(jsonInfo == ""){
    console.log("Start"+jsonInfo);
    setTimeout(CallCalendar, 500);
  }
  let resultData = JSON.parse(jsonInfo);

  var ScheduleEvent = '[';
  for (i = 0; i < resultData.length; i++) {
    if (i != 0)
      ScheduleEvent += ',';

    ScheduleEvent += '{';
    ScheduleEvent += '"id": "' + resultData[i].urlLink + '",';
    ScheduleEvent += '"title": "' + resultData[i].title + '",';
    ScheduleEvent += '"start": "' + resultData[i].start + '",';
    ScheduleEvent += '"end": "' + resultData[i].end + '",';
    ScheduleEvent += '"className": "' + resultData[i].className + '"';
    ScheduleEvent += '}';
  }
  ScheduleEvent += ']';

  var data = JSON.parse(ScheduleEvent);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd ;

  RenderCalender(data, LangCode,today)
}

function RenderCalender(data, LangCode,today) {
  console.log("start render");
  var calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
    initialView: "dayGridMonth",
    themeSystem: 'bootstrap5',
    headerToolbar: {
      start: 'today prev,next',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    lang: LangCode,
    selectable: true,
    editable: false,
    initialDate: today,
    events: data,
    views: {
      month: {
        titleFormat: {
          month: "long",
          year: "numeric"
        }
      },
      agendaWeek: {
        titleFormat: {
          month: "long",
          year: "numeric",
          day: "numeric"
        }
      },
      agendaDay: {
        titleFormat: {
          month: "short",
          year: "numeric",
          day: "numeric"
        }
      }
    },
    eventClick: function (info) {
      alert(info.event.title);
      //Link.href = info.event.id;
      //Link.click();
      // change the border color just for fun
      //info.el.style.borderColor = 'red';
    }
  });

  calendar.render();
}

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
