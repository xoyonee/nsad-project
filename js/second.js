$(document).ready(function(){
    let cate_no = get_url_info('cate_no');
    
    if(cate_no < ITEM_LIST.length){
        load_items(cate_no, ITEM_LIST[cate_no].length);
    }
    else{
        items_list.innerHTML += '<div class="no_item">업데이트를 기다리세요.</div>';
    }
    

    let item_v_box = document.getElementsByClassName('item_v_box')
    let before_s = 0;
    let even_move = 0;
    let odd_move = 0;

    function move(i, a_move){

        $('.item_v_box').eq(i).css({
            transform: `translateY(${a_move}px)`
        })
        $('.item_v_box').eq(i).find('.inner').css({
            transform: `translateY(${-1 * a_move / 3}px)`
        })
    }

    // 스크롤//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    window.addEventListener('scroll', function(){
        let s_top = window.scrollY;
        
        let calc_s = s_top - before_s;
        let calc_b = before_s - s_top;
        if(calc_s >= 150 || calc_b >= 150){

            for(let i=0; i<item_v_box.length; i++){ 
                if(i % 2 == 0 && window.innerWidth > 480){
                    if(s_top > before_s){
                        even_move += -0.8;
                        move(i, even_move);
                    }
                    else{
                        even_move += 0.8;
                        move(i, even_move);
                    }
                }
                else if(i % 2 != 0 && window.innerWidth > 480){
                    if(s_top > before_s){
                        odd_move += 0.8;
                        move(i, odd_move);
                    }
                    else{
                        odd_move += -0.8;
                        move(i, odd_move);
                    }
                }

                if(window.innerWidth <= 480){
                    if(s_top > before_s){
                        even_move += -0.4;
                        move(i, even_move);
                    }
                    else{
                        even_move += 0.4;
                        move(i, even_move);
                    }
                }
            }
            before_s = s_top;
        }
    });
    
    const item_title = document.getElementsByClassName('item_title');
    const title_txt = document.getElementsByClassName('title_txt');
    const btn_list_box = document.getElementsByClassName('btn_list_box');
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let menu_box_chk = false;

    window.addEventListener('resize', function(){
        for(let i=0; i<item_title.length; i++){
            if(window.innerWidth <= 768){
                item_title[i].children[0].setAttribute("href", "#");
                if(menu_box_chk){
                    document.body.style.overflow = 'hidden';
                }
            }
            else{
                document.body.style.overflow = 'auto';
                item_title[i].children[0].setAttribute("href", "second.html?cate_no="+cate_no+"");
            }
        }
    });
    load_title(cate_no);
    load_menu_title(cate_no);


    let btn_mt = document.getElementsByClassName('btn_mt');
    let mt_chk = false;
    for(let i=0; i<title_txt.length; i++){
        title_txt[i].addEventListener('click', function(){
            btn_list_box[i].classList.toggle('btn_list_box_active')
            if(!mt_chk){
                mt_chk = true;
                btn_mt[i].style.transform = 'rotate(90deg)';
            }
            else{
                mt_chk = false;
                btn_mt[i].style.transform = 'rotate(0)';
            }

        })
    }
    let btn_mm = document.getElementById('btn_mm');
    let menu_box = document.getElementById('menu_box');
    let btn_mmr = document.getElementById('btn_mmr');
    
    
    btn_mm.addEventListener('click', function(){
        btn_mmr.classList.toggle('btn_mmr_active');
        menu_box.classList.toggle('menu_active');
        
        if(!menu_box_chk){
            document.body.style.overflow = 'hidden';
            menu_box_chk = true;
        }
        else if(menu_box_chk){
            document.body.style.overflow = 'auto';
            menu_box_chk = false;
        }
    });


    // 기본 세팅
    for(let i=0; i<item_title.length; i++){
        if(window.innerWidth <= 768){
            item_title[i].children[0].setAttribute("href", "#");
        }
    }
});