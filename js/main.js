require.config({
	paths: {
		"jquery": "./lib/jquery.min",
		"bootstrap": "./lib/bootstrap.min",
		"text": "./lib/text",
		"top": "../template/top.html",
		"projects": "../template/projects.html",
		"recruitment": "../template/recruitment.html",
		"three":"./lib/three",
		"tweenmax":"./lib/TweenMax.min",
		"cloud": "cloud",
		"three74":"three.r74.min",
		"tree":"tree",
		"appSpace":"appSpace",
		"star":"star"
	},
	shim: {
		jquery: {
			exports: 'jquery'
		},
		bootstrap: {
			deps: ['jquery']
		},
		three74:{
			exprots: 'three74'
		},
		cloud:{
			deps:['three74']
		},
		tweenmax:{
			exprots:'tweenmax'
		},
		tree:{
			deps:['tweenmax']
		}
	}
});
	
require(['jquery', "bootstrap", 'text!top', 'text!projects', 'text!recruitment'],
	function($, bootstrap, top, projects, recruitment) {
		var template = document.querySelector('#template');
//		var cloud = document.querySelector('#cloud');
	    var url = location.hash.replace('#','');
	    if(url === ''){
	        url = 'top';           //default page
	    }
//	    if(!window[url]){
//	        url = "notfound";		//设置404页面
//	    }
//		console.log(url)
		switch (url){
			case 'top':
				goto(top,['three74','cloud']);
				break;
			case 'projects':
				goto(projects,['tweenmax','tree'],function(tm,tree){
					console.log(tm)
				});
				break;
			case 'recruitment':
				goto(recruitment,['three74','cloud']);
				break;				
			default:
				break;
		}

		
		function goto(page,jsArr,callback){
			template.innerHTML = page;
			require(jsArr,callback);
		}
});