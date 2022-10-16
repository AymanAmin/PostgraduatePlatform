$(document).ready(function () {

  if (document.getElementById("calendar")) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    //console.log(today);
    var calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
      initialView: "dayGridMonth",
      headerToolbar: {
        start: 'today prev,next',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      selectable: true,
      editable: true,
      initialDate: today,
      events: [{
        title: 'Ahmed Abdo',
        start: '2022-09-26',
        end: '2022-09-26',
        className: 'bg-gradient-warning'
      },

      {
        title: 'Ali Omer',
        start: '2022-10-21',
        end: '2022-10-22',
        className: 'bg-gradient-warning'
      },

      {
        title: 'Yosif Mohammed',
        start: '2022-10-29',
        end: '2022-10-29',
        className: 'bg-gradient-warning'
      },

      {
        title: 'Mohammed Ali',
        start: '2022-09-01',
        end: '2022-09-01',
        className: 'bg-gradient-info'
      },

      {
        title: 'Mowaia',
        start: '2022-09-03',
        end: '2022-09-03',
        className: 'bg-gradient-warning'
      },

      {
        title: 'Omer Ahmed',
        start: '2022-09-07',
        end: '2022-09-07',
        className: 'bg-gradient-warning'
      },

      {
        title: 'Asharf Salhen',
        start: '2022-09-10',
        end: '2022-09-10',
        className: 'bg-gradient-info'
      },

      {
        title: 'Amjed Amin',
        start: '2022-09-19',
        end: '2022-09-19',
        className: 'bg-gradient-warning'
      },

      {
        title: 'Mazin Awad ',
        start: '2022-09-23',
        end: '2022-09-23',
        className: 'bg-gradient-info'
      },

      {
        title: 'Ayman Amin',
        start: '2022-09-02',
        end: '2022-09-02',
        className: 'bg-gradient-warning'
      },

      ],
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
    });

    calendar.render();
  }

});
