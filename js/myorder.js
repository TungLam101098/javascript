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

// var ordersuccess = JSON.parse(localStorage.getItem("ordersuccess")) || [];
function loadmyorder() {
  var ordersuccess;
  var customer = JSON.parse(localStorage.getItem("customer")) || [];
  callAPI("order", "GET", null).then((res) => {
    ordersuccess = res.data;
    for (i = 0; i < ordersuccess.length; i++) {
      if (customer[0].id == ordersuccess[i].idCustomer) {
        if (ordersuccess[i].messages == "Đang chờ xử lý") {
          var classspan = "btn btn-danger";
        } else {
          classspan = "btn btn-primary";
        }
        var htmlname = `
          <div class="col-lg-6 col-md-6 col-sm-12" style="margin-bottom: 20px;">
           
            <article class="about-info">
                <h2 id="titleName">${ordersuccess[i].name}</h2>
                <p>SĐT: ${ordersuccess[i].phone}</p>
                <p>email: ${ordersuccess[i].email}</p>
                <p>Địa chỉ: ${ordersuccess[i].address}</p>
                <p>Ngày đặt: ${ordersuccess[i].date} - ${ordersuccess[i].hour}h : ${ordersuccess[i].minute}'</p>  
                <p>Số lượng khách: ${ordersuccess[i].qtyCustomer}</p>
                <p>Tổng tiền: ${ordersuccess[i].total}₫</p>
                <button class='btn btn-success' onclick='showDetail(${ordersuccess[i].id})'>Xem chi tiết món ăn</button>
                <span id="checkorder" class="${classspan}" > ${ordersuccess[i].messages}</span>
              </article>
              </div>
            `;
        document.getElementById("about-1").innerHTML += htmlname;
      }
    }
  });
  

}
function showDetail(id) {
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
        console.log(product);
        console.log(res);
        var htlm = '<div class="modal-content">' + res + "<div>";
        document.getElementById("myModal").innerHTML = htlm;
        break;
      }
    }
    cls();
  })
  
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
