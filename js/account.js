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

function onloadAccount() {
  var customer = JSON.parse(localStorage.getItem("customer"));
  // var user = JSON.parse(localStorage.getItem("users"));
  var user;
  callAPI("users", "GET", null).then((res) => {
    user = res.data;
    for (i in user) {
      if (user[i].id == customer[0].id) {
        document.getElementById("name").value = user[i].name;
        document.getElementById("phone").value = user[i].phone;
        document.getElementById("email").value = user[i].email;
        document.getElementById("address").value = user[i].address;
      }
    }
  });
}

function changeUser() {
  var customer = JSON.parse(localStorage.getItem("customer"));
  // var user = JSON.parse(localStorage.getItem("users"));
  var user;
  callAPI(`users/${customer[0].id}`, "GET", null).then((res) => {
    user = res.data;
    console.log(user);
    // account = user;
    if (user.id == customer[0].id) {
      user.name = document.getElementById("name").value;
      user.phone = document.getElementById("phone").value;
      user.email = document.getElementById("email").value;
      user.address = document.getElementById("address").value;
    }
    callAPI(`users/${customer[0].id}`, "PUT", user).then((res) => {
      alert("Thành công!");
      window.location.href = "index.html";
    });
    // localStorage.setItem("users", JSON.stringify(account));
  });
}

var modal = document.getElementById("myModal");

function changepass() {
  modal.style.display = "block";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
document.getElementById("respassword").addEventListener("keyup", function () {
  var password = document.getElementById("password").value;
  var respassword = document.getElementById("respassword").value;
  if (password !== respassword) {
    document.getElementById("respassword").style.border = "1px solid red";
  } else {
    document.getElementById("respassword").style.border = "1px solid #ced4da";
  }
});
function resetpass() {
  var customer = JSON.parse(localStorage.getItem("customer"));
  // var user = JSON.parse(localStorage.getItem("users"));
  var user;
  callAPI(`users/${customer[0].id}`, "GET", null).then((res) => {
    user = res.data;
    if (user.id == customer[0].id) {
      if (document.getElementById("passOld").value != user.password) {
        alert("Sai mật khẩu cũ!");
      } else {
        if (
          document.getElementById("password").value !=
          document.getElementById("respassword").value
        ) {
          alert("Mật khẩu không khớp!");
        } else {
          user.password = document.getElementById("password").value;
          callAPI(`users/${customer[0].id}`, "PUT", user).then((res) => {
            alert("Thành công!");
            clear();
            modal.style.display = "none";
            window.location.href = "index.html";
          });
        }
      }
    }
  });
}
function clear() {
  document.getElementById("passOld").value = "";
  document.getElementById("password").value = "";
  document.getElementById("respassword").value = "";
}
