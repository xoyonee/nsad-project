$(document).ready(function () {
  // 메인배너/////////////////////////////////////////////////////////////
  let m_banner_count = $(".banner").length;
  let mb_index_no = 1;
  let best_index_no = 1;
  let timer = 1000;

  // 배너 초기화
  $(".banner").eq(0).css({ left: 0 });
  $(".best_items").eq(0).css({ left: 0 });

  // 인디 삽입 초기화
  for (let i = 0; i < m_banner_count; i++) {
    $(".indi_box").append('<div class="indi"></div>');
  }
  $(".main_banner").find(".indi").eq(0).addClass("indi_active");
  $(".best_area").find(".indi").eq(0).addClass("indi_active");

  // 슬라이드 동작
  function slide(el, el2, c_bang, c_pos, o_bang, o_pos, timer) {
    clearInterval(interval);
    btn_init(timer);

    el.eq(c_bang)
      .css({
        left: c_pos,
      })
      .animate(
        {
          left: 0,
        },
        timer
      );

    el.eq(o_bang).animate(
      {
        left: o_pos,
      },
      timer
    );

    el2.find(".indi").eq(o_bang).removeClass("indi_active");
    el2.find(".indi").eq(c_bang).addClass("indi_active");
  }

  // 인디클릭 동작
  $(".main_banner .indi").click(function () {
    if ($(".main_banner .indi_active").index() < $(this).index()) {
      slide(
        $(".banner"),
        $(".main_banner"),
        $(this).index(),
        "100%",
        $(".main_banner .indi_active").index(),
        "-100%",
        timer
      );
    } else if ($(".main_banner .indi_active").index() > $(this).index()) {
      slide(
        $(".banner"),
        $(".main_banner"),
        $(this).index(),
        "-100%",
        $(".main_banner .indi_active").index(),
        "100%",
        timer
      );
    }
    mb_index_no = $(this).index() + 1;
  });

  $(".best_area .indi").click(function () {
    if ($(".best_area .indi_active").index() < $(this).index()) {
      slide(
        $(".best_items"),
        $(".best_area"),
        $(this).index(),
        "100%",
        $(".best_area .indi_active").index(),
        "-100%",
        timer / 2
      );
    } else if ($(".best_area .indi_active").index() > $(this).index()) {
      slide(
        $(".best_items"),
        $(".best_area"),
        $(this).index(),
        "-100%",
        $(".best_area .indi_active").index(),
        "100%",
        timer / 2
      );
    }
    best_index_no = $(this).index() + 1;
  });

  // 방향 클릭 동작
  $(document).on("click", ".main_banner .next", function () {
    btn_init(timer);

    slide(
      $(".banner"),
      $(".main_banner"),
      mb_index_no % m_banner_count,
      "100%",
      (mb_index_no - 1) % m_banner_count,
      "-100%",
      timer
    );
    mb_index_no += 1;
  });
  $(document).on("click", ".main_banner .prev", function () {
    btn_init(timer);

    mb_index_no -= 1;
    slide(
      $(".banner"),
      $(".main_banner"),
      (mb_index_no - 1) % m_banner_count,
      "-100%",
      mb_index_no % m_banner_count,
      "100%",
      timer
    );
  });

  $(document).on("click", ".best_area .next", function () {
    btn_init(timer / 2);

    slide(
      $(".best_items"),
      $(".best_area"),
      best_index_no % m_banner_count,
      "100%",
      (best_index_no - 1) % m_banner_count,
      "-100%",
      timer / 2
    );
    best_index_no += 1;
  });
  $(document).on("click", ".best_area .prev", function () {
    btn_init(timer / 2);

    best_index_no -= 1;
    slide(
      $(".best_items"),
      $(".best_area"),
      (best_index_no - 1) % m_banner_count,
      "-100%",
      best_index_no % m_banner_count,
      "100%",
      timer / 2
    );
  });

  // 버튼 막기
  function btn_init(timer) {
    $(".btn_banner_arrow, .indi, .btn_event_arrow").css({
      pointerEvents: "none",
    });

    setTimeout(() => {
      $(".btn_banner_arrow, .indi, .btn_event_arrow").css({
        pointerEvents: "auto",
      });
    }, timer);
  }

  // 자동 슬라이드
  let interval;
  function auto_slide() {
    clearInterval(interval);
    interval = setInterval(function () {
      $(".main_banner .next").trigger("click");
    }, timer * 6);
  }

  // 호버 움직임
  $(".main_banner").hover(
    function () {
      clearInterval(interval);
    },
    function () {
      auto_slide();
    }
  );
  auto_slide();

  // 휠 이벤트
  function wheel_scroll(offset_top) {
    event.preventDefault();
    $("html, body").stop(true).animate(
      {
        scrollTop: offset_top,
      },
      timer
    );
  }
  $(".main_banner, .about_nsad").on("mousewheel DOMMouseScroll", function (e) {
    wheel_chk = true;
    let o_top;
    let dir = event.wheelDelta;

    if (wheel_chk && $(this).hasClass("wheel") == true) {
      wheel_chk = false;
      setTimeout(() => {
        wheel_chk = true;
      }, timer);

      if (dir > 0 && $(this).prev(".main_banner").length > 0) {
        o_top = $(this).prev().offset().top;
        wheel_scroll(o_top);
      } else if (dir < 0 && $(this).next(".about_nsad").length > 0) {
        o_top = $(this).next().offset().top;
        wheel_scroll(o_top);
      } else if (dir > 0 && $(this).hasClass("main_banner") == true) {
        o_top = $(this).offset().top;
        wheel_scroll(o_top);
      }
    }
  });

  //sec////////////////////////////////////////////////////////////////////////////////
  // 스크롤 이벤트
  let s_top;
  let s_bot;

  let fw_o_top = $(".look_book_box").offset().top;
  let ss_o_top = $(".look_book_ss").offset().top;
  let special_o_top = $(".special").offset().top;
  let event_area_o_top = $(".event_area").offset().top;
  let new_collection_o_top = $(".new_collection").offset().top;
  let best_slide_hi = $(".best_slide").height();

  // 오프셋 값 다시 구하기
  $(window).resize(function () {
    fw_o_top = $(".look_book_box").offset().top;
    ss_o_top = $(".look_book_ss").offset().top;
    special_o_top = $(".special").offset().top;
    event_area_o_top = $(".event_area").offset().top;
    new_collection_o_top = $(".new_collection").offset().top;
  });

  // 아래에서 위로 이동
  function act_move_bot(el, this_o_top) {
    if (s_bot - 150 >= this_o_top) {
      for (let j = 0; j < el.length; j++) {
        el.addClass("op_active");
        el.eq(j)
          .addClass("op_active")
          .css({
            transitionDelay: 0.2 * j + "s",
          });
      }
    }
  }

  // 옆에서 title이동
  function act_title_move(el, this_o_top) {
    if (s_bot - 50 >= this_o_top) {
      el.addClass("title_active");
    }
  }
  let win_wid = window.innerWidth;

  $(window).scroll(function () {
    s_top = $(window).scrollTop();
    s_bot = s_top + $(window).height();
    act_move_bot($(".look_book .title"), fw_o_top);
    act_move_bot($(".look_book_fw .look_book_list"), fw_o_top);
    act_move_bot($(".look_book_ss .look_book_list"), ss_o_top);
    act_move_bot($(".special"), special_o_top);
    act_title_move($(".event_area .title"), event_area_o_top);
    act_title_move($(".new_collection .title"), new_collection_o_top);
  });

  // 768사이즈에서 올라오는 값
  if (win_wid <= 768) {
    for (
      let j = 0;
      j <
      $(
        ".look_book .title, .look_book_fw .look_book_list, .look_book_ss .look_book_list"
      ).length;
      j++
    ) {
      $(
        ".look_book .title, .look_book_fw .look_book_list, .look_book_ss .look_book_list"
      ).addClass("op_active");
      $(
        ".look_book .title, .look_book_fw .look_book_list, .look_book_ss .look_book_list"
      )
        .eq(j)
        .addClass("op_active")
        .css({
          transitionDelay: 0.2 * j + "s",
        });
    }
  }

  // 메인배너 밑 화사표
  let about_nsad = $(".about_nsad").offset().top;
  $(".main_b_icon").click(function () {
    $("body, html").animate(
      {
        scrollTop: about_nsad,
      },
      1000
    );
  });

  // 자바스크립트
  // new collection
  let new_item = document.getElementsByClassName("item");
  let item_a = document.getElementsByClassName("item_a");

  for (let i = 0; i < new_item.length; i++) {
    new_item[i].addEventListener("mouseenter", function () {
      if (win_wid <= 1350) {
        item_a[i].children[1].style.bottom = "-50px";
      } else {
        item_a[i].children[1].style.bottom = "0";
      }
      item_a[i].children[0].style.transform = "scale(1.2)";
    });
    new_item[i].addEventListener("mouseleave", function () {
      item_a[i].children[0].style.transform = "scale(1)";
      item_a[i].children[1].style.bottom = "-150px";
    });
  }
  window.addEventListener("resize", function () {
    win_wid = window.innerWidth;
  });
});
