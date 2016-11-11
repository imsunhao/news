


var $ = {
    ajax:function(url,success,error,key){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(success) success(xhr.responseText);
                }else if(xhr.status == 404){
                    if(error) error(xhr.status);
                }
            }
        };
        if(key)xhr.setRequestHeader('apikey',key);
        xhr.send(null);
    },
    getJSON:function(url,success,key){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(success){
                        success(JSON.parse(xhr.responseText));
                    }
                }
            }
        };
        xhr.setRequestHeader("apikey",key);
        xhr.send(null);
    }
};
function addEventHandler(target,type,func){
    if(target.addEventListener){
        //监听IE9，谷歌和火狐
        target.addEventListener(type, func, false);
    }else if(target.attachEvent){
        target.attachEvent("on" + type, func);
    }else{
        target["on" + type] = func;
    }
}
function removeEventHandler(target, type, func) {
    if (target.removeEventListener){
        //监听IE9，谷歌和火狐
        target.removeEventListener(type, func, false);
    } else if (target.detachEvent){
        target.detachEvent("on" + type, func);
    }else {
        delete target["on" + type];
    }
}