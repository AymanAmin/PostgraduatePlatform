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
});
