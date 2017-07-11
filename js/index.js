//=====================全局变量及其意思=============================
//window.onOff  标志右侧导航栏是否出现的变量，没出现为false;
//window.onOff2 标志鼠标滚轮滚动时是否能进行翻屏的变量，不能为false;
//window.iNow   标志当前界面显示的是第几个屏幕的变量，从0开始;
//window.bHavaMask  标志当前页面有没有因为屏幕尺寸太小出现了弹出层的变量
//=====================全局变量及其意思=============================

//开场动画
advanceBlockMove('advanceBlock');

window.onload = function() {

	var aSection = document.getElementsByClassName('warp');
	var iHeight = document.documentElement.clientHeight;
	for (var i = 1; i < aSection.length; i++) {
		aSection[i].style.top = iHeight + 'px';
	}

	//屏幕切换
	switchScreen('warp', 'sectionList');

	//使第一屏的视频全屏
	makeVideoFullScreen('oneVideo');

	//顶部导航栏处功能的实现
	topNavFunction1('more','nav');

	//联系那一块微信鼠标移入效果
	showWeiXin();

	//屏幕大小检测，当屏幕太小不足以容下内容时禁止用户访问
	window.bHavaMask = false;
	oMaximieren = null;
	if ( document.documentElement.clientHeight < 460 ) {
		oMaximieren = maximieren();
		window.bHavaMask = true;
	}
	addEvent(window,'resize',function(){
		var iHeight = document.documentElement.clientHeight;
		if ( iHeight < 460 ) {
			if(!window.bHavaMask) {
				oMaximieren = maximieren();
				window.bHavaMask = true;
			}
		}else{
			if ( oMaximieren ) {
				document.body.removeChild(oMaximieren);
				oMaximieren = null;
				window.bHavaMask = false;
			}
		}
	});

	//当用户浏览器界面太小时调用此函数生成一个弹出层，要求用户将浏览器界面最大化
	function maximieren(){
		var oMaximieren = document.createElement('div');
		oMaximieren.className = 'maximieren';
		oMaximieren.innerHTML = '<div class="maximierenDiv"><img src="img/maximieren.png" /><div class="maximierenFont">建议你将浏览器最大化，以便获得更好的浏览体验</div></div>';
		document.body.appendChild(oMaximieren);
		return oMaximieren;
	}
}

//对应第多少屏幕出现后该干的事
function screenShow(iNow) {
	switch (iNow) {
		case 0:
			oneScreenEnter();
			introduction('two',false);
			break;
		case 1:
			oneScreenLeave();
			introduction('two',true);
			threeScreenLeave();
			break;
		case 2:
			introduction('two',false);
			threeScreenEnter();
			introduction('four',false);
			break;
		case 3:
			threeScreenLeave();
			introduction('four',true);
			introduction('five',false);
			break;
		case 4:
			introduction('four',false);
			introduction('five',true);
			introduction('six',false);
			break;
		case 5:
			introduction('five',false);
			introduction('six',true);
			sevenScreenLeave();
			break;
		case 6:
			introduction('six',false);
			sevenScreenEnter();
			break;
	}
}

//使第一屏的视频全屏
function makeVideoFullScreen(videoClassName) {
	var oOne = document.getElementById('one');
	var oneVideo = getByClass(document, 'video', videoClassName)[0];
	oneVideo.volume = 0; //视频静音
	var screenWH = {
		'width': oOne.clientWidth,
		'height': oOne.clientHeight
	};
	var videoScale = oneVideo.videoWidth / oneVideo.videoHeight;

	addEvent(window, 'resize', function calScreenWH() {
		screenWH = {
			'width': oOne.clientWidth,
			'height': oOne.clientHeight
		}
		setVideoWH();
	});

	//设置video的宽高
	function setVideoWH() {
		var screenScale = screenWH['width'] / screenWH['height'];
		var direction = videoScale > screenScale ? 'height' : 'width';
		oneVideo.style.cssText = direction + ':' + screenWH[direction] + 'px';
	}
	setVideoWH();
}

