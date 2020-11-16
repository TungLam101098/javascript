const API_URL = "https://5fb084f37edddb0016468559.mockapi.io/api";

function callAPI(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}

var order = [];
function loadOrder() {
  // var ordersuccess = JSON.parse(localStorage.getItem("ordersuccess")) || [];
  var ordersuccess;
  callAPI("order", "GET", null).then((res) => {
    ordersuccess = res.data;
    if (ordersuccess.length > 0) {
      show();
    }
  });
}

var id;
function show() {
  // var ordersuccess = JSON.parse(localStorage.getItem("ordersuccess")) || [];
  var ordersuccess;
  callAPI("order", "GET", null).then((res) => {
    ordersuccess = res.data;
    let html = `
  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
  <thead>
    <tr>
      <th>Id</th>
      <th>Ngày đặt</th>
      <th>Id user</th>
      <th>Tên đăng nhập</th>
      <th>Đơn đặt</th>
      <th>Tổng tiền</th>
      <th>Trạng thái</th>
      <th>Xoá</th>
    </tr>
  </thead>
  <tbody id="tab">
  </tbody>
</table>
    `;
    document.getElementById("dataTable").innerHTML = html;
    var row = "";
    for (i in ordersuccess) {
      var buttondetail = `<button class='btn btn-success' onclick='showDetail(${ordersuccess[i].id})'>Xem chi tiết</button>`;
      row += "<tr >";
      row += "<td>" + ordersuccess[i].id + "</td>";
      row +=
        "<td>" +
        ordersuccess[i].date +
        "<br>" +
        ordersuccess[i].hour +
        `h` +
        ordersuccess[i].minute +
        `'` +
        "</td>";
      row += "<td>" + ordersuccess[i].idCustomer + "</td>";
      row += "<td>" + ordersuccess[i].nameCustomer + "</td>";
      row += "<td>" + buttondetail + "</td>";

      row += "<td>" + ordersuccess[i].total + "</td>";
      row +=
        "<td>" +
        `<select  class="isActive btn btn-light" onchange="changeOption(${i})">
          <option value="false">Trạng thái: ${ordersuccess[i].isActive}</option>
          <option value="false" >False</option>
          <option value="true">True</option>
    </select>` +
        "</td>";
      row +=
        "<td>" +
        `<button type="button" onclick="deletesp(${i})" class="btn btn-danger"><i class="fa fa-times" aria-hidden="true"></i></button>` +
        "</td>";
      row += "</tr>";
    }
    document.getElementById("tab").innerHTML = row;
  });
}
function changeOption(id) {
  // var orders = JSON.parse(localStorage.getItem("ordersuccess")) || [];
  var orders;
  callAPI(`order/${id + 1}`, "GET", null).then((res) => {
    orders = res.data;
    let selectBox = document.getElementsByClassName("isActive");
    for (var i = 0; i < selectBox.length; i++) {
      if (i == id) {
        var values = selectBox[id][selectBox[id].selectedIndex].value;
      }
      if (values == "true") {
        var messages = "Đặt bàn thành công";
        var messages1 = "Đặt bàn thành công";
      }
      if (values == "false") {
        var messages = "Đang chờ xử lý";
        var messages1 = "Đơn hàng bị huỷ!";
      }
    }
    var res1 = `
      <table class="table" name='tab'>
      <thead>
          <tr class="thead-dark">
              <th></th>
              <th></th>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
          </tr>
      </tr>
      </thead>
      <tbody id="tab">
      `;
    for(j in orders.product){
      var name = orders.product[j].nameDish;
      var qty = orders.product[j].qtyDish;
      var price = parseFloat(orders.product[j].priceDish);
      var img = orders.product[j].img;
      var total = parseFloat(qty * price);
      var html = `
          <img src="${img}" alt="Card image cap" style="width: 80px; height: 80px;"> `;
      var row = "<tr class='table-success'>";
      let ii = j;
      ii++;
      row += "<td>" + ii + "</td>";
      row += "<td>" + html + "</td>";
      row += "<td>" + name + "</td>";
      row += "<td>" + price + "₫" + "</td>";
      row += "<td>" + qty + "</td>";
      row += "<td>" + total + "₫" + "</td>";
      row += "</tr>";
      res1 += row;
    }
    

    res1 += "</tbody></table>";
    var htlm = '<div class="modal-content">' + res1 + "<div>";

    var message1 = `
  <h3>Cám ơn bạn đã tới nhà hàng chúng tôi</h3>
  <h5>Thông tin đơn đặt gồm</h5>
  <ul>
    <li>Họ tên: ${orders.name}</li>
    <li>Địa chỉ: ${orders.address}</li>
    <li>SĐT: ${orders.phone}</li>
    <li>Số lượng khách: ${orders.qtyCustomer}</li>
    <li>Ngày đặt: ${orders.date} ${orders.hour}h ${orders.minute}'</li>
    <li>Món ăn: ${htlm}</li>
    <li>Tổng tiền: ${orders.total}</li>
  </ul>
  `;

    var mail = {
      Host: "smtp.gmail.com",
      Username: "n.t.lam10101998@gmail.com",
      Password: "Ihatey0u!@",
      SecureToken: "fdc24250-e2e0-479d-9c95-81035c168890",
      To: orders.email,
      From: "n.t.lam10101998@gmail.com",
      Subject: messages1,
      Body: message1,
    };

    // localStorage.setItem("ordersuccess", JSON.stringify(res));

    orders.isActive = values;
    orders.messages = messages;
    callAPI(`order/${id + 1}`, 'PUT', orders).then((res) => {
      Email.send(mail).then((message) => alert(message));
      loadOrder();
    });
  });
}

