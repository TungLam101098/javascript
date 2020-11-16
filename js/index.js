
function onloadIndex() {
  var customer = JSON.parse(localStorage.getItem("customer")) || [];
  if (customer.length > 0) {
    document
      .getElementById("login")
      .setAttribute("style", "display: none!important");
    document
      .getElementById("order")
      .setAttribute("style", "display: block!important");
    document
      .getElementById("register")
      .setAttribute("style", "display: none!important");

    document.getElementById("userName").innerHTML = customer[0].name;
  } else {
    document
      .getElementById("order")
      .setAttribute("style", "display: none!important");
    document
      .getElementById("userName")
      .setAttribute("style", "display: none!important");
    document
      .getElementById("logout")
      .setAttribute("style", "display: none!important");
  }
}
document.getElementById("logout").addEventListener("click", function () {
  document
    .getElementById("order")
    .setAttribute("style", "display: none!important");
  localStorage.removeItem("customer");
  window.location.href="login.html";
});
