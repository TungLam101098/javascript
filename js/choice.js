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

function functionChoice() {
  // menu = JSON.parse(localStorage.getItem("menu"));
  callAPI("products", "GET", null).then((res) => {
    menu = res.data;
    for (i in menu) {
      let category = `
                
                    <li id="menu-item" class="nav-item col-sm-2">
                        <a href="#" data-toggle="tab" role="tab" onclick="showdetailchoice('${menu[i].category}');" aria-selected="true" class="nav-link">${menu[i].category}</a>
                    </li>
                `;
      document.getElementById("demo").innerHTML += category;
    }
    showdetailchoice("khaivi")
  })
}


function showdetailchoice(category) {
  document.getElementById("section-menu-show").innerHTML = ``;
  for (i in menu) {
    if (menu[i].category == category) {
      for (j = 0; j < menu[i].list.length; j++) {
        let element = `
          <!-- single card -->
            <div class="col-lg-3 col-md-4 col-sm-6" id="${category}${menu[i].list[j].id}">
              <div class="card">
                <img class="card-img-top" onclick="showdetail1('${category}',${menu[i].list[j].id}); cls()" src="${menu[i].list[j].img}" alt="Card image cap" style="width: 288px; height: 202px;">
                <div class="card-body" style="height: 178px!important;">
                  <h5 class="card-text">${menu[i].list[j].name}</h5>
                  <span class="price-detail">Giá: <p class="p-price"> ${menu[i].list[j].price}₫</p></span>
                  <button class="btn btn-secondary button-order" id="divbutton${menu[i].list[j].id}" onclick="orderproduct('${category}',${menu[i].list[j].id})" id="btn-order">Đặt món</button>
                  <div class="button-order" id="divqty${menu[i].list[j].id}" style="display: none;">
                  <button class="btn btn-info button-order" onclick="ordered()" id="btn-order">Đặt món thành công</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- end of single card --> 
              `;

        document.getElementById("section-menu-show").innerHTML += element;
      }
    }
  }
}

var modal = document.getElementById("myModal");
function showdetail1(category, id) {
  for (i in menu) {
    if (menu[i].category == category) {
      for (j = 0; j < menu[i].list.length; j++) {
        if (menu[i].list[j].id == id) {
          let modal1 = `
            <!-- The Modal -->
              <div class="modal-content">
                  <div class="row">
                    <!-- single card -->
                    <div class="col-lg-5">
                      <div class="card" >
                        <img class="card-img-top" src="${menu[i].list[j].img}" alt="Card image cap">
                      </div>
                    </div>
                    <!-- end of single card --> 
                    <div class="col-lg-7">
                      <div class="modal-content-detail-product">
                        <h5 class="card-text">${menu[i].list[j].name}</h5>
                        <span class="price-detail">Giá: <p class="p-price"> ${menu[i].list[j].price}₫</p></span>
                        <p>${menu[i].list[j].note}</p>
                        <button type="button" onclick="orderproduct('${category}',${menu[i].list[j].id})" id="shopping-cart"><i class="fa fa-shopping-cart"> đặt món</i></button>
                      </div>
                    </div>
                  </div>
              </div>
          <!-- end of modal -->
            `;
          document.getElementById("myModal").innerHTML = modal1;
        }
      }
    }
  }
    
}
function cls() {
  modal.style.display = "block";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var order = [];
var qtyy = 0;
function orderproduct(category, id) {
  menu = JSON.parse(localStorage.getItem("menu"));
  var orderpro = JSON.parse(localStorage.getItem("order")) || [];
  var divbutton = "divbutton"+id;
  var divqty = "divqty"+id;
  for(i in menu){
    if(menu[i].category == category){
      for(j=0; j< menu[i].list.length;j++){
        if(menu[i].list[j].id == id){
          document.getElementById(divbutton).style.display = "none";
          document.getElementById(divqty).style.display = "block";
        }
      }
    }
  }


  for (i in menu) {
    if (menu[i].category == category) {
      for (j = 0; j < menu[i].list.length; j++) {
        if (menu[i].list[j].id == id) {
          var item = 
              {
                id: menu[i].list[j].id,
                name: menu[i].list[j].name,
                qty: 1,
                price: menu[i].list[j].price,
                note: menu[i].list[j].note,
                img: menu[i].list[j].img
              }
        }
      }
    }
  }
  order = orderpro;
  order.push(item);
  document.getElementById('lblCartCount').innerHTML = order.length;
  localStorage.setItem("order", JSON.stringify(order));
  modal.style.display = "none";
  
}
function ordered(){
  alert('Món ăn đã được thêm vào giỏ hàng!');
}