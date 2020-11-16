$(document).ready(function () {
  var today = new Date();
  var date_input = $('input[name="date"]');
  var container =
    $(".bootstrap-iso form").length > 0
      ? $(".bootstrap-iso form").parent()
      : "body";
  date_input.datepicker({
    format: "mm-dd-yyyy",
    container: container,
    todayHighlight: true,
    autoclose: true,
    startDate: today,
  });
});
var dateOff=[];
function save() {
    var date = document.getElementById("date").value;
    
    dateOff.push(date)
  localStorage.setItem("dateOff", JSON.stringify(dateOff));
  show();
}
function onloadDate() {
  var datesave = JSON.parse(localStorage.getItem("dateOff")) || [];
  if (datesave.length > 0) {
    show();
  }
}
function show() {
  var datesave = JSON.parse(localStorage.getItem("dateOff")) || [];
  let html = `
    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
      <tr>
        <th>Id</th>
        <th>Date</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody id="tab">
    </tbody>
  </table>
      `;
  document.getElementById("dataTable").innerHTML = html;
  let row = "";
  for (i in datesave) {
    ii=i;
    ii++;
    row += "<tr >";
    row += "<td>" + ii + "</td>";
    row += "<td>" + datesave[i] + "</td>";
    row +=
      "<td>" +
      `<button type="button" onclick="deletesp(${i})" class="btn btn-danger"><i class="fa fa-times" aria-hidden="true"></i></button>` +
      "</td>";
    row += "</tr>";
  }
  document.getElementById("tab").innerHTML = row;
}

function deletesp(id) {
  var r = confirm("Are you sure!");
  if (r == true) {
    var dateOff = JSON.parse(localStorage.getItem("dateOff")) || [];
    var date = dateOff;
    date.splice(id, 1);
    localStorage.setItem("dateOff", JSON.stringify(date));
    show();
  }
}