//开场动画展示进行隐藏的功能实现
function advancePic(advance, box, endFn) {
	var oAdvance = document.getElementById(advance);
	var oBox = document.getElementById(box);

	startMove(oAdvance, {
		'opacity': '0'
	}, 8,function() {
		oAdvance.style.display = 'none';
	});
	oBox.style.display = 'block';
	startMove(oBox, {
		'opacity': '100'
	}, 8,function() {
		clearTimeout(oAdvance.showTimer);
		endFn && endFn();
	});
}

//开场图片绿色块运动的函数
function advanceBlockMove(blockClassName) {
	var oBlock = getByClass(document, 'span', blockClassName)[0];
	var iTarget = document.documentElement.clientWidth;

	//根据屏幕宽度进行不同速度的运动
	var iSpeed = 30;
	startMove2(oBlock, 'left', iSpeed,iTarget,true, function() {
		advancePic('advance', 'box');
		oneScreenEnter();
	});
}

//顶部导航栏处动能的实现（移入移出点击事件）
function topNavFunction1(className,id,className2) {
	var oTopNav = document.getElementsByClassName(className)[0];
	var oRightNav = document.getElementById(id);
	var aRightLi = oRightNav.getElementsByClassName('navUl')[0].getElementsByTagName('li');
	var oUlMore = oTopNav.getElementsByTagName('ul')[0];
	var oSpanMore = oTopNav.getElementsByTagName('span')[0];
	var aWarp = document.getElementsByClassName('warp');
	window.onOff = false;//标志右侧导航栏是否出现的变量

	//顶部导航栏鼠标移入效果
	oTopNav.onmouseover = function(){
		addClass(oUlMore,'ulActive');
		addClass(oSpanMore,'spanActive');
	}
	oTopNav.onmouseout = function(){
		if ( !window.onOff ) {
			removeClass(oUlMore,'ulActive');
			removeClass(oSpanMore,'spanActive');
		}
	}

	//顶部导航栏点击事件
	oTopNav.onclick = function(){
		var oRightPart = null;
		if( window.onOff2 ) {
			if( !window.onOff ) {//没有出现的情况下点击，右侧导航栏出现
				rightNavShow();
				window.onOff = true;
			} else {//出现的情况下点击，右侧导航栏隐藏
				rightNavHidden();
				window.onOff = false;
			}
		}
	}

	function rightNavShow() {
		addClass(oUlMore, 'ulActive');
		addClass(oSpanMore, 'spanActive2');
		if (window.iNow == 1 || window.iNow == 3 || window.iNow == 4 || window.iNow == 5) { //2、4、5、6屏的处理
			oRightPart = document.getElementById(numChange(window.iNow)).getElementsByClassName(numChange(window.iNow) + 'RightPart')[0];
			startMove2(oRightPart,'right',5,-300,false,function(){
				startMove2(oRightNav,'right',5,0,false,function(){
					showLi(aRightLi);
				});
			});
		} else {
			startMove2(aWarp[window.iNow],'left',5,-300,false);
			startMove2(oRightNav,'right',5,0,false,function(){
				showLi(aRightLi);
			});
		}
	}
	function rightNavHidden() {
		removeClass(oSpanMore, 'spanActive2');
		if (window.iNow == 1 || window.iNow == 3 || window.iNow == 4 || window.iNow == 5) { //2、4、5、6屏的处理
			oRightPart = document.getElementById(numChange(window.iNow)).getElementsByClassName(numChange(window.iNow) + 'RightPart')[0];
			startMove2(oRightNav,'right',5,-300,false,function(){
				hiddenLi(aRightLi);
				startMove2(oRightPart,'right',5,0,false);
			});
		} else {//其他屏幕的处理
			startMove2(aWarp[window.iNow],'left',5,0,false);
			startMove2(oRightNav,'right',5,-300,false,function(){
				hiddenLi(aRightLi);
			});
		}
	}
}

