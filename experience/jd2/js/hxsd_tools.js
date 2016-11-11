// JavaScript Document
var hsxd_tools={
	//居中显示弹框
	"popShow":function(elm){
		elm.style.display="block";
		var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
		var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
		elm.style.left=l+'px';
		elm.style.top=t+'px';
	},
	
	
	//拖拽
	"drag":function(box,title){
		//当我传入1个参数box，拖拽box
		//当我传入2个参数，拖拽就在title
		var handle;
		title?handle=title:handle=box;
	//----------------------------------------
	//点击事件 title
		handle.onmousedown=function(ev){//按下时机  记录下鼠标的错位位置
			var oEv=ev || window.event;
			var disX=oEv.clientX-box.offsetLeft;//left方向
			var disY=oEv.clientY-box.offsetTop;// top 方向
		
			//鼠标移动的对象应该是document
			document.onmousemove=function(ev){//移动拖拽
				var oEv=ev || window.event;
				var l=oEv.clientX-disX;
				var t=oEv.clientY-disY;
				
				//判断屏幕范围
				if(l<0)l=0;
				if(t<0)t=0;
				if(l>document.documentElement.clientWidth-box.offsetWidth)l=document.documentElement.clientWidth-box.offsetWidth;
				if(t>document.documentElement.clientHeight-box.offsetHeight)t=document.documentElement.clientHeight-box.offsetHeight;
				
				//最后赋值
				box.style.left=l+'px';
				box.style.top=t+'px';
			};
			
			//释放鼠标move事件
			document.onmouseup=function(){
				document.onmousemove=null;
			};
			return false;
		};
	},
	
	getStyle:function (obj,styleName){
		var value;
		value=obj.currentStyle ? currentStyle[styleName]: getComputedStyle(obj,false)[styleName];
		if(styleName=='opacity'){
			value=Math.round(parseFloat(value)*100);
		}else{
			value=parseInt(value);
		}
		return value;
	},
	
	
	move:function (obj,modeJons,time,fn){   //现在这块就是一个对象了 传参数的方式变了，  原来，end是作为终点的， 现在是放在json里了
		var p_speed={
			veryslow:5000,
			slow:2000,
			normal:1000,
			flast:700,
			veryflast:300
		}
		
		if(time){
			if(typeof time=='string'){ 
				time=p_speed[time];
			}
			
		}else{
			time=p_speed.normal;
		}	
		//------------------------------------------------
		/*var start=getStyle(obj,mode);//起始位置
		var dis=end-start;//移动距离*/
		
		var start={}
		var dis={}
		
		for(var key in modeJons){  //这里面的key的值呢 就相当于 modeJons 里面的值了  可以理解成形参   就是说key是modeJons里的每一个值
			start[key]=this.getStyle(obj,key) //这块就可以
			dis[key]=modeJons[key]-start[key];
			/*console.log(start,dis)*/
		}
		
		var count=parseInt(time/30);   //分隔时间
		var n=0; //进步
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){//  obj.timer 就是 var timer的意思一样的
			n++;
			var a=1-n/count;
			for(var key in modeJons){
				var spet_div=start[key]+dis[key]*(1-a*a*a*a);
				/*obj.style[key]=spet_div+'px';*/
				if(key=="opacity"){
					obj.style.filter='alpha(opacity:'+spet_div+')'; //filter（属性）     'alpha(opacity:'+spet_div+')'套路
					obj.style.opacity=spet_div/100;      //透明度 是从0-1；但是，如果这样的话，透明度只有10级，我们把这个值放大，就可以产生0.12 0.25  2位以上的小数，透明度的变化就更自然了，否则，只有10级，会显得很生硬  
				}else{
					obj.style[key]=spet_div+'px';
				}
			}		
			
			if(n==count){
				clearInterval(obj.timer);
				fn && fn();
			}
		},50)
	},
};


