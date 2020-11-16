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

function onloadCompleted() {
  var customer = JSON.parse(localStorage.getItem("customer"));
  var choicedate = JSON.parse(localStorage.getItem("choicedate"));
  // var users = JSON.parse(localStorage.getItem("users"));
  var users;
  callAPI("users", "GET", null).then((res) => {
    users = res.data;
    for (i in users) {
      if (users[i].id == customer[0].id) {
        var htmlname = `
            <article class="about-info">
                <h2 id="titleName">${users[i].name}</h2>
                <p>SĐT: ${users[i].phone}</p>
                <p>email: ${users[i].email}</p>
                <p>address: ${users[i].address}</p>
                <p>Số lượng khách: ${choicedate.customerNum}</p>
              </article>
            `;

        document.getElementById("titleName").innerHTML = htmlname;
      }
    }
  });

  var storedOrder = JSON.parse(localStorage.getItem("order"));
  var total1 = JSON.parse(localStorage.getItem("total"));
  var res1 = "";
  for (i in storedOrder) {
    var name = storedOrder[i].name;
    var qty = storedOrder[i].qty;
    var price = parseFloat(storedOrder[i].price);
    var img = storedOrder[i].img;
    var total = parseFloat(qty * price);
    var html = `
    <img src="${img}" alt="Card image cap" style="width: 80px; height: 80px;"> `;
    var ii = i;
    ii++;
    var row = "<tr class='table-success'>";
    row += "<td>" + ii + "</td>";
    row += "<td>" + html + "</td>";
    row += "<td>" + name + "</td>";
    row += "<td>" + price + "₫" + "</td>";
    row += "<td>" + qty + "</td>";
    row += "<td>" + total + "₫" + "</td>";
    row += "</tr>";
    res1 += row;
  }
  var row1 = "<tr>";
  row1 += "<td>" + "Total" + "</td>";
  row1 += "<td></td>";
  row1 += "<td></td>";
  row1 += "<td></td>";
  row1 += "<td></td>";
  row1 += "<td>" + `<span id='sub'>${total1}₫</span>` + "</td>";
  row1 += "</tr>";
  document.getElementById("tab").innerHTML = res1;
  document.getElementById("tr").innerHTML = row1;
}

function confirm() {
  var customer = JSON.parse(localStorage.getItem("customer"));
  var total1 = JSON.parse(localStorage.getItem("total"));
  var ordersuccess = JSON.parse(localStorage.getItem("ordersuccess")) || [];
  var order = JSON.parse(localStorage.getItem("order"));
  // var users = JSON.parse(localStorage.getItem("users"));
  var choicedate = JSON.parse(localStorage.getItem("choicedate"));
  var product = [];
  var users;
  callAPI("users", "GET", null).then((res) => {
    users = res.data;
    for (k in order) {
      oneproduct = {
        nameDish: order[k].name,
        qtyDish: order[k].qty,
        priceDish: order[k].price,
        img: order[k].img,
      };
      product.push(oneproduct);
    }
    for (i in users) {
      if (users[i].id == customer[0].id) {
        for (j = 0; j <= ordersuccess.length; j++) {
          for (k in order) {
            OrderComplete = {
              id: j,
              date: choicedate.dateSet,
              hour: choicedate.hourSet,
              minute: choicedate.minuteSet,
              total: total1,
              idCustomer: users[i].id,
              name: users[i].name,
              nameCustomer: users[i].userName,
              phone: users[i].phone,
              email: users[i].email,
              address: users[i].address,
              qtyCustomer: choicedate.customerNum,
              product: product,
              messages: "Đang chờ xử lý",
              isActive: false,
            };
          }
        }
      }
    }
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
    for (j in order) {
      var name = order[j].name;
      var qty = order[j].qty;
      var price = parseFloat(order[j].price);
      var img = order[j].img;
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

    let message = `
  <h3>Cám ơn bạn đã tới nhà hàng chúng tôi</h3>
  <h5>Thông tin đơn đặt gồm</h5>
  <ul>
    <li>Họ tên: ${OrderComplete.name}</li>
    <li>Địa chỉ: ${OrderComplete.address}</li>
    <li>SĐT: ${OrderComplete.phone}</li>
    <li>Số lượng khách: ${OrderComplete.qtyCustomer}</li>
    <li>Ngày đặt: ${OrderComplete.date} ${OrderComplete.hour}h ${OrderComplete.minute}'</li>
    <li>Món ăn: ${htlm}</li>
    <li>Tổng tiền: ${total1}</li>
  </ul>
  <p>Vui lòng đợi gmail xác nhận của chúng tôi hoặc kiểm tra tình trạng đơn hàng trên website</p>
  `;
    Email.send({
      Host: "smtp.gmail.com",
      Username: "n.t.lam10101998@gmail.com",
      Password: "Ihatey0u!@",
      SecureToken: "fdc24250-e2e0-479d-9c95-81035c168890",
      To: OrderComplete.email,
      From: "n.t.lam10101998@gmail.com",
      Subject: "Đặt bàn tại lamdeptrai!!!",
      Body: message,
    }).then((message) => alert(message));
    callAPI('order','POST',OrderComplete).then(res => {
      ordersuccess.push(OrderComplete);
      localStorage.setItem("ordersuccess", JSON.stringify(ordersuccess));
      localStorage.removeItem("choicedate");
      localStorage.removeItem("order");
      localStorage.removeItem("total");
      alert("Đặt  bàn thành công! Chúng tôi sẽ sớm liên hệ với bạn, xin cảm ơn");
      window.location.href = "index.html";
    })
    
  });
}
function sendEmail() {}
