$(document).ready(function(){

    let cate_no = get_url_info("cate_no");
    let item_no = get_url_info("item_no");
    
    const ITEM = ITEM_LIST[cate_no][item_no-1];
    
    load_detail_img(cate_no, item_no);
            
    let size_box = document.getElementsByClassName('size_box');
    let scroll_box = document.getElementsByClassName('scroll_box')[0];
        
    // color_box 클릭하면 opt_container에 옵션 들어가게
    let btn_chk = [true, true, true];
    for(let i=0; i<size_box.length; i++){
        size_box[i].addEventListener('click', function(){
            if(btn_chk[i] == true) {
                btn_chk[i] = false;
                size_box[i].style.border = "1px solid #003594";
                let item_size = size_box[i].children[0].innerText;
                
                let opt_list = `
                <div class="opt_box flex_container">
                    <div class="opt_name">
                        <div>${item_size}</div>
                    </div>
                    <div class="opt_qty">
                        <input type="button" class="btn_qty btn_minus" value="-">
                        <input type="text" class="txt_qty" value="1">
                        <input type="button" class="btn_qty btn_plus" value="+">
                    </div>
                    <div class="opt_price">
                        <div>￦${ITEM.s_price.toLocaleString()}</div>
                    </div>
                    <input type="text" class="from_opt_index" value="${i}">
                    <svg class="op_close" version="1.1" id="레이어_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1.9 1.9" style="enable-background:new 0 0 1.9 1.9;" xml:space="preserve">
                        <g>
                        <line class="st0" x1="0.2" y1="0.2" x2="1.7" y2="1.7"/>
                        </g>
                        <g>
                        <line class="st0" x1="0.2" y1="1.7" x2="1.7" y2="0.2"/>
                        </g>
                    </svg>
                </div>
                `;
                scroll_box.innerHTML += opt_list;
                
                tatal_price();
            }
            else {
                alert("이미 선택한 상품 입니다.");
            }
        });
    }
    
    // 옵션에서 X 누르면 해당 옵션박스 삭제
    $(document).on('click', '.op_close', function(){   
        let tmp_opt_no = $(this).prev('.from_opt_index').val()
        size_box[tmp_opt_no].style.border = "1px solid #fff";
        btn_chk[ tmp_opt_no ] = true;
        $(this).parent('.opt_box').remove();
        tatal_price();
    });
    
    // 옵션에서 +, - 누르면 해당꺼만 숫자 바뀌게 하기
    $(document).on('click', '.btn_plus', function(){   
        let tmp_qty = Number($(this).prev('.txt_qty').val()) + 1;
        $(this).prev('.txt_qty').val(tmp_qty);
        tatal_price();
    });
    $(document).on('click', '.btn_minus', function(){   
        let tmp_qty = Number($(this).next('.txt_qty').val()) - 1;
        
        if($(this).next('.txt_qty').val() > 1) {
            $(this).next('.txt_qty').val(tmp_qty)
            tatal_price(); 
        } 
        else {
            alert("최소 주문 수량은 1개 입니다.")
        }
    });
    
    function tatal_price() {
        let total_price = 0;
        
        // 옵션 리스트 관련 계산
        for(let i=0; i<$('.opt_container .opt_box').length; i++) {
            total_price += $('.opt_box').eq(i).find('.txt_qty').val() * ITEM.s_price
        }
        
        // 선불, 착불 관련 계산
        if($('.sel_del_option').val() == "착불") {
            total_price += 2500;
        }
                
        $('.final_price').text(total_price.toLocaleString())
        
    }


    // 스크롤
    let item_info = document.getElementById('item_info');
    let item_info_h = item_info.clientHeight;
    const d_menu = document.getElementById('d_menu');
    let menu_in = document.getElementsByClassName('menu_in');
    const footer = document.getElementsByTagName('footer')[0];

    // 각 섹션 o_top o_bot
    let d_product = document.getElementById('d_product');
    let d_guide = document.getElementById('d_guide');
    let d_review = document.getElementById('d_review');
    let d_qna = document.getElementById('d_qna');

    let d_product_o_top = d_product.offsetTop;
    let d_guide_o_top = d_guide.offsetTop;
    let d_review_o_top = d_review.offsetTop;
    let d_qna_o_top = d_qna.offsetTop;

    let d_product_o_bot = d_product_o_top + d_product.clientHeight;
    let d_guide_o_bot = d_guide_o_top + d_guide.clientHeight;
    let d_review_o_bot = d_review_o_top + d_review.clientHeight;
    let d_qna_o_bot = d_qna_o_top + d_qna.clientHeight;
    
    function line_move(sec_o_top, sec_o_bot, i){
        if(s_top >= sec_o_top && s_top <= sec_o_bot){
            menu_in[i].style.color = "#003594"
            menu_in[i].style.fontWeight = 900
        }
        else{
            menu_in[i].style.color = "#aaa"
            menu_in[i].style.fontWeight = 100
        }
    }

    // item_info 사이드 fiex 움직이기
    let s_top = window.scrollY;
    
    let f_o_top = footer.offsetTop;
    const d_menu_o_top = d_menu.offsetTop;

    const item_info_m = document.getElementsByClassName('item_info_m')[0];

    let info_top = Number(f_o_top - item_info_h - 61); 

    function s_op_move(){
        if(window.innerWidth > 900){
            info_top = Number(f_o_top - item_info_h - 61)
            
            if(s_top >= info_top){
                item_info.style.position = 'absolute';
                item_info.style.top = info_top+'px';
            }
            else{
                item_info.style.position = 'fixed';
                item_info.style.top = '70px';
            }
        }
    }

    // 메뉴 상단 고정
    function menu_fixed(){
        if(s_top >= d_menu_o_top){
            d_menu.style.position = 'sticky';
            d_menu.style.top = '59px';
            d_menu.style.left = '0px';
        }
        else{
            d_menu.style.position = 'static';
        }
    }
    let btn_slider = document.getElementById('btn_slider');
    let slider_top = document.getElementById('slider_top');
    let btn_top = document.getElementsByClassName('btn_top')[0];

    btn_slider.addEventListener('click', function(){
        if(window.innerWidth > 900){
            item_info.style.top = "70px";
        }
        else{
            item_info.style.top = 0;
        }
        document.body.style.overflow = 'hidden';
        btn_top.style.transform = "rotate(90deg)";

    });
    slider_top.addEventListener('click', function(){
        if(window.innerWidth > 900){
            item_info.style.top = "70px";
        }
        else{
            item_info.style.top = "101%";
        }
        document.body.style.overflow = 'auto';
        btn_top.style.transform = "rotate(-90deg)";
    });

    window.addEventListener('touchmove', function(e){
        if(item_info.style.top >= '101%'){
            document.body.style.overflow = 'auto';
        }
    })


    window.addEventListener('scroll', function(){
        item_info_h = item_info.clientHeight;
        s_top = window.scrollY;
        s_bot = s_top + window.innerHeight;

        f_o_top = footer.offsetTop;

        d_product_o_top = d_product.offsetTop;
        d_guide_o_top = d_guide.offsetTop;
        d_review_o_top = d_review.offsetTop;
        d_qna_o_top = d_qna.offsetTop;

        d_product_o_bot = d_product_o_top + d_product.clientHeight;
        d_guide_o_bot = d_guide_o_top + d_guide.clientHeight;
        d_review_o_bot = d_review_o_top + d_review.clientHeight;
        d_qna_o_bot = d_qna_o_top + d_qna.clientHeight;

        s_op_move();
        line_move(0, d_product_o_bot, 0);
        line_move(d_guide_o_top, d_guide_o_bot, 1);
        line_move(d_review_o_top, d_review_o_bot, 2);
        line_move(d_qna_o_top, d_qna_o_bot, 3);

        //  옵션 높이 줄이기
        if(s_top >= 60 && window.innerWidth > 900){
            item_info_m.style.height = 0;
            item_info_m.style.padding = 0;
        }
        else{
            item_info_m.style.height = '137px';
            item_info_m.style.padding = '1% 0';
        }
            
        //  메뉴 상단 고정
        menu_fixed();
    });

    
    window.addEventListener('resize', function(){
        item_info_h = item_info.clientHeight;

        d_product_o_top = d_product.offsetTop;
        d_guide_o_top = d_guide.offsetTop;
        d_review_o_top = d_review.offsetTop;
        d_qna_o_top = d_qna.offsetTop;

        d_product_o_bot = d_product_o_top + d_product.clientHeight;
        d_guide_o_bot = d_guide_o_top + d_guide.clientHeight;
        d_review_o_bot = d_review_o_top + d_review.clientHeight;
        d_qna_o_bot = d_qna_o_top + d_qna.clientHeight;

        s_top = window.scrollY;
        s_bot = s_top + window.innerHeight;

        f_o_top = footer.offsetTop;

        if(window.innerWidth > 900){
            item_info.style.top = "70px";
            document.body.style.overflow = 'auto';

        }
        else{
            item_info.style.top = "101%";
        }

        s_op_move();
        line_move(0, d_product_o_bot, 0);
        line_move(d_guide_o_top, d_guide_o_bot, 1);
        line_move(d_review_o_top, d_review_o_bot, 2);
        line_move(d_qna_o_top, d_qna_o_bot, 3);
    })


    // 기본 세팅
    s_op_move()
    menu_fixed();
    line_move(0, d_product_o_bot, 0);
    line_move(d_guide_o_top, d_guide_o_bot, 1);
    line_move(d_review_o_top, d_review_o_bot, 2);
    line_move(d_qna_o_top, d_qna_o_bot, 3);
});