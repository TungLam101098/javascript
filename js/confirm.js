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

function confirmEmail() {
  var saveUser;
  var user = JSON.parse(localStorage.getItem("user"));
  saveUser = {
    userName: user.userName,
    password: user.password,
    name: user.name,
    phone: user.phone,
    email: user.email,
    address: user.address,
    isAdmin: false,
  };
  var code = document.formLogin.code.value;
  var codeEmail = user.confirm;
  if (codeEmail == code) {
      callAPI('users','POST',saveUser).then(res => {
        window.location.href = "login.html";
      })
  } else {
    document.getElementById("trangthai").style.display = "block";
  }
}

function sentEmail(){
  var user = JSON.parse(localStorage.getItem("user"));
  var val = user.confirm;
  var message = `
          <h3>Xác nhận Email</h3>
          <ul>
          <li>Mã xác nhận của bạn là:<h5>${val}</h5> </li>
          </ul>
          <span>Cám ơn bạn đã đăng kí tài khoản!</span>
          `;
  Email.send({
    Host: "smtp.gmail.com",
    Username: "n.t.lam10101998@gmail.com",
    Password: "Ihatey0u!@",
    SecureToken: "fdc24250-e2e0-479d-9c95-81035c168890",
    To: user.email,
    From: "n.t.lam10101998@gmail.com",
    Subject: "Xác nhận email",
    Body: message,
  }).then((message) => alert(message));
}