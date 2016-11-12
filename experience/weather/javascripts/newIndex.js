/**
 * Created by 孙颢pc on 2016/10/9.
 */
//@import data.js
//@import util.js

function main() {
    initSelectPar();
    iniCalendar();
    iniPop();
}

function iniPop() {
    var content=document.getElementById("content");
    var aSpan=inform.getElementsByTagName("span");
    var left;
    var top;
    var sOldClassName=aSpan[0].className;
    var iOldClassName=0;

    addEventHandler(content,"mouseover",function(ev) {
        if(!bPop)return;
        ev=ev||event;
        iOldClassName=0;
        mouseMove(ev,this);
    });
    addEventHandler(content,"mousemove",function(ev) {
        if(!bPop)return;
        ev=ev||event;
        iOldClassName=0;
        mouseMove(ev,this);
    });
    addEventHandler(content,"mouseout",function(){inform.style.display="none";});
    addEventHandler(content,'click',function () {
        if(bPop)inform.style.display="none";
        else inform.style.display="block";
        bPop=!bPop;
    });

    function mouseMove(ev,o) {
        left=ev.clientX-o.offsetLeft+20;
        top=ev.clientY-o.offsetTop-20;
        var i;

        if(left<o.offsetWidth-550){
            inform.style.left=left+"px";
        }
        else {
            inform.style.left=left-inform.offsetWidth-20-30+"px";
            iOldClassName++;
        }

        if(top<o.offsetHeight-inform.offsetHeight-50){
            inform.style.top=top+"px";
        }
        else {
            inform.style.top=top-inform.offsetHeight+"px";
            iOldClassName+=2;
        }
        switch (iOldClassName){
            case 0:
                for(i=0;i<aSpan.length;i++)aSpan[i].className=sOldClassName;
                break;
            case 1:
                for(i=0;i<aSpan.length;i++)aSpan[i].className=sOldClassName+'-r';
                break;
            case 2:
                for(i=0;i<aSpan.length;i++)aSpan[i].className=sOldClassName+'-b';
                break;
            case 3:
                for(i=0;i<aSpan.length;i++)aSpan[i].className=sOldClassName+'-rb';
                break;
        }
    }

}

function initSelectPar(){
    var aList = findCity();
    var string = '';
    for (var i = 0; i < aList.length; i++) {
        string += '<option>' + aList[i] + '</option>';
    }
    oSelectPar.innerHTML = string;
    addEventHandler(oSelectPar,"change",function(ev){
        ev=ev||event;
        ev.stopPropagation();
        fSelectPar();
        fSelectCity();
        fSelect();
    });
    addEventHandler(oSelectCity,"change",function(ev){
        ev=ev||event;
        ev.stopPropagation();
        fSelectCity();
        fSelect();
    });
    addEventHandler(oSelect,"change",function(ev){
        ev=ev||event;
        ev.stopPropagation();
        fSelect();
    });
    fSelect();
    
    function fSelectPar() {
        var aList = findCity(oSelectPar.options[oSelectPar.selectedIndex].value);
        var string = '';
        for (var i = 0; i < aList.length; i++) {
            string += '<option>' + aList[i] + '</option>';
        }
        oSelectCity.innerHTML = string;
    }

    function fSelectCity() {
        var aList = findCity(oSelectPar.options[oSelectPar.selectedIndex].value, oSelectCity.options[oSelectCity.selectedIndex].value);
        var string = '';
        for (var i = 0; i < aList.length; i++) {
            string += '<option value="' + aList[i].split("-")[0] + '">' + aList[i].split("-")[1] + '</option>';
        }
        oSelect.innerHTML = string;
    }

    function fSelect() {
        changeCity(oSelect.options[oSelect.selectedIndex].value);
    }
}

