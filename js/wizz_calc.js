function wizzCalc() {
    var totalS = 0, totalPoint = 0, rate = {food: [100,2], fuel: [100,2], air: [100,4], shopping: [100,2]},
        max = 100000;

    $('#error').html('');
    
    $('.wizz_price').each(function() {
        var amount = parseInt($(this).val()), id = $(this).attr('id');
        
        if(amount > 0) {
            if(amount > max) {
                $('#error').html('Kérem adjon meg más összeget!');
                $(this).val('');
            }
            else {
                if(rate[id] != undefined && amount <= max) {
                    totalS += amount;
                    var newAmount = amount / rate[id][0];
                    newAmount = parseInt(newAmount);

                    var point = newAmount * rate[id][1];
                    totalPoint += point;
                }
            }
        }
    });
    
    $('#monthlyPrice').html(numberFormat(totalS));
    $('#mounthlyPiece').html(pieceFormat(totalPoint));
    
    
    $('#annualPoints').html(pieceFormat((totalPoint * 12) + parseInt($('#giftPoints').html().replace(' ', '')))); 
}

$(document).ready(function() {
   wizzInit();
});


function wizzInit()
{
    $('.wizz_price').each(function() {
        $(this).on('keypress', function (event) {
            var code = event.keyCode || event.which;

            if ((code >= 48 && code <= 57) || (code == 8)) {
                return true;
            }

            return false;
        }).on('keyup', function(event) {           
            wizzCalc();
        });
    }); 
}