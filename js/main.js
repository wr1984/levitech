require.config({
	paths:{
		"jquery":"./lib/jquery.min",
		"bootstrap":"./lib/bootstrap.min",
		"three":"./lib/three",
		"tweenMax":"./lib/TweenMax.min",
		"three74":"./three.r74.min",
	}
});

require(['appSpace'],function(App){
//	document.getElementById('header').addEventListener('click',function(){
//		$('.collapse').collapse()
//	})
	new App();
});