function iniCalendar() {
    var _nviewMouth=0;
    var _nviewYear=0;

    ViewMouth();

    addEventHandler(oLeft,"click",function (ev) {
        ev=ev||event;
        ev.stopPropagation();
        var data=new Date();
        if(--_nviewMouth<0){
            _nviewMouth=11;
            _nviewYear--;
        }
        if(_nviewMouth==data.getMonth()&&_nviewYear==data.getFullYear())ViewMouth();
        else ViewMouth(true,_nviewYear,_nviewMouth);
    });
    addEventHandler(oRight,"click",function (ev) {
        ev=ev||event;
        ev.stopPropagation();
        var data=new Date();
        if(++_nviewMouth>11){
            _nviewMouth=0;
            _nviewYear++;
        }
        if(_nviewMouth==data.getMonth()&&_nviewYear==data.getFullYear())ViewMouth();
        else ViewMouth(true,_nviewYear,_nviewMouth);
    });

    function ViewMouth(now,y,m) {
        aORow[aORow.length-1].style.display="block";

        var algorithms=Algorithms.createNew(now,y,m);
        _nviewMouth=algorithms.SM;
        _nviewYear=algorithms.SY;
        oMouth.innerHTML=_nviewMouth+1+'月';
        oYear.innerHTML=_nviewYear+'年';

        var lastMouthDay=0;
        if(_nviewMouth==1) lastMouthDay=algorithms.getMonthDay(11,_nviewYear-1);
        else lastMouthDay=algorithms.getMonthDay(_nviewMouth-1);

        var startDate;
        if(algorithms.StartWeek!=0)startDate=lastMouthDay-algorithms.StartWeek;
        else startDate=false;
        addDate(startDate);
        aLoading = document.getElementsByClassName('text-center loading');

        function addDate(bool) {
            if(!bool)startDate=1;
            for (i = 0; i < aORow.length; i++) {
                for (b = 0; b < 7; b++) {
                    if (startDate > lastMouthDay && bool) {
                        startDate = 1;
                        bool = false;
                    }
                    if (startDate > algorithms.MD && !bool) {
                        startDate = 1;
                        bool = true;
                        if (i == aORow.length - 1 && b == 0) {
                            aORow[aORow.length - 1].style.display = "none";
                            break;
                        }
                    }
                    aODate[i][b].innerHTML = '<h3 class="h3-modefiy">' + startDate + ' <small>' + algorithms.cDay(startDate++) + '</small></h3>' +
                        '<p class="text-center loading"><img src="/homeWork/images/ajax-loader.gif" height="100" width="100"/></p>';
                    if (aODate[i][b].oldClassName) {
                        aODate[i][b].className = aODate[i][b].oldClassName;
                        continue;
                    }
                    if (bool)aODate[i][b].className += " date-disable";
                    aODate[i][b].oldClassName = aODate[i][b].className;
                }
            }
        }
    }
}

function findIcon(key) {
    return oWeaterIconMap[key] || oWeaterIconMap["无"];
}

