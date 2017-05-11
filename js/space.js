require.config({
	paths:{
		"jquery":"./lib/jquery.min",
		"bootstrap":"./lib/bootstrap.min",
		"three":"./lib/three",
		"tweenMax":"./lib/TweenMax.min"
	}
});

require(['appSpace'],function(App){
	new App();
});