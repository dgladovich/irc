jQuery(document).ready(function(){

	$('.halfwidth').height($('.halfwidth').width() / 2);
	$('.t-wrap').height( $(window).height() - $('.t-wrap').offset().top - 100);

    $(window).resize(function(){
        $('.halfwidth').height($('.halfwidth').width() / 2);
		
		$('.t-wrap').height( $(window).height() - $('.t-wrap').offset().top - 100);
		
    });

	/**** Изменение классов для демонстрации ****/
	$('.messages').click(function () {

		var classes = ['passive messages','active messages','att messages','danger messages'];
		this.className = classes[($.inArray(this.className, classes)+1)%classes.length];

	});
	
	$('#fingerprint').click(function () {

		$(this).toggleClass("highlight");

	});
	
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна

});

 
function setHeiHeight() {
    $('.innerh100').css({
        height: ($(window).height() - 100 - $('.innerh100').offset().top) + 'px'
    });
}




