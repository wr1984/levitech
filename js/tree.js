;(function(window,document){
	var screenW = window.innerWidth;
	//获取窗口高度-nav高度，指定tree展示窗口高度
	var tree_height = window.innerHeight - 50;
	var height = tree_height;
	if(tree_height < 568){
		tree_height = 568;
	}
	if(tree_height > 1200){
		tree_height = 1200;
	}
	var tree = document.querySelector('.tree');
	tree.style.height = tree_height + 'px';
	var width = tree.offsetWidth;
	
	//指示器位置
	var indicators = document.querySelector('.indicators');
	indicators.style.top = height/2+'px';
	indicators.style.right = (screenW-width)/4 -5+ 'px';
	//左侧关注图标
	var attention = document.querySelector('.attention');
	attention.style.top = height/2 + 'px';
	attention.style.left = (screenW-width)/4 -15 + 'px';
	if(screenW >= 768){
		indicators.style.visibility = "visible";
		attention.style.visibility = "visible"
	}
	
	
	//获取tree背景图片在该高度下的宽度指定给move，要确保背景图片和svg一样 的宽和高。
	var img_bg = document.querySelector('#img_bg');
	var move = document.querySelector('.move');
//	img_bg.style.height = tree_height + 'px';
	var img_width;
	img_bg.onload = function(){
		img_width = img_bg.offsetWidth;
		move.style.width = img_width + 'px';
	}
	
	var embed = document.querySelector('#tree_bg');
	var svg_yz;
	window.onload = function(){
		svg_yz = embed.getSVGDocument().querySelector('#svg');
		
		var left = null;
		setInterval(function(){
			left-=1;
			if(left <= -img_width/2){
				left = 0;
			}
			move.style.left = left + 'px';
		},1000/60);
		
		var yzOrigin = ["0% 100%", "10% 100%", "0% 50%", "0% 100%", "90% 100%", "100% 60%", "90% 100%", "0% 100%", "0% 100%","10% 100%","100% 100%","0% 100%","0% 100%","100% 60%","100% 80%","100% 100%","0% 100%",
						"0% 100%", "10% 100%", "0% 50%", "0% 100%", "90% 100%", "100% 60%", "90% 100%", "0% 100%", "0% 100%","10% 100%","100% 100%","0% 100%","0% 100%","100% 60%","100% 80%","100% 100%","0% 100%"];
		var hdOringin = ["50% 50%", "50% 50%","50% 50%", "50% 50%"];

		hdArr1 = initSucai('hd1_', 'hd2_', 4, hdOringin, svg_yz);
		sucai1Arr = initSucai('yz1_', 'yz2_', 34, yzOrigin, svg_yz);

		sucai1Arr.forEach(function(yz) {
			yz.init();
			yz.grow(randomInRange(5, 20), randomInRange(1, 5));
		});
		hdArr1.forEach(function(hd) {
			hd.init();
			hd.grow(0.1, 0.1);
		});
	};
	
	window.addEventListener('resize',resizeEvent);
	function resizeEvent(){
		screenW = window.innerWidth;
		tree_height = window.innerHeight - 50;
		height = tree_height;
		if(tree_height > 568){
			tree.style.height = tree_height + 'px';
		}
		if(tree_height > 1200){
			tree_height = 1200;
		}
		width = tree.offsetWidth;
		img_width = img_bg.offsetWidth;
		move.style.width = img_width + 'px';
		
			//指示器位置
		indicators.style.top = height/2+'px';
		indicators.style.right = (screenW-width)/4 -5+ 'px';
		//左侧关注图标
		attention.style.top = height/2 + 'px';
		attention.style.left = (screenW-width)/4 -15 + 'px';
		if(screenW >= 768){
			indicators.style.visibility = "visible";
			attention.style.visibility = "visible"
		}else{
			indicators.style.visibility = "hidden";
			attention.style.visibility = "hidden"
		}
	}
	
	setInterval(function(){
		sucai1Arr.forEach(function(yz){
			if(Math.random() > 0.6){
				yz.shake();
			}
		})
	}, 15000);
	
	tree.addEventListener('mousemove',mousemoveEvent);
	function mousemoveEvent(e){
		sucai1Arr.forEach(function(yz){
			if(Math.random() > 0.98){
				yz.shake();
			}
		})
	};
	tree.addEventListener('mousedown',function(e){
		e.preventDefault();
	});
	
	function initSucai(name1, name2, count, origin, svg) {
		var arr = [];
		for(var i = 0; i < count; i++) {
			arr.push(new SucaiObj(name1, name2, i, origin, svg));
		}
		return arr;
	};

	function SucaiObj(name1, name2, index, origin, svg) {
		this.el = svg.getElementById(name1 + index);
		this.el2 = svg.getElementById(name2 + index);
		this.x;
		this.y;
		this.opacity = 0.9;
		this.scale = 0;
		this.transformOrigin = origin[index];
		this.isFall = false;
		this.isGrow = false;
		this.isShake = false;

		SucaiObj.prototype.init = function() {
			TweenMax.set([this.el, this.el2], {
				opacity: this.opacity,
				scale: this.scale,
				transformOrigin: this.transformOrigin
			});
		}
		SucaiObj.prototype.grow = function(growTime, delayTime, scale, startAt) {
			this.isGrow = true;
			TweenMax.to([this.el, this.el2], growTime || 10, {
				scale: scale || 1,
				ease: Linear.easeNone,
				delay: delayTime || 2,
				startAt: startAt,
				onComplete: function(me) {
					me.isGrow = false
				},
				onCompleteParams: [this]
			});
		}
		SucaiObj.prototype.shake = function() {
			var temp = [-1, 1];
			if(!this.isFall && !this.isGrow && !this.isShake) {
				this.isShake = true;
				new TimelineMax().to([this.el, this.el2], 0.5, {
						rotation: randomInRange(5,20) * temp[Math.round(Math.random())]
					})
					.to([this.el, this.el2], randomInRange(10,15), {
						rotation: 0,
						ease: Elastic.easeOut.config(3, 0.1),
						onComplete: function(me) {
							me.isShake = false;
//							if(Math.random() > 0.3) {
								me.fall();
//							}
						},
						onCompleteParams: [this]

					})
			}
		}
		SucaiObj.prototype.fall = function() {
			if(this.isGrow || this.isFall) {
				return
			};

			this.isFall = true;
			var temp = [-1, 1];
			var t = new TimelineMax({
				onComplete: this.reGrow,
				onCompleteParams: [this]
			});
			t.to([this.el, this.el2], 10, {
					y: 1811,
				})
				.to([this.el, this.el2], 15, {
					x: randomInRange(15,50) * temp[Math.round(Math.random())],
					ease: Elastic.easeOut.config(3, 0.1)
				}, "-=9.8")
				.to([this.el, this.el2], 6, {
					rotation: randomInRange(60, 360)* temp[Math.round(Math.random())],
				}, "-=15")
				.to([this.el, this.el2], 6, {
					skewX:randomInRange(30, 360) * temp[Math.round(Math.random())] + 'deg',
				}, "-=15")
		}

		SucaiObj.prototype.reGrow = function(obj) {
			obj.isFall = false;
			obj.grow(randomInRange(5, 10), randomInRange(1, 5), 1, {
				x: 0,
				y: 0,
				rotation: 0,
				scale: 0,
				skewX:0
			});
		}
	}

	function randomInRange(min, max) {
		return Math.round(Math.random() * (max - min + 1)) + min;
	}
})(window,document);
