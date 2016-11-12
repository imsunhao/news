/**
 * Created by 孙颢pc on 2016/9/14.
 */
window.onload=function () {
    var _starBtn=true;
    var Square={
        createNew:function () {
            var square={};
            square.infms=false;//是否受到女王影响
            square._index=-1;//是否存在女王，如果存在女王，那么编号为index的值
            square.clear=function () {
                square.infms=false;
                square._index=-1;
            };
            return square;
        }
    };
    var _size=8;
    var _msgShow=false;
    var _success=0;
    var _fair=0;
    var _index=0;
    var _minsize=100;
    var _indexPosition=new Array(_size);

    var menu;
    var btn;
    var autoPlaySpeed=200;
    var _break=0;
    var btn_x=0;
    var btn_y=0;
    var lock=false;
    var _menuGoBackWaitTime=2;
    var menuGoBackWaitTime=_menuGoBackWaitTime;

    var Checkerboard={
        createNew:function () {
            var checkerboard={};
            checkerboard.aaSquare=new Array();//创建棋盘
            for(var i=0;i<_size;i++){
                checkerboard.aaSquare[i]=new Array();
                for(var b=0;b<_size;b++){
                    checkerboard.aaSquare[i][b]=Square.createNew();
                }
            }
            checkerboard.serchIsInfms=function (pointX,pointy) {
                return checkerboard.aaSquare[pointX][pointy].infms;
            };
            checkerboard.serchIsQueen=function (pointX,pointy) {
                if(checkerboard.aaSquare[pointX][pointy]._index!=-1)return true;
                else return false;
            };
            checkerboard.check=function () {
            };
            checkerboard.makeInfms=function (pointX,pointy) {
                for(var i=0;i<_size;i++){
                    for(var b=0;b<_size;b++){
                        if(i==pointX||b==pointy){
                            checkerboard.aaSquare[i][b].infms=true;
                        }
                        if(Math.abs(pointX-i)+pointy==b||pointy-Math.abs(pointX-i)==b){
                            checkerboard.aaSquare[i][b].infms=true;
                        }
                    }
                }
            };
            checkerboard.fondAllQueen=function(){
                for(var i=0;i<_size;i++){
                    for(var b=0;b<_size;b++){
                        checkerboard.aaSquare[i][b].infms=false;
                    }
                }

                for(i=0;i<_size;i++){
                    for(b=0;b<_size;b++){
                        if(checkerboard.aaSquare[i][b]._index!=-1){
                            checkerboard.makeInfms(i,b);
                            break;
                        }
                    }
                }
            };
            checkerboard.setQueen=function(pointX,pointY){
                _index++;
                if(checkerboard.aaSquare[pointY][pointX].infms){
                    return false;
                }
                if(_msgShow)console.log("在（"+pointX+","+pointY+"）成功放置queen！    当前 index:"+_index);
                checkerboard.aaSquare[pointY][pointX]._index=_index;
                _indexPosition[_index-1]=pointX+pointY*_size;
                checkerboard.fondAllQueen();
                return true;
            };
            checkerboard.checkNextLine=function(pointX){
                //alert(btn_x+" "+btn_y+" "+pointX);
                for(var i=0;i<_size;i++){
                    if(!checkerboard.aaSquare[pointX][i].infms){

                        return true;
                    }
                }
                return false;
            };
            checkerboard.show=function(){
                for(var i=0;i<_size;i++){
                    for(var b=0;b<_size;b++) {
                        console.log(checkerboard.aaSquare[i][b].infms + '                               ' + checkerboard.aaSquare[i][b]._index + '!');
                    }
                }
            };
            return checkerboard;
        }
    };

    var _timer;
    var _oConsoloText=document.getElementById("consolo");
    var cb=Checkerboard.createNew();
    var doc=document.getElementById("section");
    var _oAsideInformationP=document.getElementById("informationText");


    function main() {
        iniActive();//动态界面初始化
        autoPlay();//自动运行

        function iniActive() {
            var sHtml="";
            for(var i=0;i<_size;i++){
                sHtml+="<div class='Square_"+i+" clearfix'>";
                _indexPosition[i]=-1;
                for(var b=0;b<_size;b++)
                    sHtml+="<div class='Square Square_"+i+"_"+b+"'></div>";
                sHtml+="</div>";
            }
            doc.innerHTML+=sHtml;
            btn=doc.getElementsByClassName("Square");
            for(var i=0;i<btn.length;i++){
                btn[i].onclick=btnOnClick;
            }
        }

        function btnSerch() {
            for(var i=0;i<_size;i++){
                for(var b=0;b<_size;b++){
                    btn[((i*_size)+b)].style.backgroundColor="blue";
                    if(cb.serchIsInfms(i, b))
                        btn[i*_size+b].style.backgroundColor="yellow";
                    if(cb.serchIsQueen(i, b))
                        btn[i*_size+b].style.backgroundColor="red";
                }
            }
        }

        function btnOnClick() {
            if(btn_x!=_size)this.style.backgroundColor="black";
            if(btn_x>=_size&&lock&&_break==0){
                //if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime)console.log("回溯条件1满足 {当前行所有可能性都已经被满足，请求回溯}  {btn_x>_size&&lock}     btn_x：_size ="+btn_x+":"+_size +"  {"+(btn_x>_size&&lock)+"}");
                if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime)_oConsoloText.innerHTML+="<p><span id='goback_1'> 回溯条件1</span>满足 {当前行所有可能性都已经被满足，请求回溯}</p>";
                lock=false;
                _break=1;
            }//如果{按钮(b_2) 不在按钮中&&}     当前行 所有可能性 都已经被满足  准备进行回溯
            btn_x++;//按钮(b_1)被点击后 如果 位置在按钮中，按钮颜色变黑，准备要按下一个按钮（b_2）btn_x++.
            // if(btn_x>_size&&!lock&&_break==0){
            //     if(_msgShow||menuGoBackWaitTime==_menuGoBackWaitTime)console.log("回溯条件2满足{当前行所有可能性都已经被满足，请求回溯}   {btn_x>_size&&!lock}     btn_x：lock ="+btn_x+":"+lock +"  {"+(btn_x>=_size&&!lock)+"}");
            //     lock=true;
            //     _break=2;
            // }//如果{按钮(b_2) 不在按钮中&& &&！满足（当前行 所有可能性 都已经被满足,而且）}     当前行 所有可能性 都已经被满足  准备进行回溯

            if(_break!=0)return;//如果不是 执行 放置女王 事件，那么跳过本次点击
            var position=this.className.split(" ")[1].split("_");
            var y=parseInt(position[1]);
            var x=parseInt(position[2]);//进行对按钮的数据绑定信息的读取（获取 到底是第几个按钮被点击）
            //alert(x+"   "+y);
            if(!(cb.setQueen(x,y))){
                _index--;
                _break=0;
            }//如果不成功防止女王 女王个数不增加 下次点击 回复点击事件
            else{
                btnSerch();
                //cb.show();
                lock=true;//当前行如果放置一个女王，就准备进行可能存在的回溯事件1
                if(_index>=_size){
                    //if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime)console.log("回溯条件4满足   {成功后回溯}");
                    if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime){
                        _oConsoloText.innerHTML+="<p><span id='goback_4'> 回溯条件4</span>满足 {成功后回溯}</p>";
                        _oConsoloText.innerHTML+="<p>现在成功次数为："+(++_success)+"   现在失败次数为："+(_fair)+"</p>";
                        _oAsideInformationP.innerHTML="<p>现在成功次数为：<span>"+_success+"</span>   现在失败次数为：<span>"+_fair+"</span></p>"
                        //alert(1);
                    }
                    //if(_msgShow)console.log("现在成功次数为："+(++_success)+"   现在失败次数为："+(_fair));
                    // lock=true;
                    _break=4;
                }
                if(btn_x>_size){
                    if(cb.checkNextLine(y)){
                        //alert("btnOnClick()"+y+" "+btn_x+" "+btn_y);
                        //if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime)console.log("回溯条件5满足{当前此位置下的所有情况都是失败}   {失败后回溯}");
                        //if(_msgShow)console.log("现在成功次数为："+(_success)+"   现在失败次数为："+(++_fair));
                        if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime){
                            _oConsoloText.innerHTML+="<p><span id='goback_4'> 回溯条件4</span>满足 {成功后回溯}</p>";
                            _oConsoloText.innerHTML+="<p>现在成功次数为："+(_success)+"   现在失败次数为："+(++_fair)+"</p>";
                            _oAsideInformationP.innerHTML="<p>现在成功次数为：<span>"+_success+"</span>   现在失败次数为：<span>"+_fair+"</span></p>"
                        }
                        // lock=true;
                        _break=5;
                    }else{
                        btn_x=0;
                        btn_y+=_size;
                    }
                }
                else if(!cb.checkNextLine(y+1)){//最后一行一定会成功，所以这里不考虑
                    // if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime)console.log("回溯条件5满足{当前此位置下的所有情况都是失败}   {失败后回溯}");
                    // if(_msgShow)console.log("现在成功次数为："+(_success)+"   现在失败次数为："+(++_fair));
                    // lock=true;
                    if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime){
                        _oConsoloText.innerHTML+="<p><span id='goback_4'> 回溯条件4</span>满足 {成功后回溯}</p>";
                        _oConsoloText.innerHTML+="<p>现在成功次数为："+(_success)+"   现在失败次数为："+(++_fair)+"</p>";
                        _oAsideInformationP.innerHTML="<p>现在成功次数为：<span>"+_success+"</span>   现在失败次数为：<span>"+_fair+"</span></p>"
                        //alert(1);
                    }
                    _break=5;
                }
                else{
                    btn_x=0;
                    btn_y+=_size;
                }
            }//如果成功放置女王 重新计算影响 ，判断女王是不是已经放完（是：下次点击触发 回溯4）否则判断下一行已经没有空闲（是：下次点击触发 回溯5）否则 下次按钮点击直接跳过本行，从下一行的第一个开始点击。
        }

        function autoPlay() {
            _timer=setInterval( autoClickBtn,autoPlaySpeed);
            function autoClickBtn() {
                if(btn_x!=_size||btn_y!=_size*(_size-1))btn[btn_x+btn_y].click();//如果不是最后一个的后一个准备点击 按钮的话  触发点击按钮事件
                else {
                    _break=1;
                    btn_x--;
                    //if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime)console.log("回溯条件1满足{最后一个方块被点击后，最后一个方块在次点击}   {btn_x!=_size||btn_y!=_size*(_size-1)}     btn_x：btn_y ="+btn_x+":"+btn_y +"{" +(btn_x!=_size)+"||"+(btn_y!=_size*(_size-1))+"}"  );

                    if(_msgShow&&menuGoBackWaitTime==_menuGoBackWaitTime)_oConsoloText.innerHTML+="<p><span id='goback_5'>回溯条件5</span>满足{最后一个方块被点击后，最后一个方块在次点击}</p>";
                }//否则准备触发回溯条件1事件，并把下次点击指向最后一个格子
                // if(btn_x==_size&&_break==0){
                //     btn_x=0;
                //     btn_y+=_size;
                // }
                switch (_break){
                    case 0://回溯停止,按钮回复点击事件
                        _break=0;
                        break;
                    case 1:
                        if(menuGoBackWaitTime--==0){
                            activeGoBack();
                            btn_x=_indexPosition[--_index]%_size;
                            btn_y=_indexPosition[_index]-btn_x;
                            _indexPosition[_index]=-1;
                            cb.fondAllQueen();
                            btnSerch();
                            lock=true;//回溯后肯定准备下一个回溯，所以lock为true
                            btn_x++;
                            // lock=true;
                        }//回溯等待结束后 触发回溯事件1
                        else{
                            btn_x--;
                            //if(_msgShow)console.log("回溯中..." + menuGoBackWaitTime );
                            if(_msgShow)_oConsoloText.innerHTML+=("回溯中..." + menuGoBackWaitTime );
                        }//回溯等待处理
                        break;
                    case 2:
                        if(menuGoBackWaitTime--==0){
                            activeGoBack();
                            btn_x=_indexPosition[--_index]%_size;
                            btn_y=_indexPosition[_index]-btn_x;
                            _indexPosition[_index]=-1;
                            cb.fondAllQueen();
                            btnSerch();
                            lock=true;//回溯后肯定准备下一个回溯，所以lock为true
                            btn_x++;
                        }//回溯等待结束后 触发回溯事件2
                        else{
                            btn_x--;
                            //if(_msgShow)console.log("回溯中..." + menuGoBackWaitTime );
                            if(_msgShow)_oConsoloText.innerHTML+=("回溯中..." + menuGoBackWaitTime );
                        }//回溯等待处理
                        break;
                    case 3:
                        if(menuGoBackWaitTime--==0){
                            activeGoBack();
                            btn_x=_indexPosition[--_index]%_size;
                            btn_y=_indexPosition[_index]-btn_x;
                            _indexPosition[_index]=-1;
                            cb.fondAllQueen();
                            btnSerch();
                            lock=true;//回溯后肯定准备下一个回溯，所以lock为true
                            btn_x++;
                        }//回溯等待结束后 触发回溯事件3
                        else{
                            btn_x--;
                            //if(_msgShow)console.log("回溯中..." + menuGoBackWaitTime );
                            if(_msgShow)_oConsoloText.innerHTML+=("回溯中..." + menuGoBackWaitTime );
                        }//回溯等待处理
                    case 4:
                        if(menuGoBackWaitTime--==0){
                            activeGoBack();
                            btn_x=_indexPosition[--_index]%_size;
                            btn_y=_indexPosition[_index]-btn_x;
                            _indexPosition[_index]=-1;
                            cb.fondAllQueen();
                            btnSerch();
                            lock=true;//回溯后肯定准备下一个回溯，所以lock为true
                            btn_x++;
                        }//回溯等待结束后 触发回溯事件4
                        else{
                            btn_x--;
                            //if(_msgShow)console.log("回溯中..." + menuGoBackWaitTime );
                            if(_msgShow)_oConsoloText.innerHTML+=("回溯中..." + menuGoBackWaitTime );
                        }//回溯等待处理
                        break;
                    case 5:
                        if(menuGoBackWaitTime--==0){
                            activeGoBack();
                            btn_x=_indexPosition[--_index]%_size;
                            btn_y=_indexPosition[_index]-btn_x;
                            _indexPosition[_index]=-1;
                            cb.fondAllQueen();
                            btnSerch();
                            lock=true;//回溯后肯定准备下一个回溯，所以lock为true
                            btn_x++;
                        }//回溯等待结束后 触发回溯事件5
                        else{
                            btn_x--;
                            //if(_msgShow)console.log("回溯中..." + menuGoBackWaitTime );
                            if(_msgShow)_oConsoloText.innerHTML+=("回溯中..." + menuGoBackWaitTime );
                        }//回溯等待处理
                        break;
                }//处理回溯事件
            }
            function activeGoBack() {
                menuGoBackWaitTime=_menuGoBackWaitTime;
                _break=0;
                if(menuGoBackOnclick()){}
                else{
                    clearInterval(_timer);
                    //console.log("自动播放结束");
                    _oConsoloText.innerHTML+="自动播放结束";
                }
            }//回溯
        }
    }

    function iniStact() {
        var _oAsideInformationScroll=document.getElementById("scroll");
        var _oAside=document.getElementById("aside");
        menu=document.getElementsByClassName("menu");
        menu[0].onclick=menuClearOnclick;
        menu[1].onclick=menuGoBackOnclick;
        var sHTMLSection="";
        for(var i=1;i<=4;i++){
            sHTMLSection+="<i class='fourFoot fourFoot_"+i+"'></i><i class='fourSide fourSide_"+i+"'></i>";
        }
        doc.innerHTML+=sHTMLSection;

        main();
        move();

        //拖拽滚动条
        // _oAsideInformationScroll.onmousedown=function(e) {
        //     if(_oConsoloText.offsetHeight<=_oAside.offsetHeight)return;
        //     //记录偏移
        //     e = e || event;
        //     var disY = e.clientY - _oAsideInformationScroll.offsetTop;//只取纵向
        //
        //     //移动
        //     document.onmousemove = function (e) {
        //         e = e || event;
        //         var t = e.clientY - disY;
        //         //限制移动范围-------------------------
        //         if (t < 0) {
        //             t = 0;
        //         }
        //         if (t > _oAside.offsetHeight - _oAsideInformationScroll.offsetHeight - 2) {
        //             t = _oAside.offsetHeight - _oAsideInformationScroll.offsetHeight - 2;
        //         }
        //         _oAsideInformationScroll.style.top = t + 'px';
        //
        //         //计算移动比例------------------------
        //         var rate = t / (_oAsideInformationP.offsetHeight - _oAsideInformationScroll.offsetHeight - 2);
        //
        //         //console.log(rate);
        //         oP.style.top = -(_oAsideInformationP.offsetHeight - _oAside.offsetHeight) * rate + 'px';
        //
        //
        //     };
            //停止拖拽
            // document.onmouseup = function () {
            //     document.onmousemove = null;
            // };
            // return false;
        function move() {
            var oDiv=doc;

            var afourFoot=doc.getElementsByClassName("fourFoot");
            var afourSide=doc.getElementsByClassName("fourSide");
            var oBefore=document.getElementById("before");

            for(var i=0;i<afourFoot.length;i++){
                dragFn(afourFoot[i]);
                dragFn(afourSide[i]);
            }
            oBefore.onmousedown=function (ev) {
                var oEv=ev||event;
                var oldX=oEv.clientX;
                var oldY=oEv.clientY;
                var oldLeft=oDiv.offsetLeft;
                var oldTop=oDiv.offsetTop;
                document.onmousemove=function(ev){
                    var oEv=ev||event;
                    oDiv.style.top = oldTop+(oEv.clientY-oldY)+ 'px';
                    oDiv.style.left = oldLeft+(oEv.clientX-oldX) + 'px';
                    return;
                };
                document.onmouseup=function(){
                    document.onmousemove=null;
                    return;
                };
            };

            function dragFn(obj){
                var iSwitch=0;
                var boolean=true;

                if(obj.className.split(' ')[0]=='fourFoot')boolean=true;
                else boolean=false;

                iSwitch=parseInt(obj.className.split(' ')[1].split('_')[1]);

                obj.onmousedown=function(ev){
                    var oEv=ev||event;
                    var oldX=oEv.clientX;
                    var oldY=oEv.clientY;
                    var oldWidth=oDiv.offsetWidth;
                    var oldHeight=oDiv.offsetHeight;
                    var oldLeft=oDiv.offsetLeft;
                    var oldTop=oDiv.offsetTop;

                    document.onmousemove=function(ev){
                        var oEv=ev||event;
                        if(boolean) {
                            switch (iSwitch) {
                                case 1:
                                    oDiv.style.width = oldWidth - (oEv.clientX - oldX) + 'px';
                                    oDiv.style.left = oldLeft + (oEv.clientX - oldX) + 'px';
                                    oDiv.style.height = oldHeight - (oEv.clientY - oldY) + 'px';
                                    oDiv.style.top = oldTop + (oEv.clientY - oldY) + 'px';
                                    break;
                                case 2:
                                    oDiv.style.width = oldWidth - (oldX - oEv.clientX) + 'px';
                                    //oDiv.style.left = oldLeft - (oldX - oEv.clientX) + 'px';
                                    oDiv.style.height = oldHeight - (oEv.clientY - oldY) + 'px';
                                    oDiv.style.top = oldTop + (oEv.clientY - oldY) + 'px';
                                    break;
                                case 3:
                                    oDiv.style.width = oldWidth + (oEv.clientX - oldX) + 'px';
                                    oDiv.style.height = oldHeight + (oEv.clientY - oldY) + 'px';
                                    break;
                                case 4:
                                    oDiv.style.width = oldWidth - (oEv.clientX - oldX) + 'px';
                                    oDiv.style.left = oldLeft + (oEv.clientX - oldX) + 'px';
                                    oDiv.style.height = oldHeight + (oEv.clientY - oldY) + 'px';
                                    break;
                            }
                        }
                        else{
                            switch (iSwitch){
                                case 1:
                                    oDiv.style.top = oldTop+(oEv.clientY-oldY) + 'px';
                                    oDiv.style.height = oldHeight - (oEv.clientY - oldY) + 'px';
                                    break;
                                case 2:
                                    oDiv.style.width = oldWidth + (oEv.clientX - oldX) + 'px';
                                    break;
                                case 3:
                                    oDiv.style.height = oldHeight + (oEv.clientY - oldY) + 'px';
                                    break;
                                case 4:
                                    oDiv.style.left = oldLeft + (oEv.clientX - oldX) + 'px';
                                    oDiv.style.width = oldWidth + (oldX - oEv.clientX) + 'px';
                                    break;
                            }
                        }
                    };

                    document.onmouseup=function(){
                        document.onmousemove=null;
                    };
                    return false;
                };
            }
        }

    }

    function menuClearOnclick() {
        alert(1);
        return;
        for(var i=0;i<_size;i++){
            for(var b=0;b<_size;b++){
                btn[((i*_size)+b)].style.backgroundColor="blue";
                cb.aaSquare[i][b].clear();
            }
        }
        _index=0;
        _success=0;
        _fair=0;
        btn_x=0;
        btn_y=0;
        _menuGoBackWaitTime=5;
        _break=0;//信号机制
        btnSerch();
        console.log("clear成功！");
    }

    function menuGoBackOnclick() {
        //alert(1);
        if(_index==0){
            if(_msgShow)console.log("现在没有皇后在棋盘上！");
            //btn_x=_size;
            return false;
        }
        var index_X=_indexPosition[_index-1]%_size;
        var index_Y=parseInt(_indexPosition[_index-1]/_size);
        cb.aaSquare[index_Y][index_X].clear();
        if(_msgShow)console.log("已经在" + index_X + "," +index_Y+"找到最后index值最大的皇后!");
        // _indexPosition[_index--]=-1;
        // cb.fondAllQueen();
        // btnSerch();
        // lock=true;//回溯后肯定准备下一个回溯，所以lock为true
        return true;
    }//读取最后一个皇后，删除，重新计算影响。

    iniStact();//静态界面初始化
};