$("#encabezado").on("mousemove", function(event){
	if((event.pageX<590 && event.pageX>410 && event.pageY>100) || (event.pageX>590 && event.pageY>50) || (event.pageX<410 && event.pageY>50)){
		$("#navHotel a").trigger("click");
	}else{
		$(this).css({"margin-top" : "-7rem"});
		$("#navHotel").fadeIn();
		$("#eslogan").fadeOut();
	}
});
$("#navHotel a").on("click", function(){
	$("#encabezado").css({"margin-top" : "-10rem"});
	$("#navHotel").fadeOut();
	$("#eslogan").fadeIn();
});