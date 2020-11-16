$(document).ready(function () {
  var dateOff = JSON.parse(localStorage.getItem("dateOff"));
  var today = new Date();
  var date_input = $('input[name="date"]');
  var container =
    $(".bootstrap-iso form").length > 0
      ? $(".bootstrap-iso form").parent()
      : "body";
  var holiday = dateOff;
  date_input.datepicker({
    format: "mm-dd-yyyy",
    container: container,
    todayHighlight: true,
    autoclose: true,
    startDate: today,
    datesDisabled: holiday
  });
});
if (!localStorage.getItem("menu")) {
  var menu = [
    {
      category: "khaivi",
      list: [
        {
          id: 0,
          name: "salad caesar",
          price: 79000,
          qty: 1,
          note: "Khay sushi cực lớn",
          img: "http://sushikei.vn/wp-content/uploads/2019/08/salad_caesar.png",
        },
        {
          id: 1,
          name: "salad rong biển",
          price: 79000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/08/salad_rong_bien.png",
        },
        {
          id: 2,
          name: "salad hoa quả",
          price: 69000,
          qty: 1,
          note: "Khay sushi cực lớn",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/08/Salad-hoa-quả.png",
        },
        {
          id: 3,
          name: "đậu nành Nhật",
          price: 79000,
          qty: 1,
          note: "Khay sushi vừa",
          img: "http://sushikei.vn/wp-content/uploads/2019/08/dau_nanh.png",
        },
        {
          id: 4,
          name: "bánh xếp chiên",
          price: 69000,
          qty: 1,
          note: "Khay sushi cực lớn",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/08/banh_xep_chien.png",
        },
        {
          id: 5,
          name: "kim chi",
          price: 190000,
          qty: 1,
          note: "Khay sushi vừa",
          img: "http://sushikei.vn/wp-content/uploads/2019/08/kimchi.png",
        },
        {
          id: 6,
          name: "rong biển trộn",
          price: 59000,
          qty: 1,
          note: "Khay sushi cực lớn",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/08/rong_bien_tron.png",
        },
        {
          id: 7,
          name: "đậu phụ lạnh",
          price: 119000,
          qty: 1,
          note: "Khay sushi vừa",
          img: "http://sushikei.vn/wp-content/uploads/2019/08/dau_phu_lanh.png",
        },
      ],
    },
    {
      category: "Sashimi",
      list: [
        {
          id: 0,
          name: "Sashimi sò lông",
          price: 119000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-so-long.png",
        },
        {
          id: 1,
          name: "Sashimi cá trích",
          price: 109000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-ca-trich-ngam-giam.png",
        },
        {
          id: 2,
          name: "trứng cá chuồn",
          price: 129000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-trung-ca-chuon.png",
        },
        {
          id: 3,
          name: "Sashimi bụng cá hồi",
          price: 139000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-bung-ca-hoi.png",
        },
        {
          id: 4,
          name: "Sashimi cá trích",
          price: 129000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-ca-trich-ep-trung.png",
        },
        {
          id: 5,
          name: "Sashimi cá song",
          price: 109000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-ca-song.png",
        },
        {
          id: 6,
          name: "Sashimi 5 loại tổng hợp",
          price: 229000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-5-loai-tong-hop.png",
        },
        {
          id: 7,
          name: "Sashimi sò điệp Nhật",
          price: 129000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-5-loai-tong-hop.png",
        },
      ],
    },
    {
      category: "Sushi",
      list: [
        {
          id: 0,
          name: "Sushi tổng hợp đặc biệt",
          price: 639000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sushi-tong-hop-dac-biet.png",
        },
        {
          id: 1,
          name: "Sushi tổng hợp loại nhỏ",
          price: 209000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sushi-tong-hop-loai-nho.png",
        },
        {
          id: 2,
          name: "Sushi cuộn trứng cá hồi",
          price: 85000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sushi-cuon-trung-ca-hoi.png",
        },
        {
          id: 3,
          name: "Sushi cuộn thịt ghẹ",
          price: 59000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sushi-cuon-thit-ghe.png",
        },
        {
          id: 4,
          name: "Sushi cuộn trứng cá chuồn",
          price: 69000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sushi-cuon-trung-ca-chuon.png",
        },
        {
          id: 5,
          name: "Sushi cà chua",
          price: 19000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sushi-ca-chua.png",
        },
        {
          id: 6,
          name: "Sushi cuộn cá hồi sốt cay",
          price: 65000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sushi-cuon-ca-hoi-sot-cay.png",
        },
        {
          id: 7,
          name: "Sushi cuộn cầu gai",
          price: 105000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sushi-cuon-cau-gai.png",
        },
      ],
    },
    {
      category: "Makimono",
      list: [
        {
          id: 0,
          name: "Cơm cuộn rau quả",
          price: 45000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/com-cuon-rau-qua.png",
        },
        {
          id: 1,
          name: "Cơm cuộn kiểu cầu vòng",
          price: 139000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/com-cuon-cau-vong.png",
        },
        {
          id: 2,
          name: "Cơm cuộn dưa chuột",
          price: 29000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/com-cuon-dua-chuot.png",
        },
        {
          id: 3,
          name: "Cơm cuộn cá hồi",
          price: 110000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/com-cuon-ca-hoi.png",
        },
        {
          id: 4,
          name: "Sashimi cá trích",
          price: 129000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/sashimi-ca-trich-ep-trung.png",
        },
        {
          id: 5,
          name: "Cơm cuộn bơ",
          price: 75000,
          qty: 1,
          note: "Khay sushi vừa",
          img: "http://sushikei.vn/wp-content/uploads/2019/09/com-cuon-bo.png",
        },
        {
          id: 6,
          name: "Cơm cuộn cá ngừ",
          price: 55000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/com-cuon-ca-ngu.png",
        },
        {
          id: 7,
          name: "Cơm cuộn cá hồi",
          price: 110000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/com-cuon-ca-hoi.png",
        },
      ],
    },
    {
      category: "Yakimoni",
      list: [
        {
          id: 0,
          name: "Cơm nướng nhân cá hồi",
          price: 65000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/com-nuong-nhan-ca-hoi.png",
        },
        {
          id: 1,
          name: "Cá tuyết nướng muối",
          price: 295000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/ca-tuyet-nuong-muoi.png",
        },
        {
          id: 2,
          name: "cá thu đao nướng muối",
          price: 105000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/ca-thu-dao-nuong-muoi.png",
        },
        {
          id: 3,
          name: "Cá ba sa nướng muối",
          price: 115000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/ca-basa-nuong-muoi.png",
        },
        {
          id: 4,
          name: "Đầu cá hồi nướng muối",
          price: 109000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/dau-ca-hoi-nuong-muoi.png",
        },
        {
          id: 5,
          name: "Cá hồi nướng muối",
          price: 139000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/ca-hoi-nuong-muoi.png",
        },
        {
          id: 6,
          name: "Cánh gà nướng muối",
          price: 45000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/canh-ga-nuong-muoi.png",
        },
        {
          id: 7,
          name: "Bụng cá hồi nướng muối",
          price: 175000,
          qty: 1,
          note: "Khay sushi vừa",
          img:
            "http://sushikei.vn/wp-content/uploads/2019/09/bung-ca-hoi-nuong-muoi.png",
        },
      ],
    },
  ];
  localStorage.setItem("menu", JSON.stringify(menu));
}
var menu = [];
function functionMenu() {
  menu = JSON.parse(localStorage.getItem("menu"));
  for (i in menu) {
    let category = `
          <ul class="nav nav-tab">
              <li class="nav-item">
                  <a href="#" data-toggle="tab" role="tab" onclick="showdetail('${menu[i].category}');" aria-selected="true" class="nav-link">${menu[i].category}</a>
              </li>
          </ul>
          `;
    document.getElementById("demo").innerHTML += category;
  }
}
