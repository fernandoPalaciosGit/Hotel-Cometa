$(document).ready(function(){
	init();
});
var init = function(){
	if(window.innerWidth <= 480){
		$("#navHotel").fadeIn();
	}else if(window.innerWidth > 480){
		$("#navHotel").fadeOut();
	}
	/*EVENTOS MOUSE*/
	$("#encabezado").on("mousemove", rolloverHeader);
	$("#navHotel a").on("click", navegacion);
	$("#control-sliders ul li").on("click", pasarSlides);
	/*ESPECIFICAR LA DIMENSIONES DE CADA SLIDE*/
	var widthParent = $("#contenedor-sliders").width();
	$(".slider").each(function(index, item){
		var uri = $(item).data("background");
		$(item).css("width", widthParent+"px");
		$(item).css("background-image", "url('"+uri+"')");
	});

}
var pasarSlides = function(){
	var slideTarget = 0;
	/*¿se paso por un intervalo (TIEMPO) o por un boton (CLICK)?*/
	if($(this).closest("#control-sliders").hasClass("pasar-slide")){
		slideTarget = $(this).index();/*devuelve el indice del array*/

	}
	$("#img-sliders").fadeOut("slow", function(){
		$(this).animate({
			"margin-left" : -(slideTarget * $(this).parent().width())+"px"
		}, "slow", function(){
			$(this).fadeIn();
		});
	});
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