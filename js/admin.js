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
function onloadAdmin() {
  // var users = JSON.parse(localStorage.getItem("users")) || 0;
  var coutUser = 0;
  var coutOff = 0;
  var coutMenu = 0;
  var product = [];
  var oneproduct;
  var coutOrdersuccess = 0;
  var user;
  callAPI("users", "GET", null).then((res) => {
    user = res.data;
    for (i in user) {
      coutUser++;
    }
    document.getElementById("coutUser").innerHTML = coutUser;
  });
  //   var menu = JSON.parse(localStorage.getItem("menu")) || 0;
  var menu;
  callAPI("products", "GET", null).then((res) => {
    menu = res.data;
    for (i in menu) {
      for (j = 0; j < menu[i].list.length; j++) {
        oneproduct = menu[i].list[j];
        product.push(oneproduct);
      }
    }
    for (i = 0; i < product.length; i++) {
      coutMenu++;
    }
    document.getElementById("coutProduct").innerHTML = coutMenu;
  });
  //   var ordersuccess = JSON.parse(localStorage.getItem("ordersuccess")) || 0;
  var ordersuccess;
  callAPI("order", "GET", null).then((res) => {
    ordersuccess = res.data;
    for (i in ordersuccess) {
      coutOrdersuccess++;
    }
    document.getElementById("coutOrder").innerHTML = coutOrdersuccess;
  });
  var dateOff = JSON.parse(localStorage.getItem("dateOff")) || 0;

  for (i in dateOff) {
    coutOff++;
  }
  document.getElementById("coutOff").innerHTML = coutOff;
}