function changeCity(city) {
    if(aLoading){
        for(i=0;i<aLoading.length;i++){
            aLoading[i].style.display="block";
        }
    }
    $.getJSON('http://apis.baidu.com/tianyiweather/basicforecast/weatherapi?area=' + city, function (json) {

        for(i=0;i<aLoading.length;i++){
            aLoading[i].style.display="none";
        }

        var time=json.forecast["24h"][city]["000"];
        var aforecast=new Array();
        for(today=0;today<3;today++){
            aforecast[today]=new Array();
            aforecast[today][0]=json.forecast["24h"][city]["1001001"][today]["001"];//白天天气编码0
            aforecast[today][1]=json.forecast["24h"][city]["1001001"][today]["002"];//晚上天气编码1
            aforecast[today][2]=json.forecast["24h"][city]["1001001"][today]["003"];//白天温度编码2
            aforecast[today][3]=json.forecast["24h"][city]["1001001"][today]["004"];//晚上温度编码3
            aforecast[today][4]=json.forecast["24h"][city]["1001001"][today]["005"];//白天风力编码4
            aforecast[today][5]=json.forecast["24h"][city]["1001001"][today]["006"];//晚上风力编码5
            aforecast[today][6]=json.forecast["24h"][city]["1001001"][today]["007"];//白天风向编码6
            aforecast[today][7]=json.forecast["24h"][city]["1001001"][today]["008"];//晚上风向编码7
            aforecast[today][8]=json.index["24h"][city]["1001004"][today]["002"]["002003"];//穿衣指数
            aforecast[today][9]=json.index["24h"][city]["1001004"][today]["004"]["004003"];//感冒指数
            aforecast[today][10]=json.index["24h"][city]["1001004"][today]["005"]["005003"];//交通指数
            aforecast[today][11]=json.observe[city]["1001002"]["000"];//实况发布时间
            aforecast[today][12]=json.observe[city]["1001002"]["001"];//实况天气现象
            aforecast[today][13]=json.observe[city]["1001002"]["002"];//实况温度（摄氏度）
            aforecast[today][14]=json.observe[city]["1001002"]["003"];//实况风力
            aforecast[today][15]=json.observe[city]["1001002"]["004"];//实况风向
            aforecast[today][16]=json.observe[city]["1001002"]["005"];//实况湿度（%）
            aforecast[today][17]=json.observe[city]["1001002"]["006"];//实况降水量
            aforecast[today][18]=json.observe[city]["1001002"]["007"];//实况气压（百帕）
        }

        today=0;
        //document.getElementById('text').innerHTML=JSON.stringify(json);           调用此函数 查看获取的JSON对象




        var number=parseInt(time.charAt(6)*10)+parseInt(time.charAt(7));
        for (i = 0; i < aORow.length; i++) {
            for (b = 0; b < 7; b++) {
                var taget=parseInt(aODate[i][b].getElementsByClassName('h3-modefiy')[0].innerHTML);
                if(taget==number+today&&today<3){
                    var weather='中文名称';    //1
                    var weatherE='英文名称';
                    var windDirection='中文名称';  //7
                    var windDirectionE='英文名称';
                    var windPower='中文名称';  //5
                    var windPowerE='英文名称';

                    var nWeather='中文名称';   //2
                    var nWeatherE='英文名称';
                    var nWindDirection='中文名称'; //8
                    var nWindDirectionE='英文名称';
                    var nWindPower='中文名称'; //6
                    var nWindPowerE='英文名称';
                    /*
                     //白天天气编码0
                     //晚上天气编码1
                     //白天温度编码2
                     //晚上温度编码3
                     //白天风力编码4
                     //晚上风力编码5
                     //白天风向编码6
                     //晚上风向编码7
                     */
                    var aArray=findValueByKey(oWeaterJson,today,0,weather,weatherE);
                    weather=aArray[0];
                    weatherE=aArray[1];
                    aArray=findValueByKey(oWindPowerJson,today,4,windPower,windPowerE);
                    windPower=aArray[0];
                    windPowerE=aArray[1];
                    aArray=findValueByKey(oWindDirectionJson,today,6,windDirection,windDirectionE);
                    windDirection=aArray[0];
                    windDirectionE=aArray[1];

                    aArray=findValueByKey(oWeaterJson,today,1,nWeather,nWeatherE);
                    nWeather=aArray[0];
                    nWeatherE=aArray[1];
                    aArray=findValueByKey(oWindPowerJson,today,5,nWindPower,nWindPowerE);
                    nWindPower=aArray[0];
                    nWindPowerE=aArray[1];
                    aArray=findValueByKey(oWindDirectionJson,today,7,nWindDirection,nWindDirectionE);
                    nWindDirection=aArray[0];
                    nWindDirectionE=aArray[1];
                    function findValueByKey(o,today,index,chineseName,englishName){
                        for(var c=0;c<o.length;c++){
                            if(o[c].ID == parseInt(aforecast[today][index])){
                                chineseName=o[c][chineseName];
                                englishName=o[c][englishName];
                                chineseName=chineseName.trim();
                                englishName=englishName.trim();
                                break;
                            }
                        }
                        return [chineseName,englishName];
                    }

                    if(!aODate[i][b].oldInnerHTML)aODate[i][b].oldInnerHTML=aODate[i][b].innerHTML;
                    if(!aODate[i][b].oldClassName)aODate[i][b].oldClassName=aODate[i][b].className;

                    aODate[i][b].innerHTML=aODate[i][b].oldInnerHTML+'<h2 class="h2-modefiy">'+weather+'</h2><h3 class="h3-modefiy2"><span>'+aforecast[today][3]+'°</span> <small>/'+aforecast[today++][4]+'°</small></h3>';
                    aODate[i][b].className=aODate[i][b].oldClassName+" weather-a_"+findIcon(weather)+" date-"+today;
                    aODate[i][b].weather=weather;
                    aODate[i][b].weatherE=weatherE;
                    aODate[i][b].windDirection=windDirection;
                    aODate[i][b].windDirectionE=windDirectionE;
                    aODate[i][b].windPower=windPower;
                    aODate[i][b].windPowerE=windPowerE;
                    aODate[i][b].updateDate=time;
                    aODate[i][b].nWeather=nWeather;
                    aODate[i][b].nWeatherE=nWeatherE;
                    aODate[i][b].nWindDirection=nWindDirection;
                    aODate[i][b].nWindDirectionE=nWindDirectionE;
                    aODate[i][b].nWindPower=nWindPower;
                    aODate[i][b].nWindPowerE=nWindPowerE;
                    aODate[i][b].wear=aforecast[today-1][8];
                    aODate[i][b].ganmao=aforecast[today-1][9];
                    aODate[i][b].car=aforecast[today-1][10];

                    addEventHandler(aODate[i][b],'mouseover',function () {
                        if (bPop)inform.style.display = "block";
                        if (this.today == 0) {
                            var today=this.today;
                            inform.className = ".table-responsive weather-b_" + findIcon(this.weather);
                            inform.innerHTML = '<table class="table table-bordered">' +
                                '<caption>实时天气信息</caption>'+
                                '<tr class="active"><td>发布时间</td><td>'+aforecast[today][11]+'</td></tr>' +
                                '<tr class="info"><td>天气</td><td>' + aforecast[today][12] + '</td></tr>' +
                                '<tr class="success"><td>温度</td><td>' + aforecast[today][13] + '°</td></tr>' +
                                '<tr class="warning"><td>风力</td><td>' + aforecast[today][14] + '</td></tr>' +
                                '<tr class="warning"><td>风向</td><td>' + aforecast[today][15] + '</td></tr>' +
                                '<tr class="warning"><td>湿度</td><td>' + aforecast[today][16] + '%</td></tr>' +
                                '<tr class="warning"><td>降水量</td><td>' + aforecast[today][17] + '</td></tr>' +
                                '<tr  class="danger"><td>气压</td><td>' + aforecast[today][18] + '百帕</td></tr></table>' +
                                '<table class="table table-bordered">' +
                                '<caption>小提示</caption>' +
                                '<tr class="info"><td>穿衣指数</td><td>' + this.wear + '</td></tr>' +
                                '<tr class="success"><td>感冒指数</td><td>' + this.ganmao + '</td></tr>' +
                                '<tr class="warning"><td>交通指数</td><td>' + this.car + '</td></tr>'+
                                '<span class="tb-border"></span><span class="tb-background"></span>';
                        } else {
                            inform.className = ".table-responsive weather-b_" + findIcon(this.weather);
                            inform.innerHTML = '<table class="table table-bordered">' +
                                '<caption>白天</caption>' +
                                '<tr class="active"><td>内容名称</td><td>内容1</td><td>内容2</td></tr>' +
                                '<tr class="info"><td>天气</td><td>' + this.weather + '</td><td>' + this.weatherE + '</td></tr>' +
                                '<tr class="success"><td>风力</td><td>' + this.windPower + '</td><td>' + this.windPowerE + '</td></tr>' +
                                '<tr class="warning"><td>风向</td><td>' + this.windDirection + '</td><td>' + this.windDirectionE + '</td></tr>' +
                                '<tr  class="danger"><td>更新时间</td><td>' + this.updateDate + '</td></tr></table>' +
                                '<table class="table table-responsive table-bordered">' +
                                '<caption>夜间</caption>' +
                                '<tr class="active"><td>内容名称</td><td>内容1</td><td>内容2</td></tr>' +
                                '<tr class="info"><td>天气</td><td>' + this.nWeather + '</td><td>' + this.nWeatherE + '</td></tr>' +
                                '<tr class="success"><td>风力</td><td>' + this.nWindPower + '</td><td>' + this.nWindPowerE + '</td></tr>' +
                                '<tr class="warning"><td>风向</td><td>' + this.nWindDirection + '</td><td>' + this.nWindDirectionE + '</td></tr>' +
                                '<tr  class="danger"><td>更新时间</td><td>' + this.updateDate + '</td></tr></table>' +
                                '<table class="table table-bordered" id="tip">' +
                                '<caption>小提示</caption>' +
                                '<tr class="info"><td>穿衣指数</td><td>' + this.wear + '</td></tr>' +
                                '<tr class="success"><td>感冒指数</td><td>' + this.ganmao + '</td></tr>' +
                                '<tr class="warning"><td>交通指数</td><td>' + this.car + '</td></tr>'+
                                '<span class="tb-border"></span><span class="tb-background"></span>';
                        }
                    });
                    addEventHandler(aODate[i][b],'mouseout',function () {
                        if(bPop)inform.style.display="none";
                        inform.className="weather-nothing";
                        inform.innerHTML="sorry 因为信息不够充足<br/>所以功能还在完善中<br/>暂无此处信息<br/>点击鼠标可以关闭PoP</br>右键PoP固定（暂时未实现）<br/><br/>优点：1.使用bootstrap完成响应时网路布局<br/>优点：2.使用sass与compass框架搭建css布局<br/>优点：3.精灵图导入天气<br/>优点：4.可查全国各个地区的天气情况<br/>"+
                            '<br/>问题：不知道为什么我偶尔会收不到服务器提供的信息，详情可查JSON对象<br/>关于乱码的问题，尝试使用GB23UTF8转码失败，我怀疑是服务器信息传递有问题，我接受不全。<br/>使用的是百度api Store的《国内天气预报融合版》'+'<span class="tb-border"></span><span class="tb-background"></span>';
                    });
                    continue;
                }
                addEventHandler(aODate[i][b],'mouseover',function () {
                    if(bPop)inform.style.display="block";
                });
                addEventHandler(aODate[i][b],'mouseout',function () {
                    if(bPop)inform.style.display="none";
                });
            }
        }

    },"d18a1262d33c3fe1db5787a92317e91e");
}

