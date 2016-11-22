$(document).ready(function () {
// $(function() {


    if (typeof $.cookie('auth') == 'undefined') {
        createCookie('auth', null);
    }

    var cl = (conf.termek.ht.max + conf.termek.fd.max + conf.termek.bkt.max + conf.termek.szsz.max + conf.termek.szhej.max);

    content = checkUrl(cl);

    if ($.cookie('auth') == "null") {


        $('.right_box').each(function () {
            if ($(this).hasClass("login"))
            {
                $(this).removeClass("display_none");
            }
        });

        if (content != "index") {
            var newContent = protected(content + ".html", false);
            //if(newContent != null) { urlSupplement(newContent); }
        }

        $('#' + (content == 'index' ? 'content' : 'top') + '_login').show();
        $('#' + (content == 'index' ? 'content' : 'top') + '_logined').hide();
        setTimeout(function () {
            loginFormEvents(cl, '.code_inp', '.code_but');
        }, 20);
    } else {
        
        $('.kerdesekesvalaszok_box2').removeClass("display_none");


        $('.right_box').each(function () {
            if ($(this).hasClass("default_right_box"))
            {
                $(this).removeClass("display_none");
            }
            if ($(this).hasClass("kisokos_box2"))
            {
                $(this).removeClass("display_none");
            }

        });



        $("#content_login").html('<div class="txt">Ön be van jelentkezve</div> <button class="code_logout">Kilépés</button>');

        $('#' + (content == 'index' ? 'content' : 'top') + '_login').hide();
        $('#' + (content == 'index' ? 'content' : 'top') + '_logined').show();
        codeChecking(cl, '', false);

        setTimeout(function () {
            logoutFormEvents();
        }, 20);
    }
    
    
    var loc = window.location;
        var content = loc.href.substring((loc.href.lastIndexOf('/') + 1));
    if  ( (content.indexOf("dokumentumok.html")>=0))
    {
        if ((getUrlParameter("hitelkartya_atfogo")))
        {
            
            var linktoscroll = $('a[href^="pdf/hitelkartya_atfogo_hitelfedezeti_biztositas.pdf"]');
            $('html, body').animate({
                        scrollTop: $(linktoscroll).offset().top
           }, 500);
        }
       
    }

    setTimeout(function () {
        $('a').each(function () {
            if ($(this).attr('href') && $(this).attr('href') != "#" &&
                    $(this).attr('href').indexOf('www') == -1 &&
                    $(this).attr('href').indexOf('javascript') == -1
                    ) {
                $(this).click(function () {
                    
                    if (($(this).hasClass('cat_pdf')) || ( ($(this).attr('href').indexOf("pdf")>=0)) || ( ($(this).attr('href').indexOf("dokumentumok.html#en")>=0)) )
                    {
                        
                    }
                    else
                    {
                        
                    urlSupplement($(this).attr('href'));
                    return false;
                    }
                });
            }
        });
    }, 100);

    $(".mobil_menu").click(function (e) {
        e.preventDefault();
        $(".wrapper").toggleClass("menu_act");
    });

    $(".open_wizz_layer").click(function () {
     $(".wizz_layer").toggleClass("layer_act");
     });
     
     $(".layer_close").click(function () {
     $(this).parent(".layer").toggleClass("layer_act");
     });

    $(".cont_prod").find("div").each(function () {
        if ($(this).hasClass("txt"))
        {
            var html = $(this).html();
            var html_orig = html;
                                    
            html = html.replace(/<!--kartya_tipus_html-->/g, '<span id="kartya_tipus_html"></span>');
            $(this).html(html);
            
            if (html_orig != html)
            {
                var html_fontos = $(".fontos_panel").html();            
                html_fontos = html_fontos.replace(/<!--kartya_fontos_html-->/g, '<span id="kartya_fontos_html"></span>');
                $(".fontos_panel").html(html_fontos);            
            }

            

            if ($.cookie('auth') != "null") {
                var c = $.cookie('auth').toUpperCase();

                if (c[4] == "A")
                {
                    
                       
                    
                    
                    $("#kartya_tipus_html").load("remote/standard.html?id=" + Math.round(Math.random() * 10000), function () {
                       
                    });
                    
                     $.ajax({
                    dataType: "html",
                    url: "remote/standard_fontos.html",
                    method: 'post',
                    async: false,
                    noCache: true,

                }).done(function (result) {
                    $("#kartya_fontos_html").html(result);
                });
                    
                } else if (c[4] == "B")
                {
                    $("#kartya_tipus_html").load("remote/gold.html?id=" + Math.round(Math.random() * 10000), function () {                                               
                    });
                    
                    $.ajax({
                    dataType: "html",
                    url: "remote/gold_fontos.html",
                    method: 'post',
                    async: false,
                    noCache: true,

                }).done(function (result) {
                    $("#kartya_fontos_html").html(result);
                });
                    
                    
                } else if (c[4] == "N")
                {
                    $("#kartya_tipus_html").html('<p><strong>Amennyiben Ön jelenleg folyószámlahitellel rendelkezik, úgy az ügyfélszámlák átadását követően hitelkerete változatlan összeggel és kamatfeltételekkel kerül beállításra az Erste Banknál.</strong></p><h2>Fontos tudnivalók:</h2>');
                }


                // if (c[])

            }



        }

    });

    clickRightBoxOpenLayer();

    


    var url = window.location.href;
    var filename = url.split('/').pop().split('#')[0].split('?')[0];


    var megvan = false;

    $(".top_nav").find("li").each(function () {
        megvan = false;
        $(this).find("a").each(function () {
            if ($(this).attr('href') == filename)
            {
                megvan = true;
            }
            
             if ($(this).hasClass("szegmens_termek_oldal_link"))
        {
            
            
            if (url.indexOf("szolgaltatasok") > 0)
            {
                megvan = true;
            }
        }

        });
        if (megvan)
        {
            if (!$(this).hasClass("act"))
            {
            $(this).addClass('act');
        }
        }


       
    });


});