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

  //datetimepicker
  if (document.querySelector('.datetimepicker')) {
    flatpickr('.datetimepicker', {
      allowInput: true
    }); // flatpickr
  }

  //editor
  if (document.getElementById('editor')) {
    var quill = new Quill('#editor', {
      theme: 'snow' // Specify theme in configuration
    });
  }

  //Multiple Choices
  if (document.getElementById('choices-multiple-remove-button')) {
    var element = document.getElementById('choices-multiple-remove-button');
    const example = new Choices(element, {
      removeItemButton: true
    });


  }
});
