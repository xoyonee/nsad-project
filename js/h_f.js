$(window).ready(function () {
  function header_color() {
    s_top = $(window).scrollTop();
    s_bot = s_top + $("header").outerHeight();
    sec_about = $(".about_nsad").offset().top;

    if (s_bot >= sec_about) {
      $("header").addClass("header_active");
      $("#bugger .line").addClass("line_active");

      $(".header_icon").eq(0).attr("src", "img/header_search_icon.png");
      $(".header_icon").eq(1).attr("src", "img/header_cart_icon.png");
      $(".header_icon").eq(2).attr("src", "img/header_mypage_icon.png");
    } else if (s_bot <= sec_about) {
      $("header").removeClass("header_active");
      $("#bugger .line").removeClass("line_active");

      $(".header_icon").eq(0).attr("src", "img/header_search_icon_fff.png");
      $(".header_icon").eq(1).attr("src", "img/header_cart_icon_fff.png");
      $(".header_icon").eq(2).attr("src", "img/header_mypage_icon_fff.png");
    }
  }

  let url = location.href;
  url_index = url;
  url = url.split("nsad/")[1];

  if (
    url == "index.html" ||
    url_index == "http://yeonee27.dothome.co.kr/nsad/"
  ) {
    $(window).scroll(function () {
      console.log("fdsfd");
      header_color();
    });

    $(window).resize(function () {
      header_color();
    });
  }

  let btn_close = document.getElementsByClassName("btn_close")[0];
  let btn_bugger = document.getElementById("bugger");
  let bugger_menu_chk = false;
  let bugger_pan = document.getElementById("bugger_pan");

  btn_bugger.addEventListener("click", function () {
    if (!bugger_menu_chk) {
      bugger_pan.style.right = "0%";
    }
    bugger_menu_chk = true;
  });

  btn_close.addEventListener("click", function () {
    if (bugger_menu_chk) {
      bugger_pan.style.right = "-100%";
    }
    bugger_menu_chk = false;
  });

  // 탑버튼
  let bnt_top = document.getElementById("btn_top");
  bnt_top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
