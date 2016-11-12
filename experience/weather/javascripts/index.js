/**
 * Created by 孙颢pc on 2016/10/8.
 */
var weaterMap = {
    "晴": "0",
    "多云": "1",
    "阴": "2",
    "阵雨": "3",
    "雷阵雨": "4",
    "雷阵雨并伴有冰雹": "5",
    "雨加雪": "6",
    "小雨": "7",
    "中雨": "8",
    "大雨": "9",
    "暴雨": "10",
    "大暴雨": "11",
    "特大暴雨": "12",
    "阵雪": "13",
    "小雪": "14",
    "中雪": "15",
    "大雪": "16",
    "暴雪": "17",
    "雾": "18",
    "冻雨": "19",
    "沙尘暴": "20",
    "小雨-中雨": "21",
    "中雨-大雨": "22",
    "大雨-暴雨": "23",
    "暴雨-大暴雨": "24",
    "大暴雨-特大暴雨": "25",
    "小雪-中雪": "26",
    "中雪-大雪": "27",
    "大雪-暴雪": "28",
    "浮尘": "29",
    "扬沙": "30",
    "强沙尘暴": "31",
    "没有数据": "nothing"
};
var day = [
    "今天",
    "明天",
    "后天"
];
window.onload = function () {
    changeCity('101010100');
    var ojson;

    $.getJSON('data/cityNode.json', function (json) {
        ojson = json;
        var aList = findCity();
        var string = '';
        for (var i = 0; i < aList.length; i++) {
            string += '<option>' + aList[i] + '</option>';
        }
        oSelectPar.innerHTML = string;
    });

    var oRoot = document.getElementById('root');
    var oSelectPar = document.getElementById('par');
    var oSelectCity = document.getElementById('city');
    var oSelect = document.getElementById('block');
    var oLoading = document.getElementById('loading');
    oRoot.style.display="none";
    oLoading.style.display="block";

    oSelectPar.onchange = function(){
        fSelectPar();
        fSelectCity();
        fSelect();
    };
    oSelectCity.onchange = function(){
        fSelectCity();
        fSelect();
    };
    oSelect.onchange = function(){
        fSelect();
    };

    function findIcon(key) {
        return weaterMap[key] || weaterMap["没有数据"];
    }

    function changeCity(city) {
        $.getJSON('http://wthrcdn.etouch.cn/weather_mini?citykey=' + city, function (json) {
            oRoot.style.display="none";
            oLoading.style.display="block";
            document.getElementById('title').innerHTML = json.data.forecast[0].date + ' '
                + json.data.forecast[0].type + ' '
                + '<img src=/experience/weather/images/b_' + findIcon(json.data.forecast[0].type) + '.gif/>'
                + '<p>' + json.data.wendu + '° ' + json.data.ganmao + '</p>';

            var string = '';
            for (var i = 1; i <= 3; i++) {
                var imageURL = "'images/a_" + findIcon(json.data.forecast[i - 1].type) + ".gif'";
                // alert(imageURL);
                // alert('<div class="col-sm-4 table-bordered" style="background: url('+imageURL+') no-repeat right center;">');
                string += '<div class="col-sm-4 table-bordered watherforecast" style="background: url(' + imageURL + ') no-repeat right center;">';
                string += '<h3>' + day[i - 1] + ' ' + json.data.forecast[i - 1].date + '</h3>';
                string += '<p>' + "天气" + json.data.forecast[i - 1].type + '</p>';
                string += '<p>' + json.data.forecast[i - 1].high + '</p>';
                string += '<p>' + json.data.forecast[i - 1].low + '</p>';
                string += '<p>' + json.data.forecast[i - 1].fengxiang + '</p>';
                string += '<p>' + json.data.forecast[i - 1].fengli + '</p>';
                string += '</div>';
            }
            oRoot.innerHTML = string;
            oLoading.style.display="none";
            oRoot.style.display="block";
        });
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
};
