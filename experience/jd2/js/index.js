// JavaScript Document

function documentReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', fn, false);
	}else{
		document.attachEvent('onreadystatechange', function (){//IE兼容
			if(document.readyState=='complete'){
				fn && fn();
			}
		});
	}
}
documentReady(function () {
	var aTable = new Array(11);
	for (var i = 1; i < 12; i++) {
		aTable[i - 1] = document.getElementById('the_f_' + i + '_ul');
		hsxd_widget.tab(aTable[i - 1]);
	}
});
