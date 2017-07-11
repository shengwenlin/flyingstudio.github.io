//根据类名获取元素
function getByClass(parent, tagName, className) {
	var aEls = parent.getElementsByTagName(tagName);
	var arr = [];

	for (var i = 0; i < aEls.length; i++) {
		var aClassName = aEls[i].className.split(' ');
		for (var j = 0; j < aClassName.length; j++) {
			if (aClassName[j] == className) {
				arr.push(aEls[i]);
				break;
			}
		}
	}

	return arr;
}

//增加类名
function addClass(obj, className) {
	//原来没有类名
	if (obj.className == '') {
		obj.className = className;
	} else { //原来有类名
		var arrClassName = obj.className.split(' ');
		var _index = arrIndexOf(arrClassName, className);
		if (_index == -1) { //要添加的类名在原来的class中不存在
			obj.className += ' ' + className;
		} //要添加的类名在原来的class中存在的话什么都不要做了
	}
}

//移除类名
function removeClass(obj, className) {
	//原来有类名
	if (obj.className != '') {
		var arrClassName = obj.className.split(' ');
		var _index = arrIndexOf(arrClassName, className);
		if (_index != -1) { //要删除的类名存在
			arrClassName.splice(_index, 1);
			obj.className = arrClassName.join(' ');
		}
	}
}

//按值搜索，返回序号
function arrIndexOf(arr, v) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == v) {
			return i;
		}
	}
	return -1;
}

//绑定事件
function addEvent(obj, evname, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evname, fn, false);
	} else {
		obj.attachEvent('on' + evname, function() {
			fn.call(obj);
		});
	}
}

//移除事件
function removeEvent(obj, evname, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(evname, fn, false);
	} else {
		obj.detachEvent('on' + evname, function() {
			fn.call(obj);
		});
	}
}

//获取元素的样式
function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

//打字机效果
function typeWriter(obj, text, endFn) {

	var arr = text.split('');
	var i = 0;

	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		obj.innerHTML += arr[i++];
		if (i >= arr.length) {
			clearInterval(obj.timer);
			endFn && endFn();
		}
	}, 200);
}

//缓冲运动函数,ciShu这个参数值一般为0~10控制每次运动的多少
function startMove(obj, json, ciShu,endFn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true;

		for (var attr in json) {
			var iCur = 0;

			if (attr == 'opacity') {
				iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			var iSpeed = (json[attr] - iCur) / ciShu;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (iCur != json[attr]) bStop = false;

			if (attr == 'opacity') {
				obj.style.opacity = (iCur + iSpeed) / 100;
				obj.style.filter = 'filter:alpha(opacity:' + (iCur + iSpeed) + ')';
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}

		if (bStop) {
			clearInterval(obj.timer);
			endFn && endFn();
		}

	}, 30);
}

//匀速运动、加速运动函数
function startMove2(obj, attr, dir, target, isLinear,endFn) {
	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir; //确定方向
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {

		if( !isLinear ) {//不是匀速运动的话
			dir > 0 ? dir += 5 : dir -= 5;//dir每次变化5px
		}
		var speed = parseInt(getStyle(obj, attr)) + dir; // 步长

		if (speed > target && dir > 0 || speed < target && dir < 0) {
			speed = target;
		}
		obj.style[attr] = speed + 'px'; //改变位置
		if (speed == target) {
			clearInterval(obj.timer);
			endFn && endFn(); //存在回调函数的话，调用回调函数
		}
	}, 30);
}