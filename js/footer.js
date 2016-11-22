document.write(
'<footer><div class="center">'+
'    <section>      '+
'              <aside><a href="http://www.citigroup.com/citi/" target="_blank" title="CITIGROUP.COM" class="padtop">CITIGROUP.COM</a></aside><a id="cmlink_FacebookIconLink" href="#p" target="_top"><img title="Facebook" alt="Facebook" src="img/fb.png" class="social_ic"></a><a id="cmlink_YoutubeIconLink" href="#p" title="YouTube" target="_top"><img title="YouTube" alt="YouTube" src="img/youtube.png" class="social_ic"></a><a id="cmlink_GoogleIconLink" href="#p" title="Google+" target="_top"><img title="Google+" alt="Google+" src="img/gplus-16.png" class="social_ic"></a></aside>'+
'          <nav>'+
'                <ul>'+
'                  <li><a href="https://www.citibank.hu/gcb/Lakossagi_ugyfelek/hungary/footer/citibankrol.htm?eOfferCode=HUHFFAC" title="A Citibankról">A Citibankról</a></li>'+
'                  <li><a href="https://www.citibank.com/?eOfferCode=HUHFFCC" title="Citibank.com">Citibank.com</a></li>'+
'                  <li><a href="https://www.citibank.hu/gcb/Lakossagi_ugyfelek/hungary/Altalanos_informaciok/sajtoszoba.htm?eOfferCode=HUHFFS" title="Sajtóközlemények">Sajtóközlemények</a></li>'+
'                  <li><a href="https://www.citibank.hu/adatkezeles/index.htm?eOfferCode=HUHFFAT" title="Adatkezelési tájékoztató">Adatkezelési tájékoztató</a></li>'+
'                  <li><a href="https://www.citibank.hu/gcb/Lakossagi_ugyfelek/hungary/footer/felelosseg.htm" title="Felelõsség">Felelõsség</a></li>'+
'				   <li><a href="https://www.citibank.hu/gcb/Lakossagi_ugyfelek/hungary/footer/karrier.htm?eOfferCode=HUHFFK" title="Karrier">Karrier</a></li>'+
'                  <li><a href="https://www.citibank.hu/gcb/Lakossagi_ugyfelek/hungary/footer/Oldalterkep.htm?eOfferCode=HUHFFO" title="Oldaltérkép">Oldaltérkép</a></li>'+
'                </ul>'+
'          </nav>'+
'    </section>'+
'    <article> '+
'    	<a href="#" title="citi"><img src="img/footer-citi-logo-small.png" alt="Citi" title="Citi" /></a>'+
'      	<p>Copyright &#169; 2015 Citigroup Inc.</p>'+
'    </article>'+
'</div></footer>'
);

$(document).ready(function(){

$('#cmlink_FacebookIconLink').attr('onclick',"javascript:window.open('https://www.citibank.hu/hungary/homepage/others/external-link-popup.htm?url=http://www.facebook.com/citibankmagyarorszag','popup','width=450,height=370,scrollbars=0, resizable=yes, location=yes');");

$('#cmlink_YoutubeIconLink').attr('onclick',"javascript:window.open('https://www.citibank.hu/hungary/homepage/others/external-link-popup.htm?url=http://www.youtube.com/user/citilifehungary','popup','width=450,height=370,scrollbars=0, resizable=yes, location=yes');");

$('#cmlink_GoogleIconLink').attr('onclick',"javascript:window.open('https://www.citibank.hu/hungary/homepage/others/external-link-popup.htm?url=https://plus.google.com/+CitibankMagyarorszag','popup','width=450,height=370,scrollbars=0, resizable=yes, location=yes');");


});