function findCity(NodeGrandfater, NodeFater, Node) {
    var aArray = new Array();
    var oNodeGrandfater;
    var oNodeFater;
    var oNode;
    var oID;
    var i;
    if (!NodeGrandfater) {
        for (i = 0; i < ojson.length; i++) {
            oNodeGrandfater = ojson[i].nodeGrandfather;
            if (aArray.indexOf(oNodeGrandfater) == -1)aArray[aArray.length] = oNodeGrandfater;
        }
        return aArray;
    }
    if (!NodeFater) {
        for (i = 0; i < ojson.length; i++) {
            oNodeGrandfater = ojson[i].nodeGrandfather;
            oNodeFater = ojson[i].nodeFather;
            if (oNodeGrandfater.trim() == NodeGrandfater.trim()) {
                if (aArray.indexOf(oNodeFater) == -1)aArray[aArray.length] = oNodeFater;
            }
        }
        return aArray;
    }
    if (!Node) {
        for (i = 0; i < ojson.length; i++) {
            oNodeGrandfater = ojson[i].nodeGrandfather;
            oNodeFater = ojson[i].nodeFather;
            oNode = ojson[i].node;
            oID = ojson[i].ID;
            if (oNodeGrandfater.trim() == NodeGrandfater.trim() && NodeFater.trim() == oNodeFater.trim())aArray[aArray.length] = oID + '-' + oNode;
        }
        return aArray;
    }
}

main();