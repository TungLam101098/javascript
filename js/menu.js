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
                        <a href="#" data-toggle="tab" role="tab" onclick="showdetail('${menu[i].category}');" aria-selected="true" class="nav-link">${menu[i].category}</a>
                    </li>
                `;
      document.getElementById("demo").innerHTML += category;
    }
    showdetail("khaivi");
  });
  
}

function showdetail(category) {
  document.getElementById("section-menu-show").innerHTML = ``;
  for (i in menu) {
    if (menu[i].category == category) {
      for (j = 0; j < menu[i].list.length; j++) {
        let element1 = `
                <!-- simple menu -->
                <div class="col-lg-6"  name="${category}">
                      <div class="tab seciton-menu-img">
                      <img src="${menu[i].list[j].img}" alt="what?" class="menu-img-single" />
                      <div class="section-center-menu">
                        <h4 class="section-center-menu-detail">${menu[i].list[j].name}</h4>
                        <span class="section-center-price">${menu[i].list[j].price}₫</span>
                        <hr class="hr-menu">
                    </div>
                  </div>
                  </div>
                  <!-- end of simple menu -->
                `;

        document.getElementById("section-menu-show").innerHTML += element1;
      }
    }
  }
}
