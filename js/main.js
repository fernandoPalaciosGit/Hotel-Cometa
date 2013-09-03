$(document).ready(function(){
	init();
});
var init = function(){
	if(window.innerWidth <= 480){
		$("#navHotel").fadeIn();
	}else if(window.innerWidth > 480){
		$("#navHotel").fadeOut();
	}
	$("#encabezado").on("mousemove", rolloverHeader);
	$("#navHotel a").on("click", navegacion);
}
var rolloverHeader = function(event){
	if(window.innerWidth <= 480){
		return;
	}
	if((event.pageX<590 && event.pageX>410 && event.pageY>100) || (event.pageX>590 && event.pageY>50) || (event.pageX<410 && event.pageY>50)){
		$("#navHotel a").trigger("click");
	}else{
		$(this).css({"margin-top" : "-7rem"});
		$("#navHotel").fadeIn();
		$("#eslogan").fadeOut();
	}
}
var navegacion = function(){
	$("#encabezado").css({"margin-top" : "-10rem"});
	$("#navHotel").fadeOut();
	$("#eslogan").fadeIn();
}