function deletesp(id) {
  var r = confirm("Are you sure!");
  if (r == true) {


    var orders;
  callAPI(`order/${id + 1}`, "GET", null).then((res) => {
    orders = res.data;
    
        var messages1 = "Đơn hàng bị huỷ!";
      
    var res1 = `
      <table class="table" name='tab'>
      <thead>
          <tr class="thead-dark">
              <th></th>
              <th></th>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
          </tr>
      </tr>
      </thead>
      <tbody id="tab">
      `;
    for(j in orders.product){
      var name = orders.product[j].nameDish;
      var qty = orders.product[j].qtyDish;
      var price = parseFloat(orders.product[j].priceDish);
      var img = orders.product[j].img;
      var total = parseFloat(qty * price);
      var html = `
          <img src="${img}" alt="Card image cap" style="width: 80px; height: 80px;"> `;
      var row = "<tr class='table-success'>";
      let ii = j;
      ii++;
      row += "<td>" + ii + "</td>";
      row += "<td>" + html + "</td>";
      row += "<td>" + name + "</td>";
      row += "<td>" + price + "₫" + "</td>";
      row += "<td>" + qty + "</td>";
      row += "<td>" + total + "₫" + "</td>";
      row += "</tr>";
      res1 += row;
    }
    

    res1 += "</tbody></table>";
    var htlm = '<div class="modal-content">' + res1 + "<div>";

    var message1 = `
  <h3>Cám ơn bạn đã tới nhà hàng chúng tôi</h3>
  <h5>Thông tin đơn đặt gồm</h5>
  <ul>
    <li>Họ tên: ${orders.name}</li>
    <li>Địa chỉ: ${orders.address}</li>
    <li>SĐT: ${orders.phone}</li>
    <li>Số lượng khách: ${orders.qtyCustomer}</li>
    <li>Ngày đặt: ${orders.date} ${orders.hour}h ${orders.minute}'</li>
    <li>Món ăn: ${htlm}</li>
    <li>Tổng tiền: ${orders.total}</li>
  </ul>
  `;

    var mail = {
      Host: "smtp.gmail.com",
      Username: "n.t.lam10101998@gmail.com",
      Password: "Ihatey0u!@",
      SecureToken: "fdc24250-e2e0-479d-9c95-81035c168890",
      To: orders.email,
      From: "n.t.lam10101998@gmail.com",
      Subject: messages1,
      Body: message1,
    };

    // localStorage.setItem("ordersuccess", JSON.stringify(res));

    Email.send(mail).then((message) => alert(message));
    callAPI(`order/${id+1}`,"DELETE",null).then(res => {
      show();
    })
  });

    // var orders = JSON.parse(localStorage.getItem("ordersuccess")) || [];
    
    
  }
}

function showDetail(id) {
  // var ordersuccess = JSON.parse(localStorage.getItem("ordersuccess")) || [];
  var ordersuccess;
  callAPI("order", "GET", null).then((res) => {
    ordersuccess = res.data;
    for (i in ordersuccess) {
      if (ordersuccess[i].id == id) {
        var product = ordersuccess[i].product;
        var res = `
        <table class="table" name='tab'>
        <thead>
            <tr class="thead-dark">
                <th></th>
                <th></th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
            </tr>
        </tr>
        </thead>
        <tbody id="tab">
        `;
        for (j in product) {
          var name = product[j].nameDish;
          var qty = product[j].qtyDish;
          var price = parseFloat(product[j].priceDish);
          var img = product[j].img;
          var total = parseFloat(qty * price);
          var html = `
          <img src="${img}" alt="Card image cap" style="width: 80px; height: 80px;"> `;
          var row = "<tr class='table-success'>";
          let ii = j;
          ii++;
          row += "<td>" + ii + "</td>";
          row += "<td>" + html + "</td>";
          row += "<td>" + name + "</td>";
          row += "<td>" + price + "₫" + "</td>";
          row += "<td>" + qty + "</td>";
          row += "<td>" + total + "₫" + "</td>";
          row += "</tr>";
          res += row;
        }
        res += "</tbody></table>";
        var htlm = '<div class="modal-content">' + res + "<div>";
        document.getElementById("myModal").innerHTML = htlm;
        break;
      }
    }
    cls();
  });
}
var modal = document.getElementById("myModal");
function cls() {
  modal.style.display = "block";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
