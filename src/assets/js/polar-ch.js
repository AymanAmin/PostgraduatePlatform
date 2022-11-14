// Radar chart
var ctx10 = document.getElementById("polar-chart").getContext("2d");

var RequsetLeave = document.getElementById("RequsetLeave").innerText;
var ReferenceLetter = document.getElementById("ReferenceLetter").innerText;
var RequestCertificate = document.getElementById("RequestCertificate").innerText;
var ModelPG_T1 = document.getElementById("ModelPGT1").innerText;
var ModelPG_T2 = document.getElementById("ModelPGT2").innerText;
var ModelPG_T3 = document.getElementById("ModelPGT3").innerText;
//debugger;
new Chart(ctx10, {
  type: "polarArea",
  data: {
    labels: [
      'Requset Leave',
      'Recommendation Letter',
      'Certificate Request',
      'Model PG-T1',
      'Model PG-T2',
      'Model PG-T3'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [RequsetLeave, ReferenceLetter,RequestCertificate, ModelPG_T1 , ModelPG_T2,ModelPG_T3],
      backgroundColor: ['#21d4fd', '#FF0080', '#A8B8D8', '#98ec2d', '#fbcf33','#3A416F'],
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false,
      }
    }
  }
});
