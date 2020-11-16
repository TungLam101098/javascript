var product = [];

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

function loadProduct() {
  // var menu = JSON.parse(localStorage.getItem("menu")) || [];
  if (menu.length > 0) {
    show();
  }
}

var id;
function save() {
  // var menu = JSON.parse(localStorage.getItem("menu")) || [];
  var menu = [];
  callAPI("products", "GET", null).then((res) => {
    menu = res.data;
    var e = document.getElementById("selectCategoryProduct");
    var category = e.options[e.selectedIndex].value;
    for (i in menu) {
      if (menu[i].category == category) {
        for (k = 0; k <= menu[i].list.length; k++) {
          id = k;
        }
      }
    }
    var nameProduct = document.getElementById("nameProduct").value;
    var priceProduct = document.getElementById("priceProduct").value;
    var noteProduct = document.getElementById("noteProduct").value;
    var imgProduct = document.getElementById("imgProduct").value;
    if (nameProduct | priceProduct | noteProduct | imgProduct) {
      var oneProduct = {
        id: id,
        name: nameProduct,
        price: priceProduct,
        note: noteProduct,
        img: imgProduct,
        qty: 1,
      };
      var list = [];
      for (j in menu) {
        if (menu[j].category == category) {
          list = menu[j].list;
          list.push(oneProduct);
          callAPI(`products/${menu[j].id}`, "PUT", {
            category: menu[j].category,
            list: list
          }).then((res) => {
            console.log(res);
            show();
            changeCategory();
          });
        }
      }
      // localStorage.setItem("menu", JSON.stringify(menu));
    } else {
      reset();
    }
  });
}
function show() {
  let html = `
  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
  <thead>
    <tr>
      <th>Id</th>
      <th>Tên sản phẩm</th>
      <th>Img</th>
      <th>giá</th>
      <th>Ghi chú</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody id="tab">
  </tbody>
</table>
    `;
  document.getElementById("dataTable").innerHTML = html;
  changeCategory();
}

function changeCategory() {
  // var menu = JSON.parse(localStorage.getItem("menu")) || [];
  var menu = [];
  callAPI("products", "GET", null).then((res) => {
    menu = res.data;
    var e = document.getElementById("selectCategory");
    var category = e.options[e.selectedIndex].value;
    let row = "";
    for (i in menu) {
      if (menu[i].category == category) {
        for (j in menu[i].list) {
          row += "<tr >";
          row += "<td>" + menu[i].list[j].id + "</td>";
          row += "<td>" + menu[i].list[j].name + "</td>";
          row +=
            "<td>" +
            `<img src="${menu[i].list[j].img}" style="width: 80px; height: 80px"/>` +
            "</td>";
          row += "<td>" + menu[i].list[j].price + "₫" + "</td>";
          row += "<td>" + menu[i].list[j].note + "</td>";
          row +=
            "<td>" +
            `<button type="button" onclick="editsp(${menu[i].list[j].id})" class="btn btn-success"><i class="fas fa-edit"></i></button>` +
            "</td>";
          row +=
            "<td>" +
            `<button type="button" onclick="deletesp(${menu[i].list[j].id})" class="btn btn-danger"><i class="fa fa-times" aria-hidden="true"></i></button>` +
            "</td>";
          row += "</tr>";
        }
      }
    }

    document.getElementById("tab").innerHTML = row;
  });
}

function editsp(id) {
  // var menu = JSON.parse(localStorage.getItem("menu")) || [];
  var menu = [];
  callAPI(`products`, "GET", null).then((res) => {
    menu = res.data;
    document.getElementById("ok").style.display = "none";
    document.getElementById("edit").style.display = "block";
    var e = document.getElementById("selectCategory");
    var category = e.options[e.selectedIndex].value;
    for (i in menu) {
      if (menu[i].category == category) {
        for (j in menu[i].list) {
          if (menu[i].list[j].id == id) {
            document.getElementById("nameProduct").value = menu[i].list[j].name;
            document.getElementById("priceProduct").value =
              menu[i].list[j].price;
            document.getElementById("noteProduct").value = menu[i].list[j].note;
            document.getElementById("imgProduct").value = menu[i].list[j].img;
          }
        }
        document.getElementById(
          "edit"
        ).innerHTML = `<button type="button" onclick="editok(${menu[i].id},${id})" class="btn btn-success">save</button>`;
      }
    }
  });
}
function editok(id, idsp) {
  // var menu = JSON.parse(localStorage.getItem("menu")) || [];
  var menu;
  callAPI(`products/${id}`, "GET", null).then((res) => {
    menu = res.data;
    var e = document.getElementById("selectCategory");
    var category = e.options[e.selectedIndex].value;
    console.log(menu, category);
    if (menu.category == category) {
      for (j in menu.list) {
        if (menu.list[j].id == idsp) {
          menu.list[j].id = idsp;
          menu.list[j].name = document.getElementById("nameProduct").value;
          menu.list[j].price = document.getElementById("priceProduct").value;
          menu.list[j].note = document.getElementById("noteProduct").value;
          menu.list[j].img = document.getElementById("imgProduct").value;

          callAPI(`products/${id}`, "PUT", menu).then((res) => {
            show();
            changeCategory();
            reset();
          });
        }
      }
    }
  });

  if (document.getElementById("edit").style.display === "block") {
    document.getElementById("edit").style.display = "none";
    document.getElementById("ok").style.display = "block";
  } else {
    document.getElementById("edit").style.display = "block";
    document.getElementById("ok").style.display = "none";
  }
}
function deletesp(idsp) {
  var r = confirm("Are you sure!");
  if (r == true) {
    // var menu = JSON.parse(localStorage.getItem("menu")) || [];
    var menu;
    callAPI(`products`, "GET", null).then((res) => {
      menu = res.data;
      var e = document.getElementById("selectCategory");
      var category = e.options[e.selectedIndex].value;
      for(i in menu){
        if (menu[i].category == category) {
          for (j in menu[i].list) {
            if (menu[i].list[j].id == idsp) {
                  menu[i].list.splice(j, 1);
            }
          }
          callAPI(`products/${menu[i].id}`, "PUT", {
            category: menu[i].category,
            list: menu[i].list
          }).then((res) => {
            show();
          });
        }
      }
      
      
    });
  }
}

function reset() {
  document.getElementById("nameProduct").value = "";
  document.getElementById("priceProduct").value = "";
  document.getElementById("noteProduct").value = "";
  document.getElementById("imgProduct").value = "";
}
