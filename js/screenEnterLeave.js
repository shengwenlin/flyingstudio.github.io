//首页
function oneScreenEnter() {
	var one = document.getElementById('one');
	var oneVideo = document.getElementsByTagName('video')[0];
	oneVideo.play();
	var oneFont = getByClass(one, 'div', 'videoFont')[0];
	oneFont.style.display = 'block';
	addClass(oneFont, 'videoFontMove');
	window.onOff2 = true;
}

function oneScreenLeave() {
	var one = document.getElementById('one');
	var oneVideo = document.getElementsByTagName('video')[0];
	oneVideo.pause();
	var oneFont = getByClass(one, 'div', 'videoFont')[0];
	oneFont.style.display = 'none';
	removeClass(oneFont, 'videoFontMove');
}

//打字机
function threeScreenEnter() {
	var othree = document.getElementById('three');
	var typewriter = othree.getElementsByClassName('typewriter')[0];
	var oWenZi = othree.getElementsByClassName('wenzi')[0];
	var text = '<h1>welcome to our studio!</h1>';
	typeWriter(typewriter, text);
	window.onOff2 = true;
}

function threeScreenLeave() {
	var othree = document.getElementById('three');
	var typewriter = othree.getElementsByClassName('typewriter')[0];
	var oWenZi = othree.getElementsByClassName('wenzi')[0];

	clearInterval(typewriter.timer);
	typewriter.innerHTML = '&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
}

//联系
function sevenScreenEnter() {
	var oContactUl = document.getElementsByClassName('contactUl')[0];
	var aLi = oContactUl.getElementsByTagName('li');
	var timer = null;
	var iNow = 0;
	timer = setInterval(function() {
		if (iNow >= 2) {
			clearInterval(timer);
			window.onOff2 = true;
		}
		showContact();
	}, 300);

	function showContact() {
		addClass(aLi[iNow++], 'show');
	}
}

function sevenScreenLeave() {
	var oContactUl = document.getElementsByClassName('contactUl')[0];
	var aLi = oContactUl.getElementsByTagName('li');
	for (var i = 0; i < aLi.length; i++) {
		removeClass(aLi[i], 'show');
	}
}

//各组介绍,第二个参数为进入或离开
function introduction(id,eorl){
	var oScreenRightPart = document.getElementsByClassName(id+'RightPart')[0];
	var oBlub = document.getElementsByClassName(id+'Blub')[0];
	var oWenZi = document.getElementsByClassName(id+'WenZi')[0];
	if ( eorl ) {
		startMove2(oScreenRightPart,'right',5,0,false,function(){
			startMove(oBlub,{'opacity':100},5,function(){
				startMove(oWenZi,{'opacity':100},5,function(){
					window.onOff2 = true;
				});
			});
		});
	} else {
		clearInterval(oScreenRightPart.timer);
		clearInterval(oBlub.timer);
		clearInterval(oWenZi.timer);
		oScreenRightPart.style.right = '-300px';
		oBlub.style.opacity = '0';
		oWenZi.style.opacity = '0';
	}
}