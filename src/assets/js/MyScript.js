function menuAction() {
  if (document.querySelector('.sidenav-toggler')) {
    var sidenavToggler = document.getElementsByClassName('sidenav-toggler')[0];
    var sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];
    var toggleNavbarMinimize = document.getElementById('navbarMinimize');

    if (sidenavShow) {
      sidenavToggler.onclick = function () {
        if (!sidenavShow.classList.contains('g-sidenav-hidden')) {
          sidenavShow.classList.remove('g-sidenav-pinned');
          sidenavShow.classList.add('g-sidenav-hidden');
          if (toggleNavbarMinimize) {
            toggleNavbarMinimize.click();
            toggleNavbarMinimize.setAttribute("checked", "true");
          }
        } else {
          sidenavShow.classList.remove('g-sidenav-hidden');
          sidenavShow.classList.add('g-sidenav-pinned');
          if (toggleNavbarMinimize) {
            toggleNavbarMinimize.click();
            toggleNavbarMinimize.removeAttribute("checked");
          }
        }
      };
    }
  }
}


function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function () {
      sidenav.classList.remove('bg-white');
    }, 100);
    sidenav.classList.remove('bg-transparent');

  } else {
    body.classList.add(className);
    sidenav.classList.add('bg-white');
    sidenav.classList.remove('bg-transparent');
    iconSidenav.classList.remove('d-none');
  }
}

$( document ).ready(function() {

  //Update color to info
  if(document.getElementById("DarkColor"))
    document.getElementById("DarkColor").click();

  //datetimepicker
  if (document.querySelector('.datetimepicker')) {
    flatpickr('.datetimepicker', {
      allowInput: true
    }); // flatpickr
  }



  //editor2
  if (document.getElementById('editor2')) {
    var quill = new Quill('#editor2', {
      theme: 'snow' // Specify theme in configuration
    });
  }

  //editor3
  if (document.getElementById('editor3')) {
    var quill = new Quill('#editor3', {
      theme: 'snow' // Specify theme in configuration
    });
  }

  //editor4
  if (document.getElementById('editor4')) {
    var quill = new Quill('#editor4', {
      theme: 'snow' // Specify theme in configuration
    });
  }

  //editor5
  if (document.getElementById('editor5')) {
    var quill = new Quill('#editor5', {
      theme: 'snow' // Specify theme in configuration
    });
  }


});

if (document.getElementById('choices-language')) {
  var language = document.getElementById('choices-language');
  //console.log(language);
  const example = new Choices(language);
}
if (document.getElementById('choices-language2')) {
  var language = document.getElementById('choices-language2');
  const example = new Choices(language);
}

if (document.getElementById('choices-language3')) {
  var language = document.getElementById('choices-language3');
  const example = new Choices(language);
}

if (document.getElementById('choices-language4')) {
  var language = document.getElementById('choices-language4');
  const example = new Choices(language);
}

if (document.getElementById('Student')) {
  var Student = document.getElementById('Student');
  const example = new Choices(Student);
}

if (document.getElementById('Specialty')) {
  var Specialty = document.getElementById('Specialty');
  const example = new Choices(Specialty);
}

if (document.getElementById('Supervisor')) {
  var Supervisor = document.getElementById('Supervisor');
  const example = new Choices(Supervisor);
}

if (document.getElementById('RoomNo')) {
  var RoomNo = document.getElementById('RoomNo');
  const example = new Choices(RoomNo);
}

if (document.getElementById('Examiner')) {
  var Examiner = document.getElementById('Examiner');
  const example = new Choices(Examiner);
}

var win = navigator.platform.indexOf('Win') > -1;
if (win && document.querySelector('#sidenav-scrollbar')) {
  var options = {
    damping: '0.5'
  }
  Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
}

