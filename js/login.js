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

// var admin = {
//   userName: "admin",
//   password: "admin",
// };
// localStorage.setItem("admin", JSON.stringify(admin));

var customer;
function login() {
  // var users = JSON.parse(localStorage.getItem("users")) || [];
  // var Admin = JSON.parse(localStorage.getItem("admin")) || [];
  var users;
  callAPI("users", "GET", null).then((res) => {
    users = res.data;
    var userName = document.formLogin.userName.value;
    var password = document.formLogin.password.value;
    for(i in users){
      if(users[i].isAdmin == true && userName == users[i].userName && password== users[i].password){
        window.location.href = "admin.html";
      } else {
        if (users[i].isAdmin == false && userName == users[i].userName && password== users[i].password){
          window.location.href = "index.html";
          customer = [
            {
              id: users[i].id,
              userName: users[i].userName,
              name: users[i].name,
            },
          ];
        } 
        else if (userName == users[i].userName || password== users[i].password) {
          document.getElementById("trangthai").style.display = "block";
        }
      }
    }
    // if (userName == Admin.userName && password == Admin.password) {
    //   window.location.href = "admin.html";
    // } else {
    //   for (i in users) {
    //     if (users[i].userName == userName && users[i].password == password) {
    //       window.location.href = "index.html";
    //       customer = [
    //         {
    //           id: users[i].id,
    //           userName: users[i].userName,
    //           name: users[i].name,
    //         },
    //       ];
    //     } else if (
    //       users[i].userName != userName ||
    //       users[i].password != password
    //     ) {
    //       document.getElementById("trangthai").style.display = "block";
    //     }
    //   }
    // }
    localStorage.setItem("customer", JSON.stringify(customer));
  });
}
