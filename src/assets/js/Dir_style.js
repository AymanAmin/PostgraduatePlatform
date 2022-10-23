const LangCode = localStorage.getItem('LangCode');
if (LangCode == "ar-sa") {
  document.body.classList = 'g-sidenav-show rtl bg-gray-100';
   document.getElementById('Root').lang = "ar";
}
else {
  document.body.classList = 'g-sidenav-show  bg-gray-100';
  document.getElementById('Root').lang = "en";
}
