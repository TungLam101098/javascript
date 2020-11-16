var choiceDate;
function getinfor() {
  var e = document.getElementById("custom-select-quantity");
  var strCustomer = e.options[e.selectedIndex].value;
  var f = document.getElementById("section-order-hour");
  var strHour = f.options[f.selectedIndex].value;
  var g = document.getElementById("section-order-minute");
  var strMinute = g.options[g.selectedIndex].value;
  var date = document.getElementById("date").value;
  var customer = JSON.parse(localStorage.getItem("customer")) || [];
  if(customer.length == 0 ){
      alert('Vui lòng đăng nhập');
      window.location.href = 'login.html';
  } 
  else if(date == ""){
      alert("Vui lòng chọn ngày đặt bàn!")
  } else {
    choiceDate = {
        idcustomer: customer[0].id,
        userName: customer[0].userName,
        customerNum: strCustomer,
        dateSet: date,
        hourSet:strHour,
        minuteSet: strMinute
        
    }
    window.location.href = 'choice.html';
    
}
  localStorage.setItem("choicedate", JSON.stringify(choiceDate));
}
