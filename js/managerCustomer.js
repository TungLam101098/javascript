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

var user = [];
function loadCus() {
  var users;
  callAPI('users','GET',null).then(res => {
    users = res.data;
    if (users.length > 0) {
      show();
    }
  })
}

var id;
function save() {
  // var users = JSON.parse(localStorage.getItem("users")) || [];
  var nameCus = document.getElementById("nameCus").value;
  var passwordCus = document.getElementById("passwordCus").value;
  var fullName = document.getElementById("fullnameCus").value;
  var phoneCus = document.getElementById("phoneCus").value;
  var emailCus = document.getElementById("emailCus").value;
  let addressCus = document.getElementById("addressCus").value;
  if (nameCus | passwordCus | fullName | phoneCus | emailCus | addressCus) {
    var oneCus = {
      userName: nameCus,
      password: passwordCus,
      name: fullName,
      phone: phoneCus,
      email: emailCus,
      address: addressCus,
      isAdmin: false
    };
    callAPI('users','POST',oneCus).then(res => {
      show();
      reset();
    })
  } else {
    reset();
  }
  
}
function show() {
  // var users = JSON.parse(localStorage.getItem("users")) || [];
  var users;
  callAPI('users','GET',null).then(res => {
    users = res.data;
    let html = `
  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
  <thead>
    <tr>
      <th>Id User</th>
      <th>Tên đăng nhập</th>
      <th>Mật khẩu</th>
      <th>Họ tên</th>
      <th>SĐT</th>
      <th>Email</th>
      <th>Address</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody id="tab">
  </tbody>
</table>
    `;
  document.getElementById("dataTable").innerHTML = html;
  let row = "";
  for (i in users) {
    row += "<tr >";
    row += "<td>" + users[i].id + "</td>";
    row += "<td>" + users[i].userName + "</td>";
    row += "<td>" + users[i].password + "</td>";
    row += "<td>" + users[i].name + "</td>";
    row += "<td>" + users[i].phone + "</td>";
    row += "<td>" + users[i].email + "</td>";
    row += "<td>" + users[i].address + "</td>";
    row +=
      "<td>" +
      `<button type="button" onclick="editsp(${i})" class="btn btn-success"><i class="fas fa-edit"></i></button>` +
      "</td>";
    row +=
      "<td>" +
      `<button type="button" onclick="deletesp(${i})" class="btn btn-danger"><i class="fa fa-times" aria-hidden="true"></i></button>` +
      "</td>";
    row += "</tr>";
  }
  document.getElementById("tab").innerHTML = row;
  })
  
}
function editsp(id) {
  // var users = JSON.parse(localStorage.getItem("users")) || [];
  document.getElementById("ok").style.display = "none";
  document.getElementById("edit").style.display = "block";
  var users;
  callAPI(`users/${id+1}`, "GET", null).then(res => {
    users = res.data;
    document.getElementById("nameCus").value = users.userName;
    document.getElementById("passwordCus").value = users.password;
    document.getElementById("fullnameCus").value = users.name;
    document.getElementById("phoneCus").value = users.phone;
    document.getElementById("emailCus").value = users.email;
    document.getElementById("addressCus").value = users.address;
    document.getElementById(
      "edit"
    ).innerHTML = `<button type="button" onclick="editok(${id+1})" class="btn btn-success">save</button>`;
  })
}
function editok(id) {
  // var users = JSON.parse(localStorage.getItem("users")) || [];
  var users;
  callAPI(`users/${id}`,'GET',null).then (res => {
    users = res.data;
    users.userName = document.getElementById("nameCus").value;
    users.password = document.getElementById("passwordCus").value;
    users.name = document.getElementById("fullnameCus").value;
    users.phone = document.getElementById("phoneCus").value;
    users.email = document.getElementById("emailCus").value;
    users.address = document.getElementById("addressCus").value;
    callAPI(`users/${id}`,'PUT',users).then(res=> {
      if (document.getElementById("edit").style.display === "block") {
        document.getElementById("edit").style.display = "none";
        document.getElementById("ok").style.display = "block";
      } else {
        document.getElementById("edit").style.display = "block";
        document.getElementById("ok").style.display = "none";
      }
    
      show();
      reset();
    })
    
  })
}
function deletesp(id) {
  var r = confirm("Are you sure!");
  if(r == true){
    // var users = JSON.parse(localStorage.getItem("users")) || [];
    callAPI(`users/${id+1}`,"DELETE",null).then(res => {
      show();
    })
    
  }
  
}

function reset() {
  document.getElementById("nameCus").value = "";
  document.getElementById("passwordCus").value = "";
  document.getElementById("fullnameCus").value = "";
  document.getElementById("phoneCus").value = "";
  document.getElementById("emailCus").value = "";
  document.getElementById("addressCus").value = "";
}
