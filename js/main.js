/*variable qu eva almacenando la posicion de nuestro slider*/
var pos = 0;
var intv;
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
	$("#encabezado").on("mousemove", rolloverHeader)
						 .on("mouseout", navegacion);
	$("#navHotel a").on("click", navegacion);
	$("#control-sliders ul li").on("click", pasarSlides);
	/*ESPECIFICAR LA DIMENSIONES DE CADA SLIDE*/
	var widthParent = $("#contenedor-sliders").width();
	$(".slider").each(function(index, item){
		var uri = $(item).data("background");
		$(item).css("width", widthParent+"px");
		$(item).css("background-image", "url('"+uri+"')");
	});
	/*SLIDER ANIMADO POR INTERVALO DE TIEMPO*/
	intv = setInterval(pasarSlides, 7000);
}
var pasarSlides = function(){
	var slideTarget = 0;
	/*¿se paso por un intervalo (TIEMPO) o por un boton (CLICK)?*/
	if($(this).closest("#control-sliders").hasClass("pasar-slide")){
		slideTarget = $(this).index();/*devuelve el indice del array*/
		pos = slideTarget;
		clearInterval(intv);//resetamos el intervalo en el caso de que le demos click a los enlaces
		intv = setInterval(pasarSlides, 7000);
	}else{
		pos++;
		if(pos >= $(".slider").length){
			pos = 0;
		}
		slideTarget = pos;
	}
	/*ANIMACION DE FUNDIDO*/
	$("#img-sliders").fadeOut("slow", function(){
		$(this).animate({
			"margin-left" : -(slideTarget * $(this).parent().width())+"px"
		}, "fast", function(){
			$(this).fadeIn();
		});
	});

}
var rolloverHeader = function(event){
	if(window.innerWidth <= 480){
		return;
	}
	if(event.pageY < 110){
		$(this).css({"margin-top" : "-7rem"});
		$("#navHotel").fadeIn();
		$("#eslogan").fadeOut();
	}
}
var navegacion = function(event){
	if(window.innerWidth <= 480){
		return;
	}
	if(event.pageY>80){
		$("#encabezado").css({"margin-top" : "-10rem"});
		$("#navHotel").fadeOut();
		$("#eslogan").fadeIn();
	}
}