var sub = 0;
var product;
function show() {
  sub = 0;
  var storedOrder = JSON.parse(localStorage.getItem("order"));
  var res1 = '';
  for (i in storedOrder) {
    var name = storedOrder[i].name;
    var qty = storedOrder[i].qty;
    var price = parseFloat(storedOrder[i].price);
    var img = storedOrder[i].img;
    var total = parseFloat(qty * price);
    var newPrice =
      "<p id='nn_" + i + "'>" + price + "</p>";
    var newQty =
      "<input type='number' value='" +
      qty +
      "' id='nm_" +
      i +
      "' onkeyup='calculate(" +
      i +
      "); total()'>";
    var newResult =
      "<spam class='sum' id='result_" + i + "' >" + total + "</span>";
    sub += total;
    var html = `
    <img src="${img}" alt="Card image cap" style="width: 80px; height: 80px;"> `;
    var deleteproduct = `<button type="button" id="buttondelete" onclick="deletesp(${i})"><i class="fa fa-trash" aria-hidden="true"></i></button>`;
    var ii = i;
    ii++;
    let row = "<tr class='table-success'>";
    row += "<td>" + ii + "</td>";
    row += "<td>" + html + "</td>";
    row += "<td>" + name + "</td>";
    row += "<td>" + newPrice + "</td>";
    row += "<td>" + newQty + "</td>";
    row += "<td>" + newResult + "</td>";
    row += "<td>" + deleteproduct + "</td>";
    row += "</tr>";
    res1 += row;
  }
  var row1 = "<tr>";
  row1 += "<td>" + "Total" + "</td>";
  row1 += "<td></td>";
  row1 += "<td></td>";
  row1 += "<td></td>";
  row1 += "<td></td>";
  row1 += "<td>" + `<span id='sub'>${sub}</span>` + "</td>";
  row1 += "<td></td>";
  row1 += "</tr>";
  document.getElementById("tab").innerHTML = res1;
  document.getElementById("tr").innerHTML = row1;
}

function calculate(id) {
  $("#result_" + id).text(
    parseFloat($("#nn_" + id).text()) * parseFloat($("#nm_" + id).val()) || 0
  );
  var orders = JSON.parse(localStorage.getItem("order")) || [];
  var order = orders;
  for (i = 0; i < order.length; i++) {
    if (i == id) {
      order[i].qty = parseInt($("#nm_" + id).val() || 0);
    }
  }
  localStorage.setItem("order", JSON.stringify(order));
}
function total() {
  var sum = 0;
  $.each($(".sum"), function () {
    sum += Number($(this).text());
  });
  $("#sub").text(sum);
  return sum;
}
var order = [];
function deletesp(id) {
  var retrievedObj = JSON.parse(localStorage.getItem("order"));
  console.log(retrievedObj.splice(id,1));
  localStorage.setItem("order", JSON.stringify(retrievedObj));
  show();
}
function setCompletedOrder() {
 localStorage.setItem('total', JSON.stringify(total()));
 window.location.href= 'completed.html';
}
function cancle(){
  localStorage.removeItem('order');
  window.location.href = 'choice.html';
}