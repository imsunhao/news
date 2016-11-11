// JavaScript Document
var hsxd_jingdong={
	//京东菜单====================================================================
	menu:function(){
		var oMenu=document.getElementById('taobaoMenu');
		var aLi=oMenu.getElementsByTagName('li');
		var oMenuCont=document.getElementById('menuCont');
		var aDl=oMenuCont.getElementsByClassName('section');
		var leave_menu=null;//离开右侧 回到左侧
		
		//删除所有li上的ac
		function del_li_ac(){
			for(var i=0; i<aLi.length; i++){
				aLi[i].className="";
			};
		}
		
		
		for(var i=0; i<aLi.length; i++){
			aLi[i].index=i;//发牌照
			
			aLi[i].onmouseover=function(){
				clearTimeout(leave_menu);
				oMenuCont.style.display="block";
				del_li_ac();//删除所有li上的ac  
				this.className="ac";//自己增加ac
				
				
				//显示相对应的内容(就是选项卡的原理)
				for(var i=0; i<aDl.length; i++){
					aDl[i].style.display="none";
				};
				aDl[this.index].style.display="block";
			};
			
			aLi[i].onmouseout=function(){
				clearTimeout(leave_menu);
				leave_menu=setTimeout(function(){
					oMenuCont.style.display="none";
					del_li_ac();//删除所有li上的ac  
				},100)
			};
		};
		
		oMenuCont.onmouseenter=function(ev){
			clearTimeout(leave_menu);
			this.style.display="block";
		};
		
		
		oMenuCont.onmouseleave=function(){
				del_li_ac();//删除所有li上的ac  
				this.style.display="none";
		};
	},
	//京东floor滚动============================================================================================
	afloor:function(){
		var LocationFloorList=getByClass(document,'LocationFloorList')[0];
		var aLi=LocationFloorList.getElementsByTagName('li');
		var aFloor=getByClass(document,'floor');
		var arr=[];
			
		//-------------------------------------------------
			
		for(var i=0; i<aFloor.length; i++){
			var json={};
			json.name=i;
			json.offsetTop=aFloor[i].offsetTop;
			arr.push(json);  //我想想
		};
		
		window.onscroll=function(){
			//显示楼层编号-------------------------------------------------
			var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
			if(scrolltop>100){
				LocationFloorList.style.display='block';
			}else{
				LocationFloorList.style.display='none';
			};
			
			// 根据楼层滚动位置，定位编号------------------------------------------------
			var last_arr=[];
			for(var j=0; j<arr.length; j++){
				if(arr[j].offsetTop<scrolltop){
					last_arr.push(arr[j].name);
				}
			};
			console.log(last_arr)
			var li_index=last_arr[last_arr.length-1];
			
	
			for(var l=0; l<aFloor.length; l++){
				aLi[l].className='';
			};
			aLi[li_index].className='ac';
		};
		
		//点击编号，跳转到相对楼层-----------------------------------------------
		for(var i=0; i<aFloor.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var end=arr[this.index].offsetTop;
				move(start,end)
			}
		};
		//move-------------------------------------------------------
		var timer;
		function move(start,end){
			var dis=end-start;
			var count=parseInt(1500/30);
			var n=0;
			clearInterval(timer);
			timer=setInterval(function(){
				n++;
				var a=1-n/count;
				var step_dis=start+dis*(1-a*a*a*a);
				window.scrollTo(0,step_dis);
				if(n==count){
					clearInterval(timer);
				};
			},30)
		};
		
		function getByClass(oParent,cls){
			var arr=[]; //容器
			if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
			else{
				var aEl=oParent.getElementsByTagName('*');//所有标签
				for(var i=0;i<aEl.length;i++){
					if(aEl[i].className.indexOf(cls)!=-1) arr.push(aEl[i]);//向数组中添加
				}
			return arr;
			}
		};
	},
	
	//选项卡======================================================================================================
	
	hxsd_tab:function (id){
		var oTab=document.getElementById(id);
		var oUl=oTab.getElementsByClassName('tabList')[0];
		var aLi=oUl.getElementsByTagName('li');
		var tabItem=oTab.getElementsByClassName('tabItem');
		
		//选项卡
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				for(var i=0;i<aLi.length;i++){
					aLi[i].className='';	
					tabItem[i].style.display="none";
				};		
				this.className='ac';
				tabItem[this.index].style.display="block";
			};
		};
		
	},
	
	//===========================================================================================================
}
	