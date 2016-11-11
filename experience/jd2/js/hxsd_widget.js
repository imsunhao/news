// JavaScript Document
var hsxd_widget={
	//幻灯片_左右滑动=============================================================================
	slide:function(id,numShow){
		var oDiv=document.getElementById(id);
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		 
		var pBtn=oDiv.children[0];
		var nRtn=oDiv.children[1];
		var n=0;
		
		function changebtn(){
			for(var k=0;k<aBtn.length; k++){
				aBtn[k].className='';
			}
			aBtn[n].className='ac';
			hsxd_tools.move(oUl,{"left":-li_w*n});
		}
		
		//-----------------------------------------------------------
		var li_w=hsxd_tools.getStyle(aLi[0],'width');//得到li的宽度
		oUl.style.width=li_w*aLi.length+'px';//设定ul宽度
		
		//---------------------------------------
		
		var aOl=document.createElement('ol');
		for(var i=0; i<aLi.length; i++){
			aOl.innerHTML+='<li>'+(numShow ? i+1:'')+'</li>';
			
		}
		oDiv.appendChild(aOl);
		var aBtn=oDiv.getElementsByTagName('ol')[0].children;  //你在这声明的  前面怎么用啊  声明的肯定要在上面啊  你之后的
		aBtn[0].className='ac'; 
		
		//--------------------------------------
		for(i=0;i<aBtn.length; i++){
			aBtn[i].index=i;
			aBtn[i].onclick=function(){
				n=this.index;
				changebtn();
			}
		}
		
		//-------------------------------------------
		pBtn.onclick=function(){
			n--;
			if(n<0){
				n=0;
			}
			changebtn();
			
		};
		
		nRtn.onclick=function(){
			n++;
			if(n>=aLi.length-1){
				n=aLi.length-1;
			}
			changebtn();
		}
	},
	//选项卡===================================================================
	tab:function (obj,fn){
		var aLi=obj.getElementsByTagName('li');
		//选项卡
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].oldName=aLi[i].className;
			if(i==0)getName(aLi[i],'active');
			aLi[i].onclick=function(){
				for(var i=0;i<aLi.length;i++){
					aLi[i].className=aLi[i].oldName;
				}
				getName(this,'active');
				var attr=this.index;
				fn && fn(attr);
			};
		}
		function getName(o,newClassName) {
			o.oldName=o.className;
			o.className=o.className+" "+newClassName;
			return o.className;
		}
	}

};

	