//顶部导航栏文字上下移动功能的实现
function topNavFunction2(className1) {
	var oTopNav = document.getElementsByClassName(className1)[0];
	var oUlMore = oTopNav.getElementsByTagName('ul')[0];
	var target = -window.iNow*24;
	startMove(oUlMore,{'top':target},6);
}

//右侧li的显示隐藏
function showLi(aRightLi) {
	var i = 0;

	function subShowLi() {
		if (i == 0 || i == 2) {
			i++;
		}
		addClass(aRightLi[i++], 'show');
	}
	var timer = setInterval(function() {
		if (i >= aRightLi.length - 1) {
			clearInterval(timer);
		}
		subShowLi();
	}, 100);
}
function hiddenLi(aRightLi) {
	for (var i = 0; i < aRightLi.length; i++) {
		removeClass(aRightLi[i], 'show');
	}
}

//数字转换
function numChange(n) {
	var result = 0;
	switch(n) {
		case 0:result = 'one';break;
		case 1:result = 'two';break;
		case 2:result = 'three';break;
		case 3:result = 'four';break;
		case 4:result = 'five';break;
		case 5:result = 'six';break;
		case 6:result = 'seven';break;
		default:result = 0;
	}
	return result;
}

//翻屏效果，一参为块，二参为列表
function switchScreen(className1, className2) {
	var aSection = getByClass(document, '*', className1);
	var iHeight = aSection[0].offsetHeight;
	window.onOff2 = true;
	window.iNow = 0;
	var zIndexNum = 0;
	var oUl = getByClass(document, '*', className2)[0];
	var oNav = document.getElementById('nav');
	var aLi = oNav.getElementsByClassName('navUl')[0].getElementsByTagName('li');
	var aLiA = oNav.getElementsByClassName('navUl')[0].getElementsByTagName('a');
	var aAllow = document.getElementsByClassName('allow');
	var oTopNav = document.getElementsByClassName('more')[0];
	var oUlMore = oTopNav.getElementsByTagName('ul')[0];
	var oSpanMore = oTopNav.getElementsByTagName('span')[0];

	//初始化
	for (var i = 1; i < aSection.length; i++) {
		aSection[i].style.top = iHeight + 'px';
	}

	window.onmousewheel = fn;
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', fn, false);
	}

	//向下箭头点击事件
	for (var i = 0; i < aAllow.length; i++) {
		aAllow[i].onmousedown = function(){
			downward();
			topNavFunction2('more');//顶部导航栏移动
			liChange();
		};
	}

	//li的点击事件
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index = i;
		aLi[i].onclick = function() {
			if (window.onOff2) {
				window.onOff2 = false;
				var _this = this;

				//先将右侧导航栏隐藏
				removeClass(oUlMore,'ulActive');
				removeClass(oSpanMore,'spanActive2');
				removeClass(oSpanMore,'spanActive');
				startMove2(aSection[window.iNow],'left',5,0,false);
				startMove2(oNav,'right',5,-300,false,function(){
					hiddenLi(aLi);//隐藏后将li也隐藏
					window.onOff = false;
					if (_this.index > window.iNow) { //点击后面的
						aSection[_this.index].style.top = '0px';
						aSection[_this.index].style.zIndex = 0;
						startMove2(aSection[window.iNow], 'top', 5, -iHeight,false,function(){
							aSection[window.iNow].style.zIndex = 0;
							window.iNow = _this.index;
							aSection[window.iNow].style.zIndex = 1;
							screenShow(window.iNow);
							topNavFunction2('more');
						});
					} else if (_this.index < window.iNow) { //点击前面的
						aSection[_this.index].style.top = -iHeight + 'px';
						aSection[_this.index].style.zIndex = 1;
						aSection[window.iNow].style.zIndex = 0;
						startMove2(aSection[_this.index], 'top', 5, 0,false,function(){
							aSection[window.iNow].style.top = iHeight + 'px';
							window.iNow = _this.index;
							screenShow(window.iNow);
							topNavFunction2('more');
						});
					}

					//列表的变化
					for (var i = 0; i < aLi.length; i++) {
						aLiA[i].className = '';
					}
					aLiA[_this.index].className = 'active';
				});
			}
		}
	}

	//窗口大小改变事件
	window.onresize = function() {
		iHeight = aSection[0].offsetHeight;
		for (var i = 0; i < aSection.length; i++) {
			if (aSection[i].offsetTop < 0) {
				aSection[i].style.top = -iHeight + 'px';
			} else if (aSection[i].offsetTop > 0) {
				aSection[i].style.top = iHeight + 'px';
			}
		}
	}

	//鼠标滚轮事件
	function fn(ev) {
		if( window.bHavaMask ) return;//当屏幕太小出现弹出层时鼠标滚轮事件函数不执行
		var ev = ev || event;
		var b; //记录滚轮滚动方向的变量，b值为true代表上，b值为false代表下

		//判断滚动方向
		if (ev.wheelDelta) {
			b = ev.wheelDelta > 0 ? true : false;
		} else {
			b = ev.detail < 0 ? true : false;
		}

		if (window.onOff2) {
			window.onOff2 = false;

			if (b) { //滚轮往上滚动
				upward();
			} else { //滚轮往下滚动，当前的往上移
				downward();
			}

			topNavFunction2('more');//顶部导航栏移动
			liChange();
		}
	}

	function upward() {
		if (window.iNow != 0) {
			aSection[window.iNow--].style.zIndex = 0;
			aSection[window.iNow].style.top = -iHeight + 'px'; //提前将其移到屏幕上方，方便等会往下运动
			aSection[window.iNow].style.zIndex = 1;
			startMove2(aSection[window.iNow], 'top', 5, 0, false,function() {
				aSection[window.iNow + 1].style.top = iHeight + 'px'; //被盖住的这一层往下移
				//由对应屏幕动画完成时修改为true
				//window.onOff2 = true;
				screenShow(window.iNow); //当这一屏运动完后进行相应屏幕的对应操作
			});
		} else {
			window.onOff2 = true;
		}
	}

	function downward() {
		if (window.iNow != aSection.length - 1) {
			aSection[window.iNow+1].style.top = '0px';//后一个移到0
			startMove2(aSection[window.iNow++], 'top', 5, -iHeight,false, function() {//往上移
				screenShow(window.iNow); //当这一屏运动完后进行相应屏幕的对应操作
				aSection[window.iNow].style.zIndex = 1;//层次为1
				aSection[window.iNow-1].style.zIndex = 0;//前一个层次改为0
			});
		} else {
			window.onOff2 = true;
		}
	}

	//列表变化
	function liChange() {
		for (var i = 0; i < aLi.length; i++) {
			aLiA[i].className = '';
		}
		aLiA[window.iNow].className = 'active';
	}
}

//联系我们微信鼠标移入效果
function showWeiXin() {
	var oUl = document.getElementsByClassName('contactUl')[0];
	var oWeiXin = document.getElementsByClassName('weiXin')[0];
	var aLi = oUl.getElementsByTagName('li');

	aLi[2].onmouseover = function() {
		addClass(oWeiXin,'show');
		startMove(oWeiXin,{'opacity':100},6);
	}
	aLi[2].onmouseout = function() {
		removeClass(oWeiXin,'show');
		startMove(oWeiXin,{'opacity':0},6);
	}
};

//qq空间时空轴信息删除代码
var a = document.getElementsByClassName('ui_ico ico_delete j_delete');
var i = 0;
var timer = setInterval(function() {
	a[i++].click();
	setTimeout(function() {
		var b = document.getElementsByClassName('qz_dialog_layer_btn qz_dialog_layer_sub')[0];
		b.click();
	}, 500);
}, 1000);