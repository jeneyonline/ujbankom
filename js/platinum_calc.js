function platinumCalc() {
    var sum = 0, nationalMax = 30000000, foreignMax = 15000000; 
    
    $('#error').html('');
    $('.platinum_price').each(function() {
        var amount = parseInt($(this).val());
        
        if(amount > 0) {
            var writeAmount = true, id = $(this).attr('id');
            if(id == 'national') {
                if(amount > nationalMax) {
                    writeAmount = false;
                    $(this).val('').focus();
                    $('#error').html('Kérem adjon meg más összeget!');
                }
            }
            else if(id == 'foreign') {
                if(amount > foreignMax) {
                    writeAmount = false;
                    $(this).val('').focus();
                    $('#error').html('Kérem adjon meg más összeget!');
                }
            }
            
            if(writeAmount == true) {
                sum += (amount * ($(this).data('percent') / 100));
            }
        }
    });
    
    sum = parseInt(sum);
    if(sum > 300000) {
        $('#national').val('').focus();
        $('#foreign').val('');
        $('#error').html('Kérem adjon meg új értékeket!');
        sum = 0;
    }
    $('.platinum_sum').val(numberFormat(parseInt(sum)));
}


function platinumInit()
{
    $('.platinum_price').each(function() {
        $(this).on('keypress', function (event) {            
            var code = event.keyCode || event.which;

            if ((code >= 48 && code <= 57) || (code == 8)) {
                return true;
            }

            return false;
        }).on('keyup', function(event) {            
            platinumCalc();
        });
    });
}
    
$(document).ready(function() {
    
    
});


