/*variable qu eva almacenando la posicion de nuestro slider*/
var pos = 0;
var intv;
var flippedArt;/*contiene el elemnto girado*/
/*extension de cada paquete*/
var opcionesPaquetes = [
	{opciones:[
		{opcion:'Terraza con vistas al mar'}, {opcion:'Minibar'}, {opcion:'Aire acondicionado'}
	],costo: '175$',paquete:'Habitaciones dobles', descripcion:'Espaciosas habitaciones diseñadas con mentalidad vanguardista donde sensibilidad y buen gusto protagonizan su interiorismo, disfrute de unas espectaculares vistas al mar desde su amplio balcón. Mide: 26m2.'},
	{opciones:[
		{opcion:'Zona de estar con sofá-cama'}, {opcion:'Cuarto de baño completo'}, {opcion:'Caja fuerte electrónica'}
	],costo: '300$',paquete:'Suites Junior', descripcion:'Espaciosa Junior Suite de diseño vanguardista donde sensibilidad y buen gusto protagonizan su interiorismo. Dispone de 1 cama de matrimonio (200x200 cm), zona de estar con sofa-cama y cuarto de baño completo con ducha y bañera de diseño muy actual. Disfrute de unas espectaculares vistas al mar desde su terraza.'},
	{opciones:[
		{opcion:'2 terrazas con vistas al mar'}, {opcion:'Salón separado'}, {opcion:'Internet Wi-Fi (gratis)'}
	],costo: '350$',paquete:'Suites presidenciales', descripcion:'Disfrute de su estancia en la moderna y elegante Sénior Suite, con más de 70 m² de habitación y 15 m² de terraza con panorámicas vistas al mar, Dispone de amplio dormitorio matrimonial con cuarto de baño completo en Suite, gran salón de estar y una amplia y soleada terraza. Mide: 76m2.'}
];
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

	var widthParent = $("#contenedor-sliders").width();
	/*AÑADIR EL SLIDE DE <section id="contenedor-sliders">*/
	$(".slider").each(function(index, item){
		addBackground(item, widthParent, true);
	});
	/*AÑADIR EL SLIDE DE <section id="buffet">*/
	$(".image-food").each(function(index, item){
		addBackground(item, false);/*no le asigno width ni height*/
		/*para que NO se vea afectado el .viewpot*/
		if($(item).hasClass('viewport')) return true;/*te lo saltas*/
		$(item).css({
			"top": index*130+"px",
			"right": 20+"px"
		});
	});

	/*CAMBIAR VIEWPORT en <section id="buffet">*/
	$(".image-food").on("click", function(){
		changeViewport($(this));
	});
	/*EFECTO DE FLIP EN CADA ARTICULO*/
	$("#paquetes").on("click", ".oferta a", flipArticulos);

	/*SLIDER ANIMADO POR INTERVALO DE TIEMPO*/
	intv = setInterval(pasarSlides, 7000);
}
var changeViewport = function(element){
	var background = $(element).css("background-image");
	var viewport = $(".viewport");
	viewport.fadeOut(500, function() {
		viewport.removeClass('viewport');
		viewport.css("background-image", background);
	});
	viewport.fadeIn(10, function() {
		viewport.addClass('viewport');
	});
}
var addBackground = function(element, width, setSize)
{
	if(!width) width = $("#contenedor-sliders").width();
	/*no le asignamos el ancho del contenedor, pero lko controlamos con 'setSize'*/
	if(setSize){
		$(element).css({
			"width": width+"px",
			"height": $("#contenedor-sliders").height()+"px"
		});
	}
	var uri = $(element).data("background");
	$(element).css("background-image", "url('"+uri+"')");
}
var flipArticulos = function(event){
	event.preventDefault();
	if(flippedArt != null){/*esta girado*/
		$(flippedArt).revertFlip();
		flippedArt = null;
	}
	$(flippedArt).remove();

	/*TEMPLATES*/
	var padre = $(this).closest(".oferta");
	flippedArt = padre;
	$("#precioTemplate").template("CompiledTemplate");
	$(padre).flip({
		direction: "rl",
		speed: 500,
		content: $("#precioTemplate").tmpl(opcionesPaquetes[$(this).data("number")]).html(),
		color: "#f7f7f7",
		onEnd: function(){
			$("#regresar-ventana").on("click", function(){
				event.preventDefault();
				$(flippedArt).revertFlip();
				flippedArt = null;
			});
		}
	});
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