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
        if(bPop)inform.style.display="block";
        else return;
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

        if(left<o.offsetWidth-inform.offsetWidth-20){
            inform.style.left=left+"px";
        }
        else {
            inform.style.left=left-inform.offsetWidth-20-10+"px";
            iOldClassName++;
        }

        if(top<o.offsetHeight-inform.offsetHeight){
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
        aLoading=document.getElementsByClassName('text-center loading');

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
                        '<p class="text-center loading"><img src="images/ajax-loader.gif" height="100" width="100"/></p>';
                    // if(!bool){
                    //     aODate[i][b].style.a=startDate-1;
                    // }
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
        console.log(JSON.stringify(json));

        for(i=0;i<aLoading.length;i++){
            aLoading[i].style.display="none";
        }

        var time=json.forecast["24h"][city]["000"];
        var aforecast=new Array();
        for(today=0;today<3;today++){
            aforecast[today]=new Array();
            aforecast[today][0]=json.forecast["24h"][city]["1001001"][today]["001"];//白天天气编码
            aforecast[today][1]=json.forecast["24h"][city]["1001001"][today]["002"];//晚上天气编码
            aforecast[today][2]=json.forecast["24h"][city]["1001001"][today]["003"];//白天温度编码
            aforecast[today][3]=json.forecast["24h"][city]["1001001"][today]["004"];//晚上温度编码
            aforecast[today][4]=json.forecast["24h"][city]["1001001"][today]["005"];//白天风力编码
            aforecast[today][5]=json.forecast["24h"][city]["1001001"][today]["006"];//晚上风力编码
            aforecast[today][6]=json.forecast["24h"][city]["1001001"][today]["007"];//白天风向编码
            aforecast[today][7]=json.forecast["24h"][city]["1001001"][today]["008"];//晚上风向编码
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
        var number=parseInt(time.charAt(6)*10)+parseInt(time.charAt(7));
        for (i = 0; i < aORow.length; i++) {
            for (b = 0; b < 7; b++) {

                var weather;    //1
                var weatherE;
                var windDirection;  //7
                var windDirectionE;
                var windPower;  //5
                var windPowerE;

                var nWeather;   //2
                var nWeatherE;
                var nWindDirection; //8
                var nWindDirectionE;
                var nWindPower; //6
                var nWindPowerE;

                var tureTime;   //11
                var tureTimeE;   //11
                var tWeather;  //12
                var tWeatherE;  //12
                var tTemperature; //13
                var tTemperatureE; //13
                var tWindPower;//14
                var tWindPowerE;//14
                var tWindDirectionE; //15
                var tWindDirection; //15
                var tHumidity;//16
                var tHumidityE;//16
                var tPrecipitation;//17
                var tPrecipitationE;//17
                var tPressure;//18
                var tPressureE;//18

                var taget=parseInt(aODate[i][b].getElementsByClassName('h3-modefiy')[0].innerHTML);
                if(taget==number+today&&today<3){
                    function findValueByKey(o,today,index,chineseName,englishName) {
                        for(var c=0;c<o.length;c++){
                            console.log(parseInt(aforecast[today][index]));
                            if(o[c].ID==parseInt(aforecast[today][index])){
                                chineseName=o[c].中文名称;
                                englishName=o[c].英文名称;
                                weather=chineseName.trim();
                                weatherE=englishName.trim();
                                break;
                            }
                        }
                    }
                    findValueByKey(oWeaterJson,today,0,weather,weatherE);
                    findValueByKey(oWindDirectionJson,today,6,windDirection,windDirectionE);
                    findValueByKey(oWindPowerJson,today,4,windPower,windPowerE);
                    findValueByKey(oWeaterJson,today,0,weather,weatherE);
                    if(!aODate[i][b].oldInnerHTML)aODate[i][b].oldInnerHTML=aODate[i][b].innerHTML;
                    if(!aODate[i][b].oldClassName)aODate[i][b].oldClassName=aODate[i][b].className;
                    aODate[i][b].innerHTML=aODate[i][b].oldInnerHTML+'<h2 class="h2-modefiy">'+weather+'</h2><h3 class="h3-modefiy2"><span>'+aforecast[today][3]+'°</span> <small>/'+aforecast[today++][4]+'°</small></h3>';
                    aODate[i][b].className=aODate[i][b].oldClassName+" weather-a_"+findIcon(weather)+" date-"+today;
                    aODate[i][b].weatherE=weatherE;
                    aODate[i][b].weather=weather;
                    aODate[i][b].windDirection=windDirection;
                    aODate[i][b].windDirectionE=windDirectionE;
                    aODate[i][b].windPower=windPower;
                    aODate[i][b].windPowerE=windPowerE;
                    aODate[i][b].updateDate=time;

                    addEventHandler(aODate[i][b],'mouseover',function () {
                        inform.className="weather-b_"+findIcon(this.weather);
                        inform.innerHTML='<table class="table table-responsive table-bordered table-striped">'+
                            '<caption>白天</caption>'+
                            '<tr><td>属性</td><td>中文名称</td><td>英文名称</td></tr>'+
                            '<tr><td>天气</td><td>'+this.weather+'</td><td>'+this.weatherE+'</td></tr>'+
                            '<tr><td>风力</td><td>'+this.windPower+'</td><td>'+this.windPowerE+'</td></tr>'+
                            '<tr><td>风向</td><td>'+this.windDirection+'</td><td>'+this.windDirectionE+'</td></tr>'+
                            '<tr><td>更新时间</td><td>'+this.updateDate+'</td></tr></table>'+
                            '<table class="table table-responsive table-bordered table-striped">'+
                            '<caption>夜间</caption>'+
                            '<tr><td>属性</td><td>中文名称</td><td>英文名称</td></tr>'+
                            '<tr><td>天气</td><td>'+this.weather+'</td><td>'+this.weatherE+'</td></tr>'+
                            '<tr><td>风力</td><td>'+this.windPower+'</td><td>'+this.windPowerE+'</td></tr>'+
                            '<tr><td>风向</td><td>'+this.windDirection+'</td><td>'+this.windDirectionE+'</td></tr>'+
                            '<tr><td>更新时间</td><td>'+this.updateDate+'</td></tr></table>'+
                            '<span class="tb-border"></span><span class="tb-background"></span>';
                    });

                    addEventHandler(aODate[i][b],'mouseout',function () {
                        inform.className="weather-nothing";
                        inform.innerHTML="sorry 因为信息不够充足<br/>所以功能还在完善中<br/>暂无此处信息<br/>点击鼠标可以关闭<br/>"+
                            '<span class="tb-border"></span><span class="tb-background"></span>';
                    });
                }
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