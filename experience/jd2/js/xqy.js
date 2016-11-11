window.onload=function ()
{
    var oDiv=document.getElementById('spec-n1');
    var oShow=document.getElementById('fo');
    var oSpan=document.getElementById('jqZoomPup');
    var oImg=document.getElementById('bg');

	oShow.onmouseover=function(){
        oSpan.style.display='block';
        oImg.parentNode.style.display='block';
	};
    document.onmousemove=function(ev) {
        var oEvent=ev||event;
        var x=oEvent.clientX-350-oSpan.offsetWidth/2;
        var y=oEvent.clientY-250-oSpan.offsetHeight/2;

        if(x<0)
        {
            x=0;
        }
        else if(x>oShow.offsetWidth-oSpan.offsetWidth)
        {
            x=oShow.offsetWidth-oSpan.offsetWidth;
        }
        if(y<0)
        {
            y=0;
        }
        else if(y>oShow.offsetHeight-oSpan.offsetHeight)
        {
            y=oShow.offsetHeight-oSpan.offsetHeight
        }


        oSpan.style.left=x+'px';
        oSpan.style.top=y+'px';
        var percentX=x/(oShow.offsetWidth-oSpan.offsetWidth);
        var percentY=y/(oShow.offsetHeight-oSpan.offsetHeight);
        var oImgparent=oImg.parentNode;
        oImg.style.left=-percentX*(oImg.offsetWidth-oImgparent.offsetWidth)+'px';
        oImg.style.top=-percentY*(oImg.offsetHeight-oImgparent.offsetHeight)+'px';
    };
	oSpan.onmouseout=function(){
        oSpan.style.display='none';
        oImg.parentNode.style.display='none';
	};
};
