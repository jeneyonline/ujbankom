function maxInit()
{
    $("#sliderCnt .slider").slider({min: 0, max: 100000, step: 1000, value: 20000});


    var queue = new Array();
    var kategoriak = new Array();

    var akt_kulcsok = new Array();
    var akt_kulcsok2 = new Array();
    
    var katikons=  new Array ( 'benzinkut', 'divat', 'otthon', 'barkacs', 'elektronikai', 'utazasi', 'szepseg', 'szorakozas');

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
        
        $("#sliderCnt .slider").slider({min: 0, max: 100000, step: 1000, value: 20000});
        $(".max_price").val(20000);
       for (key in kategoriak)
        {
            kategoriak[key]=20000;
        }
        
    }

    function setAktivKulcsok()
    {
        
        $("#cat").find("a").each(function ()
        {
            $(this).removeClass("active");
        });


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

        var ic=1;

        ic=$("#ikon_1").attr("data-index");
        ic--;
        
        akt_kulcsok[katikons[ic]]=katikons[ic];
        
        
        
        ic=1;
        ic=$("#ikon_2").attr("data-index");
        ic--;
        akt_kulcsok[katikons[ic]]=katikons[ic];
        
        
        
        ic=1;
        ic=$("#ikon_3").attr("data-index");
        ic--;        
        
        akt_kulcsok[katikons[ic]]=katikons[ic];


        akt_kulcsok['other'] = 'other';
        
        
        for (key in akt_kulcsok)
        {
            $("#catItem_"+akt_kulcsok[key]).addClass("active");
        }
        
        
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
                
                if (s>=0)
                {
                kategoriak[key] = s;
            }
            else
            {
                kategoriak[key] =0;
            }


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

    
    
    removeCatsFromSelect();




    function countResult() {
        var monthlyRes_2013 = 0;
        var yearlyRes_2014 = 0;
        var osszeg = 0;



        res = stackGet();

        calcsum('');
        
        // console.dir(kategoriak);
        
        for (key in kategoriak)
        {

            if (in_array(key, akt_kulcsok))
            {
                // console.log("xx"+key);
                th = "#sliderItem_" + res[key];

                
                // console.log(th = "#sliderItem_" + res[key]);
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
        
        yearlyRes_2014=yearlyRes_2014+5000;
        yearlyRes_2014=yearlyRes_2014;


        /*
         if (yearlyRes_2014>102000)
         {
         yearlyRes_2014=102000;
         }
         */
        
        // $("#monthlySection .result .val").html(display(monthlyRes_2013));
        // $("#yearlySection .result .val").html(display(yearlyRes_2014));
        $('.price').html(numberFormat(yearlyRes_2014))+" Ft";
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
    $(".max_price").on("change", function(event, ui) {
        
        
        var v = $(this).val();
        
        var parentId = $(this).parent().attr("id");
        
        $("#" + parentId + " .subSum").val(v);
        $("#" + parentId + " .value .number").html(display(v));
        countResult();
        
    });

    function removeCatsFromSelect() {
        /*
        $("#sliderCnt .item .catSelect .option").removeClass("inactive");
        
        $("#sliderCnt .item").each(function() {
            
            
            if ($(this).hasClass("inactive")) {
            }
            else
            {
                var activeCat = $(this).attr("id").split("_")[1];
                
                $(".option_" + activeCat).addClass("inactive");                
            }
            ;
        });
        */
    }
    ;

    $("#sliderCnt .catSelect .option").click(function() {



        if ($(this).hasClass("inactive")) {
            
        } else {
            var selectedCat = $(this).attr("id").split("_")[1];
            
            var actualCat = $(this).closest("#sliderCnt .item").attr("id").split("_")[1];
            
            if (actualCat != selectedCat) {
                var sliderPos;
                if ($(this).closest("#sliderCnt .item").hasClass("update_1")) {
                    sliderPos = 1;
                }
                
                if ($(this).closest("#sliderCnt .item").hasClass("update_2")) {
                    sliderPos = 2;
                }
                
                if ($(this).closest("#sliderCnt .item").hasClass("update_3")) {
                    sliderPos = 3;
                }
                
                var key=sliderPos;
                
                
                for (i in katikons)
                {
                    
                    $("#ikon_" + sliderPos).removeClass("icon-"+((i*1)+1));
                    if (selectedCat==katikons[i])
                    {
                        key=(i*1)+1;
                    }
                }
                
                // console.log("ikon-"+((key*1)+1));
                $("#ikon_" + sliderPos).addClass("icon-"+key);
                $("#ikon_" + sliderPos).attr("data-index", key);
          
          
                $("#sliderItem_benzinkut").find("a").each(function ()
                {
                    $(this).removeClass('inactive');
                });
          
                $("#sliderItem_divat").find("a").each(function ()
                {
                     $(this).removeClass('inactive');
                });
          
                $("#sliderItem_szorakozas").find("a").each(function ()
                {
                     $(this).removeClass('inactive');
                });
          
                
                var ionindex=0;
                
                ionindex=0;
                ionindex=$("#ikon_1").attr('data-index');
                ionindex--;
                                
                $("#sliderItem_divat").find("a").each(function ()
                {                   
                    if ($(this).attr("id")=="option_"+katikons[ionindex])
                    {                        
                       $(this).addClass('inactive');
                    }
                });
                                                                            
                $("#sliderItem_szorakozas").find("a").each(function ()
                {                   
                    if ($(this).attr("id")=="option_"+katikons[ionindex])
                    {                        
                       $(this).addClass('inactive');
                    }
                });





                ionindex=0;
                ionindex=$("#ikon_2").attr('data-index');
                ionindex--;
                                
                $("#sliderItem_benzinkut").find("a").each(function ()
                {                   
                    if ($(this).attr("id")=="option_"+katikons[ionindex])
                    {                        
                       $(this).addClass('inactive');
                    }
                });
                                                                            
                $("#sliderItem_szorakozas").find("a").each(function ()
                {                   
                    if ($(this).attr("id")=="option_"+katikons[ionindex])
                    {                        
                       $(this).addClass('inactive');
                    }
                });
                





                ionindex=0;
                ionindex=$("#ikon_3").attr('data-index');
                ionindex--;
                                
                $("#sliderItem_benzinkut").find("a").each(function ()
                {                   
                    if ($(this).attr("id")=="option_"+katikons[ionindex])
                    {                        
                       $(this).addClass('inactive');
                    }
                });
                                                                            
                $("#sliderItem_divat").find("a").each(function ()
                {                   
                    if ($(this).attr("id")=="option_"+katikons[ionindex])
                    {                        
                       $(this).addClass('inactive');
                    }
                });
                
               
                

// inactive
                    
                
                
                //$("#sliderItem_" + selectedCat).addClass("active").addClass("update_" + sliderPos).removeClass("inactive");
                // $("#sliderItem_" + actualCat).addClass("inactive").removeClass("active").removeClass("update_" + sliderPos);
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






    $('div.select').each(function(key, value) {
        if($(value).find('div.icons')) {
            if($('#cat_select_option_'+key)) { $('#cat_select_option_'+key).hide(); }
            
            $(value).find('div.icons').click(function() {
                $('#cat_select_option_'+key).toggle();
            });
        }
    });
    
    nullaz();
    countResult();
    formInit();
}




