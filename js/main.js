
$(function () {
	var $timeline_block = $('.cd-timeline-block');
	$timeline_block.each(function(){
		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});
	$(window).on('scroll', function(){
		$timeline_block.each(function(){
			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
			if($(this).offset().top <= $(window).scrollTop()-$(this).offset().top){
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('bounce-in').addClass('is-hidden');
			}
			if($(this).offset().top >= $(window).scrollTop()+$(window).height()){
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('bounce-in').addClass('is-hidden');
			}
		});
	});
	var cvs=$('#cvs')[0];
	var ctx=cvs.getContext('2d');

	var start=-Math.PI/2;
	var end=start+Math.PI/3;
	var start2=-Math.PI/2;
	var end2=start+Math.PI/6;
	var color1=0;
	var color2=0;
	function randomColor() {
		return '#'+(function (color) {
				return(color+='0123456789abcdef'[Math.floor(Math.random()*16)])&&(color.length==6)?color:arguments.callee(color);
			})('');
	}
	function reset() {
		ctx.beginPath();
		// ctx.fillRect(0,0,cvs.width,cvs.height);
		ctx.arc(250,250,100,0,Math.PI*2);
		ctx.lineWidth=20;
		ctx.strokeStyle='#eee';
		ctx.stroke();
	}
	function draw() {
		ctx.beginPath();
		ctx.arc(250,250,100,start,end);
		ctx.lineWidth=10;
		ctx.strokeStyle=color1;
		ctx.stroke();
	}
	function draw2() {
		ctx.beginPath();
		ctx.arc(250,250,100,start2,end2);
		ctx.lineWidth=10;
		ctx.strokeStyle=color2;
		ctx.stroke();
	}
	setInterval(function () {
		reset();

		start+=Math.PI/60;
		end=start+Math.PI/3;

		start2+=Math.PI/30;
		end2=start2+Math.PI/6;

		draw();
		draw2();
	},30);
	setInterval(function () {
		color1=randomColor();
		color2=randomColor();
	},100);

});