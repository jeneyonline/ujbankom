$(function() {
    //$("#sliderCnt .slider").slider({min: 0, max: 100000, step: 1000, value: 20000});


    var queue = new Array();
    var kategoriak = new Array();

    var akt_kulcsok = new Array();
    var akt_kulcsok2 = new Array();

    var akt_osszeg = 0;
    var teljes_osszeg = 0;
    var akt_slide = "";


    kategoriak['benzinkut'] = 20000;
    kategoriak['divat'] = 20000;
    kategoriak['szorakozas'] = 20000;
    kategoriak['other'] = 20000;

    setAktivKulcsok();
    
    
    function nullaz()
    {
        
        // console.log('nullazt');
        
        //$("#sliderCnt .slider").slider({min: 0, max: 100000, step: 1000, value: 20000});
        for (key in kategoriak)
        {
            kategoriak[key]=20000;
        }
        
    }

    function setAktivKulcsok()
    {

        var uj_kategoria = "";
        // akt_kulcsok=akt_kulcsok2;
        akt_kulcsok = new Array();



        $("#sliderCnt .item.active").each(function() {

            k = $(this).attr("id").split("_")[1];

            akt_kulcsok[k] = k;
            if (!kategoriak[k])
            {
                uj_kategoria = k;
                kategoriak[k] = 20000;
                stackAdd('sliderItem_' + k);
            }
        });



        akt_kulcsok['other'] = 'other';
        
        
        
        for (key in kategoriak)
        {
            if (!in_array(key, akt_kulcsok))
            {
                kategoriak[key]=0;
                // console.log('nulla'+key);
            }
        }

        if (uj_kategoria != "")
        {
            //alert(uj_kategoria);
            
        }



        res = stackGet();
    }


    function osszeg()
    {
        var ossz = 0;
        res = stackGet();
        for (key in res)
        {
            th = "#sliderItem_" + res[key];
            var s = $(th).children(".subSum").val();
            ossz += (s * 1);
        }

        return ossz;
    }

    function tarolva_van()
    {
        var ossz = 0;
                
                
                
                

        for (key in kategoriak)
        {
            if (in_array(key, akt_kulcsok))
            {
                ossz += kategoriak[key];
            }
        }

        return ossz;
    }

    function calcsum()
    {
        // setAktivKulcsok();
        var akt_ertek = 0;
//    var sCat = $(th).attr("id").split("_")[1];
        res = stackGet();

        teljes_osszeg = 0;
        for (key in res)
        {
            if (in_array(key, akt_kulcsok))
            {
            th = "#sliderItem_" + res[key];

            var s = $(th).children(".subSum").val();
            if (key == akt_slide)
            {
                akt_ertek = s * 1;
            }

            teljes_osszeg += (s * 1);
        }
        }
        
// console.log("teljes_osszeg"+teljes_osszeg);
        if (teljes_osszeg <= 250000)
        {
            for (key in res)
            {
                th = "#sliderItem_" + res[key];

                var s = $(th).children(".subSum").val();
                s = s * 1;
                kategoriak[key] = s


            }
        }
        else
        {

if ((tarolva_van()<250000) )
{    

// console.log("tarolva_van"+tarolva_van());
            if (kategoriak[akt_slide] > akt_ertek)
            {
                 
                kategoriak[akt_slide] = akt_ertek;


                kat_osszeg = 0
                for (key in kategoriak)
                {
                    if (in_array(key, akt_kulcsok))
                    {
                        kat_osszeg += kategoriak[key];
                    }
                }
                ennyi_mehet = 250000 - kat_osszeg;

                // meg kell keresni melyikből lehet ennyit hozzáadni


                for (key in res)
                {
                    th = "#sliderItem_" + res[key];

                    var s = $(th).children(".subSum").val();
                    s = s * 1;
                    if ((kategoriak[key] < s) && (s > 0))
                    {
                        s = s - kategoriak[key];
                        
                        if (s < ennyi_mehet)
                        {

                            kategoriak[key] += kategoriak[key];
                            ennyi_mehet -= s;
                        }
                        else
                        {
                            kategoriak[key] += ennyi_mehet;
                        }
                    }
                }

                

            }   
            else
            {
                kat_osszeg = 0
                for (key in kategoriak)
                {
                    if (in_array(key, akt_kulcsok))
                    {
                        kat_osszeg += kategoriak[key];
                    }
                }
                 
                ennyi_mehet = 250000 - kat_osszeg;
                // console.log("ennyi_mehet"+ennyi_mehet);
                if (akt_ertek>=ennyi_mehet)
                {
                  
                 if (ennyi_mehet<0)
                 {
                  if (((ennyi_mehet*(-1))>kategoriak[akt_slide]) && ((kategoriak[akt_slide] + ennyi_mehet)>0) )
                  {
                    kategoriak[akt_slide] += ennyi_mehet;
                    
                  }
                 }
                 else
                 {
                    kategoriak[akt_slide] += ennyi_mehet;
                    
                 }
            }
                

            }
            
        }
        }

       // res = stackGet();

// console.log(tarolva_van());
 /*
if ((tarolva_van()<250000) &&  (teljes_osszeg>tarolva_van()))
{
    ennyi_mehet= 250000-tarolva_van()
    
    for (key in res)
                {
                  
                th = "#sliderItem_" + res[key];

            var s = $(th).children(".subSum").val();                
            s= s*1;
            st= s-kategoriak[key];
            if (st<=ennyi_mehet)
            {
                
            kategoriak[key]+=st;
            ennyi_mehet-st;    
            }
            else
            {
                st= ennyi_mehet-kategoriak[key];
                
            kategoriak[key]+=st;
            ennyi_mehet-st;    
            }
            
            
            
                }
}
  */      





    }

    function stackAdd(valueToAdd) {

        valueToAdd = valueToAdd.split("_")[1];
        queue.push(valueToAdd);
    }

    stackAdd('sliderItem_other');
    stackAdd('sliderItem_szorakozas');
    stackAdd('sliderItem_divat');
    stackAdd('sliderItem_benzinkut');


    function display(num) {
        var n = num;
        num = String(num);
        num = num.replace(/\./, ',');
        var ispoint = (num.match(/,/) ? true : false);
        var i = num.length;
        var k = num.length;
        var cntr = 0;
        var out = '';
        while (i >= 0) {
            if (num.charAt(i) == ',') {
                ispoint = false;
            }
            out = num.charAt(i) + out;
            if (!ispoint && num.charAt(i).match(/[0-9]/)) {
                if (cntr == 2 && k != 3 && i != 0) {
                    out = '.' + out;
                }
                if (cntr++ >= 3) {
                    cntr = 1;
                }
            }
            i--;
        }
        return(out);
    }

    /*  
     var contentFromUtm;
     function getURLParameter(name) {
     return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
     }
     var utmContent = getURLParameter("utm_content");
     if (utmContent != "" && utmContent != null && utmContent != undefined && utmContent.length != 0) {
     utmContentInfos = getURLParameter("utm_content").split("_");
     var utmContentInfosNo = utmContentInfos.length;
     contentFromUtm = utmContentInfos[utmContentInfosNo-1];
     };
     
     
     var hash = window.location.hash.substring(1);
     if (hash == "" || hash == null && hash == undefined) {
     hash = contentFromUtm;
     }
     if (hash == "benzin" || hash == "elektro" || hash == "ruha" || hash == "butor") {
     //$(".sidebar").hide();
     $(".sidebar.sidebar_"+hash).removeClass("hidden");
     $(".sidebar.sidebar_"+hash).show();
     $(".sidebar.sidebar_"+hash).addClass("active");
     } else {
     var n = Math.floor(Math.random() * 4);
     $(".sidebar").hide();
     $(".sidebar").eq(n).removeClass("hidden");
     $(".sidebar").eq(n).show();
     $(".sidebar").eq(n).addClass("active");
     }; 
     $("#sliderCnt .item").each(function(){
     if ($(this).attr("id") != "sliderItem_other") {
     $(this).addClass("hidden").removeClass("active").removeClass("update_1").removeClass("update_2").removeClass("update_3");
     };
     }); 
     if ($(".sidebar_benzin").hasClass("active")) {
     $("#sliderItem_benzinkut").removeClass("hidden").addClass("active").addClass("update_1");
     $("#sliderItem_elektronikai").removeClass("hidden").addClass("active").addClass("update_2");
     $("#sliderItem_utazas").removeClass("hidden").addClass("active").addClass("update_3");  
     }; 
     if ($(".sidebar_elektro").hasClass("active")) {
     $("#sliderItem_elektronikai").removeClass("hidden").addClass("active").addClass("update_1");
     $("#sliderItem_utazas").removeClass("hidden").addClass("active").addClass("update_2");
     $("#sliderItem_benzinkut").removeClass("hidden").addClass("active").addClass("update_3");  
     }; 
     if ($(".sidebar_ruha").hasClass("active")) {
     $("#sliderItem_divat").removeClass("hidden").addClass("active").addClass("update_1");
     $("#sliderItem_szepseg").removeClass("hidden").addClass("active").addClass("update_2");
     $("#sliderItem_szorakozas").removeClass("hidden").addClass("active").addClass("update_3");  
     }; 
     if ($(".sidebar_butor").hasClass("active")) {
     $("#sliderItem_otthon").removeClass("hidden").addClass("active").addClass("update_1");
     $("#sliderItem_divat").removeClass("hidden").addClass("active").addClass("update_2");
     $("#sliderItem_utazas").removeClass("hidden").addClass("active").addClass("update_3");  
     };
     */
    removeCatsFromSelect();




    function countResult() {
        var monthlyRes_2013 = 0;
        var yearlyRes_2014 = 0;
        var osszeg = 0;


        _gaq.push(['_trackEvent', 'Conversion step', 'Progressing', 'ClickonDetail']);

        res = stackGet();

        calcsum('');
        
        for (key in kategoriak)
        {

            if (in_array(key, akt_kulcsok))
            {
                th = "#sliderItem_" + res[key];

                // var s = $(th).children(".subSum").val();
                var s = kategoriak[key];
                // var sCat = $(th).attr("id").split("_")[1];
                var sCat =key;




                if (sCat != "other")
                {

                    s = (s) * 1
                    osszeg += s;


                    
                    if ((osszeg > 250000) && (s != 0))
                    {
                        
                        
                        p = osszeg - 250000;
                        s = s - p;
                        if (s < 0)
                        {
                            s = 0;
                        }

                    }

                    
                    if (sCat == "benzinkut") {

                        if (s > 30000) {
                            monthlyRes_2013 += 30000 * 0.08 + (s - 30000) * 0.02;
                            yearlyRes_2014 += 30000 * 0.04 + (s - 30000) * 0.01;
                        } else {
                            monthlyRes_2013 += s * 0.08;
                            yearlyRes_2014 += s * 0.04;
                        }
                    } else {

                        
                        monthlyRes_2013 += s * 0.08;
                        yearlyRes_2014 += s * 0.04;

                    }
                    ;
                }
                else
                {

                    var sOther = kategoriak[key];
                    sOther = sOther * 1;
                    osszeg += (sOther) * 1;

                    if ((sOther != 0))
                    {
                        if ((osszeg <= 250000))
                        {
                            monthlyRes_2013 += sOther * 0.02;
                        }
                        else
                        {
                            p = osszeg - 250000;
                            sOther = sOther - p;
                            if (sOther < 0)
                            {
                                sOther = 0;
                            }

                        }
                    }
                    yearlyRes_2014 += sOther * 0.01;

                }


            }
        }
//     });




        if (monthlyRes_2013 > 30000) {
            monthlyRes_2013 = monthlyRes_2013 / 2 + 15000;
        }
        ;




        yearlyRes_2014 = yearlyRes_2014 * 12;
        
        // yearlyRes_2014=yearlyRes_2014+5000;
        yearlyRes_2014=yearlyRes_2014;


        /*
         if (yearlyRes_2014>102000)
         {
         yearlyRes_2014=102000;
         }
         */
        
        $("#monthlySection .result .val").html(display(monthlyRes_2013));
        $("#yearlySection .result .val").html(display(yearlyRes_2014));
    }
    ;

    $("#sliderCnt .slider").each(function() {
        var v = $(this).slider("option", "value");
        var parentId = $(this).parent().attr("id");
        $("#" + parentId + " .subSum").val(v);
        $("#" + parentId + " .value .number").html(display(v));
    });

    countResult();





    function in_array(k, a)
    {

        for (key in a)
        {
            if (k == key)
            {
                return true;
            }
        }

        return false;
    }


    function stackGet() {

        res = new Array()

        if (queue != undefined && (queue.length > 0))
        {
            for (i = (queue.length - 1); i >= 0; i--)
            {
                res[queue[i]] = queue[i];


            }
            s = "";

            
            for (key in res)
            {


                for (key2 in akt_kulcsok)
                {
                    if (key == key2)
                    {
                        
                        s += res[key] + ":" + kategoriak[key] + "<br>";
                    }
                }
            }

     // console.log(s);
            // $("#sorrend").html(s);
            return res;
        }
        else
        {
            return false;
        }
    }

    $("#sliderCnt .item").each(function() {
        $(this).append("<div class='maxRaiser'><div class='plus' style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>+</div><div class='minus' style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>-</div></div>");
    });

    $("#sliderCnt .slider").on("slide", function(event, ui) {





        var v = ui.value;
        var parentId = $(this).parent().attr("id");

        akt_slide = parentId.split("_")[1];

        stackAdd(parentId);









        

        $("#" + parentId + " .subSum").val(v);
        $("#" + parentId + " .value .number").html(display(v));
        countResult();
        maxRaiserCheck(parentId);
    });
    $("#sliderCnt .slider").on("slidechange", function(event, ui) {
        
        _gaq.push(['_trackEvent', 'Engagement', 'Calculator', 'Calculator use']);
        
        var v = $(this).slider("option", "value");
        var parentId = $(this).parent().attr("id");
        $("#" + parentId + " .subSum").val(v);
        $("#" + parentId + " .value .number").html(display(v));
        countResult();
        // _gaq.push(['_trackEvent', 'Slider', 'Update', parentId]);
    });

    function removeCatsFromSelect() {
        $("#sliderCnt .item .catSelect .option").removeClass("notSelectable");
        $("#radarSelector .canvas").removeClass("active");
        $("#sliderCnt .item").each(function() {
            if ($(this).hasClass("active")) {
                var activeCat = $(this).attr("id").split("_")[1];
                $(".option_" + activeCat).addClass("notSelectable");
                var activeSlice = $("#clickSlice_" + activeCat).attr("class");
                $("#" + activeSlice).addClass("active");
            }
            ;
        });
    }
    ;

    $("#sliderCnt .catSelect .option").click(function() {



        if ($(this).hasClass("notSelectable")) {
            // _gaq.push(['_trackEvent', 'Category dropdown', 'Clicked on actually selected', '']);
        } else {
            var selectedCat = $(this).attr("id").split("_")[1];
            // _gaq.push(['_trackEvent', 'Category dropdown', 'Select category', selectedCat]);
            // _gaq.push(['_trackEvent', 'Category', selectedCat, 'Dropdown']);
            var actualCat = $(this).closest("#sliderCnt .item").attr("id").split("_")[1];
            if (actualCat != selectedCat) {
                var sliderPos;
                if ($(this).closest("#sliderCnt .item").hasClass("update_1")) {
                    sliderPos = 1
                }
                ;
                if ($(this).closest("#sliderCnt .item").hasClass("update_2")) {
                    sliderPos = 2
                }
                ;
                if ($(this).closest("#sliderCnt .item").hasClass("update_3")) {
                    sliderPos = 3
                }
                ;
                $("#sliderItem_" + selectedCat).addClass("active").addClass("update_" + sliderPos).removeClass("hidden");
                $("#sliderItem_" + actualCat).addClass("hidden").removeClass("active").removeClass("update_" + sliderPos);
                removeCatsFromSelect();
            } else {
                // do nothing
            }
            ;
        }
        ;
    });

    $("#sliderCnt .catSelect").click(function(e) {

        
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
        } else {
            $("#sliderCnt .catSelect").removeClass("open");
            $(this).addClass("open");
        }
        ;
        
        

        nullaz();
        setAktivKulcsok();
        countResult();
        e.stopPropagation();
    });

    $("#radarSelector area").click(function() {
        
        _gaq.push(['_trackEvent', 'Engagement', 'Wheel', 'clickonicon']);

        var selectedCat = $(this).attr("id").split("_")[1];
        if ($("#sliderItem_" + selectedCat).hasClass("active")) {
            // _gaq.push(['_trackEvent', 'Radar selector', 'Clicked on actually selected', '']);
        } else {
            $("#sliderCnt .item.update_3").addClass("hidden").removeClass("active").removeClass("update_3");
            $("#sliderCnt .item.update_2").addClass("update_3").removeClass("update_2");
            $("#sliderCnt .item.update_1").addClass("update_2").removeClass("update_1");
            $("#sliderItem_" + selectedCat).addClass("active").addClass("update_1").removeClass("hidden");
            removeCatsFromSelect();
            //_gaq.push(['_trackEvent', 'Radar selector', 'Select category', selectedCat]);
            // _gaq.push(['_trackEvent', 'Category', selectedCat, 'Radar']);      
        }

        nullaz();
        setAktivKulcsok();
        
        countResult();
    });

    $("#radarMap area").mouseleave(function() {
        var hoverCat = $(this).attr("class");
        $(".bubbleTxt.bbt_" + hoverCat).hide();
    });
    $("#radarMap area").mouseenter(function() {
        var hoverCat = $(this).attr("class");
        $(".bubbleTxt.bbt_" + hoverCat).show();
    });

    $("html").click(function() {
        $("#sliderCnt .catSelect").removeClass("open");
    });



    function maxRaiserCheck(pid) {
        z = $("#" + pid + " .subSum").val();
        if (z > 99999) {
            $("#" + pid + " .maxRaiser").addClass("applicable");
            if (z == 100000) {
                $("#" + pid + " .maxRaiser .minus").hide();
            }
        } else {
            $("#" + pid + " .maxRaiser").removeClass("applicable");
        }
        ;
    }
    ;

    $(".maxRaiser .plus").click(function() {
        var pid = $(this).closest("#sliderCnt .item").attr("id");

        stackAdd(pid);

        var v = parseInt($("#" + pid + " .subSum").val());
        v += 10000;
        $("#" + pid + " .subSum").val(v);
        $("#" + pid + " .value .number").html(display(v));
        if (v > 100000) {
            $("#" + pid + " .maxRaiser .minus").show();
        }
        ;
        if (v == 400000) {
            $("#" + pid + " .maxRaiser .plus").hide();
        }
        ;
        countResult();
    });

    $(".maxRaiser .minus").click(function() {
        var pid = $(this).closest("#sliderCnt .item").attr("id");

        stackAdd(pid);


        var v = parseInt($("#" + pid + " .subSum").val());
        v -= 10000;
        $("#" + pid + " .subSum").val(v);
        $("#" + pid + " .value .number").html(display(v));
        if (v == 100000) {
            $("#" + pid + " .maxRaiser .minus").hide();
        }
        ;
        if (v < 400000) {
            $("#" + pid + " .maxRaiser .plus").show();
        }
        ;
        countResult();
    });


});