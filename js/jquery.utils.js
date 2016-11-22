$.fn.extend({
    center: function () {
        this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");

        this.css("left", ((($(window).width()) - (this.outerWidth() * 1)) / 2) + 300 + $(window).scrollLeft() + "px");

        return this;
    }
});

var content = "";


function createCookie(p_Name, p_Value) {
    $.cookie(p_Name, p_Value);
}
function escapeRegExp(p_String) {
    return p_String.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function checkUrl(p_Cl) {
    var loc = window.location;
    var content = loc.href.substring((loc.href.lastIndexOf('/') + 1));
    content = (content.lastIndexOf('.') > -1 ? content.substring(0, content.lastIndexOf('.')) : content);
    //var content = (loc.pathname.lastIndexOf('.') > -1 ? loc.pathname.substring(loc.pathname.lastIndexOf('/') + 1, loc.pathname.lastIndexOf('.')) : null);
    //var pathName = loc.href.substring(conf.url.length);
    //var content = (pathName.lastIndexOf('.') > -1 ? pathName.substring(0, pathName.lastIndexOf('.')) : null);

    if (content == null || content == undefined) {
        content = 'index';
    }

    if (content != null && content != '') {
        code = loc.hash.substring(1);
        if (code != null && code != "en" && code != "" && code != $.cookie('auth')) {
            createCookie('auth', code);
            //codeChecking(p_Cl, content, true);
            codeChecking(p_Cl, conf.termek.def_url, true);
        }

        /*if($.cookie('auth') == 'null') {
         if(window.location.href.indexOf('termek') > -1 || window.location.href.indexOf('termekek') > -1) {
         content = content.substring(0, content.lastIndexOf("-")+1)+"mass";
         urlSupplement(content);
         }
         }*/
    }

    return content;
}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


function urlSupplement(p_Url) {



    var url = p_Url;//+'.html';//+(segment != null && segment != "" ? "-"+segment : "")+'.html';
    if ((url.indexOf("html") < 0) && (url.indexOf("pdf") < 0))
    {
        url = url + ".html";
        p_Url = p_Url + ".html";
    }



    if ($.cookie('auth') != "null") {
        
        
        if (url.indexOf('#' + $.cookie('auth')) < 0)
        {
            
         
            if ((url.indexOf("pdf") < 0) && (url.indexOf("dokumentumok.html#en") < 0))
            {
                url = url + '#' + $.cookie('auth');
            }
        
        }
    
    }

    $.get(p_Url).done(function () { //+'.html').done(function() {         
        window.location = url;
    }).fail(function () {
        window.location = '404.html';
    }).error(function () {
        window.location = '404.html';
    });

}
function showErrorLayer(p_Mess) {
    $("#hibauzenet").html(p_Mess);

    $("#hibauzenet_layer").addClass("layer_act");


}
function closeErrorLayer() {
    $("#hibauzenet_layer").removeClass("layer_act");
    $("#hibauzenet").html('');
    if ($('#elemFocus').val() != "") {
        $($('#elemFocus').val()).focus();
        $('#elemFocus').val('');
    }
}
function protected(p_Url, p_Szsz) {
    if (p_Url != '') {
        if (p_Szsz == false) {
            p_Url = null;
        }
        $.each(conf.termek.szsz, function (key, value) {
            if (key != 'max') {
                if (value.segment != "") {
                    if (p_Szsz == true) {
                        if (window.location.href.indexOf(value.segment) > -1 || window.location.href.indexOf('offline') > -1) {
                            //p_Url = p_Url.substring(0, p_Url.lastIndexOf("."));
                            p_Url = p_Url.substring(0, p_Url.lastIndexOf("-") + 1);
                            return (p_Url == "" ? null : p_Url);
                        }
                    } else if (p_Szsz == false) {
                        if (window.location.href.lastIndexOf(value.segment) > -1) {
                            p_Url = 'index.html';
                        }
                    }
                }
            }
        });
    }
    return p_Url;
}
function codeChecking(p_Cl, p_Content, p_UrlSupplement) {

    var code = $.cookie('auth').toUpperCase(), error = 0;

    if (code.length == p_Cl) {

        var index = 0, newContent = null, htAccess = [], htIndex = 0, fdAccess = '', segment = '';

        if (p_Content != '') { /*newContent = protected(p_Content, true); //ez itt bazira nem megy*/

            $.each(conf.termek.szsz, function (key, value) {

                if (key != 'max') {

                    if (value.segment != "") {


                        if (window.location.href.indexOf(value.segment) > -1 || window.location.href.indexOf('offline') > -1) {

                            newContent = p_Content.substring(0, p_Content.lastIndexOf("."));
                            newContent = newContent.substring(0, newContent.lastIndexOf("-") + 1);
                            newContent = (newContent == "" ? null : newContent);

                        } else
                        {

                            newContent = "szegmens-";
                        }
                    }
                }
            });
        } else {
            newContent = "szegmens-";
        }





        $(".left_nav").addClass("loading");

        $.each(conf.termek.sorrend, function (i, v) {

            var confV = eval('conf.termek.' + v);

            var cutString = code.substring(index, (index + confV.max));
            index += confV.max;

            /*if(v == 'ht' && cutString == 'NNN') {
             $('#ht').hide();
             }*/

            $.each(cutString.split(''), function (k, c) {


                if (conf.termek.no == c) {

                    switch (v) {
                        /*case 'fd': {
                         $('#fd').each(function() {
                         $(this).hide();
                         });
                         } break;*/
                        case 'szsz':
                            {
                                segment = 'mass';

                                // newContent += segment;
                                //$('#segment').html(segment);
                            }
                            break;
                            /*case 'szhej': {
                             $('#szhej').hide();
                             } break;*/
                    }
                } else if (eval('confV.' + c) == undefined) {

                    error++;
                }


                if (eval('confV.' + c) != undefined) {


                    switch (v) {
                        case 'ht':
                            {
                                if (c != conf.termek.no) {
                                    htAccess[htIndex] = eval('confV.' + c + '.url');
                                    htIndex++;
                                }
                            }
                            break;
                        case 'fd':
                            {
                                if (c != conf.termek.no) {
                                    fdAccess = eval('confV.' + c + '.url');
                                }
                            }
                            break;
                        case 'bkt':
                            {

                                if (c != conf.termek.no) {
                                    $('li#bkt').removeClass('productHide');
                                }
                            }
                            break;
                        case 'szsz':
                            {
                                segment = eval('confV.' + c + ".segment");
                                newContent = newContent + segment;
                                $('#segment').html(segment);
                            }
                            break;
                        case 'szhej':
                            {
                                if (c != conf.termek.no) {
                                    $('li#szhej').removeClass('productHide');
                                }
                            }
                            break;
                    }
                }
            });
        });





        if (error == 0 && !p_UrlSupplement) {
            $('#login_before').addClass('productHide');
            $('#login_after').removeClass('productHide');
            $('ul#login_after li:visible a').each(function () {
                var url = $(this).attr('href');

                if (url.indexOf("szolgaltatasok") < 0)
                {
                    url = url.substring(0, (url.lastIndexOf("-") + 1));
                    $(this).prop('href', url + segment + '.html');
                }
            });

            if (htAccess.length > 0) {
                $('li').each(function () {
                    if ($(this).data('cardtype') == "ht") {
                        var href = $(this).find('a').attr('href'), show = false;
                        href = href.substring((href.lastIndexOf('/') + 1), href.lastIndexOf('-'));
                        $.each(htAccess, function (key, value) {
                            if (href == value) {
                                show = true;
                            }
                        });
                        if (show) {
                            $(this).removeClass('productHide');
                        }
                    }
                });
            }
            if (fdAccess != null && fdAccess != "") {
                $('li').each(function () {
                    if ($(this).data('currentaccount') == 'fd') {
                        var href = $(this).find('a').attr('href');
                        href = href.substring((href.lastIndexOf('/') + 1), href.lastIndexOf('-'));
                        if (href == fdAccess) {
                            $(this).show();
                        }
                    }
                });
            }

            if (window.location.href.indexOf('szegmens') > -1 && window.location.href.indexOf('offline') == -1) {
                if ($('ul#login_after li a').not(':visible').length > 0) {
                    $('ul#login_after li a').not(':visible').each(function () {
                        var url = $(this).attr('href');

                        url = url.substring((url.lastIndexOf('/') + 1), url.lastIndexOf('-'));

                        $('.pl_item_t').each(function () {


                            var dataId = $(this).data('id'), hide = true;


                            dataId = dataId.substring((dataId.lastIndexOf('/') + 1), dataId.lastIndexOf('-'));

                            url = url.replace("erste-wizz", "wizz");

                            if (dataId == url) {

                                $(this).addClass('productHide');
                            }

                        });
                    });
                }
            }


            if (code[5] != "N")
            {

                $('#bkt').removeClass('productHide');
            }

        }

        $(".left_nav").removeClass("loading");
    } else
    {
            error++;
    }


    if (error > 0) {
        showErrorLayer(text.code_problem);
        createCookie('auth', null);
    } else {

        if (p_UrlSupplement) {

            if (newContent != null)
            {

                urlSupplement(newContent);
            } else if (p_Content != null)
            {

                urlSupplement(p_Content);
            }
        } else
        {


            $(".szegmens_termek_oldal_link").prop('href', "szegmens-" + segment + '.html' + "#" + $.cookie('auth'));
            $("#szegmens_termek_oldal").prop('href', "szegmens-" + segment + '.html' + "#" + $.cookie('auth'));
            $("#szegmens_termek_oldal_footer").prop('href', "szegmens-" + segment + '.html' + "#" + $.cookie('auth'));


            $(".breadcrumb").find("a").each(function () {
                switch ($(this).text()) {
                    case "Termékek és szolgáltatások":
                        $(this).prop('href', "szegmens-" + segment + '.html' + "#" + $.cookie('auth'));
                        break;
                    case "Termékek és kiszolgálási csatornák":
                    case "Termékek és kiszolgálási csatornák az Erste Banknál":
                        $(this).prop('href', "szegmens-" + segment + '.html' + "#" + $.cookie('auth'));
                        break;

                }

            });



        }
    }
}
function loginFormEvents(p_Cl, p_Input, p_Button) {

    $('.code_form form ' + p_Input).attr('maxlength', '7');

    $('.code_form form ' + p_Input).on('keypress', function (event) {

        var code = event.keyCode || event.which;

        if (code >= 65 && code <= 75) {
            return true;
        } else if (code >= 97 && code <= 107) {
            return true;
        } else if (code == 78 || code == 110 || code == 8) {
            return true;
        } else if (code == 13) {
            if ($(p_Input).val().length == p_Cl) {


                var form = $(this).parents('form:first');
                $(form).find("input[type='submit']").each(function ()
                {
                    $(this).trigger('click');
                });

                // $(p_Button).trigger('click');
                return false;
            } else {
                $('#elemFocus').val('.code_inp');
                showErrorLayer(text.code_problem);
                return false;
            }
        }

        return false;
    });




    $('.login_form form ' + p_Input).attr('maxlength', '7');

    $('.login_form form ' + p_Input).on('keypress', function (event) {

        var code = event.keyCode || event.which;
        
        if (code >= 65 && code <= 75) {            
            return true;
        } else if (code >= 97 && code <= 107) {
            return true;
        } else if (code == 78 || code == 110 || code == 8) {
            return true;
        } else if (code == 13) {
            
            if ($(this).val().length == p_Cl) {

                var form = $(this).parents('form:first');
                
                
                $(form).find("input[type='submit']").each(function ()
                {
                    $(this).trigger('click');
                });
                
                //$(p_Button).trigger('click');
                return false;
            } else {
                $('#elemFocus').val('.code_inp');
                showErrorLayer(text.code_problem);
                return false;
            }
        }

        return false;
    });













    $(p_Button).on('click', function () {

        //e.preventDefault();
        var code = $(p_Input).val();


        var form = $(this).parents('form:first');
        $(form).find("input[class=code_inp]").each(function ()
        {
            code = $(this).val();            
        });




        code = escapeRegExp(code);


        if (code == null || code == "" || code == undefined) {
            $('#elemFocus').val(p_Input);
            showErrorLayer(text.code_empty);
        } else if (code.length != p_Cl) {
            $('#elemFocus').val(p_Input);
            showErrorLayer(text.code_problem);
        } else {
            $('#elemFocus').val('');
            createCookie('auth', code);
            //codeChecking(p_Cl, checkUrl(p_Cl), true);
            codeChecking(p_Cl, conf.termek.def_url, true);
        }

        return false;
    });
}
function logoutFormEvents() {
    $('.code_logout').click(function () {

        createCookie('auth', null);
        if ((content == undefined) || (content != "index")) {
            window.location = conf.termek.def_url;
        } else
        {
            location.reload();
        }
    });
}



function clickRightBoxOpenLayer() {
    $('a[class*="openLayer"]').each(function () {
        var layerId = $(this).data('layer');

        if ($('.' + layerId)) {
            $(this).click(function () {


                if ($("#calclayerek") !== null)
                {

                    $("body").append("<div id='calclayerek'></div>");
                }

                layerId = $(this).data('layer');
                var lid = layerId.split('_');




                $.ajax({
                    dataType: "html",
                    url: "./remote/" + lid[0] + ".html",
                    method: 'post',
                    async: false,
                    noCache: true,

                }).done(function (result) {

                    $("#calclayerek").html(result);

                    $("#layer_close").click(function () {

                        $("#calclayerek").html('');
                        $('#box_overlay').hide();
                    });

                    $('#box_overlay').show();
                    $('.' + layerId).show();

                    switch (lid[0])
                    {
                        case "platinum" :
                        {
                            if (typeof platinumInit == 'function') {
                                platinumInit();
                            }
                            break;
                        }
                        case "max" :
                        {
                            if (typeof maxInit == 'function') {
                                maxInit();
                            }
                            break;
                        }
                        case "wizz" :
                        {
                            if (typeof wizzInit == 'function') {
                                wizzInit();
                            }
                            break;
                        }
                    }




                });











            });
        }
    });
}

function numberFormat(p_Value) {
    return $.number(p_Value, 0, ',', '.') + ' Ft';
}
function pieceFormat(p_Value) {
    return $.number(p_Value, 0, ',', '.') + ' db';
}




function formInit()
{


    $('[data-isint="1"]').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 192]) !== -1 ||
                // Allow: Ctrl+A
                        (e.keyCode == 65 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right, down, up
                                (e.keyCode >= 35 && e.keyCode <= 40)) {
                    // let it happen, don't do anything

                    return;
                }



                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }


                if ($(this).attr("data-max") == 1)
                {
                    if (e.key != "")
                    {
                        // console.log(($(this).val() + e.key) +"|"+ $(this).attr("data-max_val"));
                        if ((($(this).val() + e.key)*1) > ($(this).attr("data-max_val")*1))
                        {
                            e.preventDefault();
                        }
                    }
                }

            });
}