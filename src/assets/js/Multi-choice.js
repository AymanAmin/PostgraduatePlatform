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
    });

    document.getElementsByClassName("BriefSummary")[0].value = BriefSummary.root.innerHTML;

    BriefSummary.on('text-change', function (delta, source) {
        document.getElementsByClassName("BriefSummary")[0].value = BriefSummary.root.innerHTML;
    });
  }

  if (document.getElementById('editor3')) {
    var Template_Ar = new Quill('#editor3', {
      theme: 'snow' // Specify theme in configuration
    });

    document.getElementsByClassName("Template_Ar")[0].value = Template_Ar.root.innerHTML;

    Template_Ar.on('text-change', function (delta, source) {
      document.getElementsByClassName("Template_Ar")[0].value = Template_Ar.root.innerHTML;
    });
  }

  if (document.getElementById('editor2')) {
    var Template_En = new Quill('#editor2', {
      theme: 'snow' // Specify theme in configuration
    });

    document.getElementsByClassName("Template_En")[0].value = Template_En.root.innerHTML;

    Template_En.on('text-change', function (delta, source) {
      document.getElementsByClassName("Template_En")[0].value = Template_En.root.innerHTML;
    });
  }
});
