var toolbarOptions = [
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme


  ['clean']                                         // remove formatting button
];

function reloadChoices(){
  if (document.getElementsByClassName('choices-multiple')) {
    var elementList = document.getElementsByClassName('choices-multiple');
    for (let i = 0; i < elementList.length; i++) {
      const example = new Choices(elementList[i], {
        removeItemButton: true
      });
    }
  }
}
$(document).ready(function () {
  //Multiple Choices
  if (document.getElementsByClassName('choices-multiple')) {
    var elementList = document.getElementsByClassName('choices-multiple');
    for (let i = 0; i < elementList.length; i++) {
      const example = new Choices(elementList[i], {
        removeItemButton: true
      });
    }
  }

  if (document.getElementById('editor')) {
    var BriefSummary = new Quill('#editor', {
      theme: 'snow' // Specify theme in configuration
      , modules: { toolbar: toolbarOptions }
    });

    document.getElementsByClassName("BriefSummary")[0].value = BriefSummary.root.innerHTML;

    BriefSummary.on('text-change', function (delta, source) {
        document.getElementsByClassName("BriefSummary")[0].value = BriefSummary.root.innerHTML;
    });
  }

  if (document.getElementById('editor3')) {
    var Template_Ar = new Quill('#editor3', {
      theme: 'snow' // Specify theme in configuration
      , modules: { toolbar: toolbarOptions }
    });

    document.getElementsByClassName("Template_Ar")[0].value = Template_Ar.root.innerHTML;

    Template_Ar.on('text-change', function (delta, source) {
      document.getElementsByClassName("Template_Ar")[0].value = Template_Ar.root.innerHTML;
    });
  }

  if (document.getElementById('editor2')) {
    var Template_En = new Quill('#editor2', {
      theme: 'snow' // Specify theme in configuration
      , modules: { toolbar: toolbarOptions }
    });

    document.getElementsByClassName("Template_En")[0].value = Template_En.root.innerHTML;

    Template_En.on('text-change', function (delta, source) {
      document.getElementsByClassName("Template_En")[0].value = Template_En.root.innerHTML;
    });
  }

  // Data Tabel

  const dataTableSearch = new simpleDatatables.DataTable("#datatable-search", {
    searchable: true,
    fixedHeight: false,
    perPageSelect: false
  });

  document.querySelectorAll(".export").forEach(function (el) {
    el.addEventListener("click", function (e) {
      var type = el.dataset.type;

      var data = {
        type: type,
        filename: "soft-ui-" + type,
      };

      if (type === "csv") {
        data.columnDelimiter = "|";
      }

      dataTableSearch.export(data);
    });
  });
  var win = navigator.platform.indexOf('Win') > -1;
  if (win && document.querySelector('#sidenav-scrollbar')) {
    var options = {
      damping: '0.5'
    }
    Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
  }
});
