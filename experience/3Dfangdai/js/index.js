/**
 * Created by 孙颢pc on 2016/10/15.
 */

$(function () {

    /**
     * dataBase
     */
    var type=0;//商业贷款
    var type2=0;//根据面积
    var type3=0;//year 无用
    var original=0;//总借款额
    var year=20;//借款年份
    var yearratio=6.55;//借款利率

    var percentage=0.7;//按揭成数
    var $container = $('#rm-container');

    /**
     * end
     */


    Menu.init();
    var $about = $('#about');
    var $btn=$("#btn");
    var $type2=$("#type2");
    var $pay=$("#pay");
    $btn.find("button").on("click",function () {
        $(this).removeClass('btn-default').addClass('btn-active');
        $(this).siblings().removeClass('btn-active').addClass('btn-default');
        if($(this).attr('data-thumb')==1){
            type=0;
            if(type2==0)$pay[0].value=loanRate[type][type3];
            else $pay[0].value="";
        }else{
            type=1;
            if(type2==0)$pay[0].value=loanRate[type][type3];
            else $pay[0].value="";
        }
    });

    var $_area=$("#_area");
    var $_sum=$("#_sum");

    $pay.on("change",function () {
        yearratio=parseFloat($(this).val());
    });

    $type2.find("a").on("click",function () {
        $type2.find("button")[0].innerHTML=$(this)[0].innerHTML+'<span class="caret"></span>';
        original=0;
        if($(this).attr('data-thumb')==1){
            type2=0;
            $_area.css({"display":"block"});
            $_sum.css({"display":"none"});
            $pay[0].value=loanRate[type][type3];
        }else{
            type2=1;
            $_area.css({"display":"none"});
            $_sum.css({"display":"block"});
            $pay[0].value="";
        }
    });

    var $percentage=$("#percentage");
    $percentage.find('a').on("click",function () {
        percentage=parseFloat($(this).attr('data-thumb'));
        $percentage.find('button')[0].innerHTML=$(this)[0].innerHTML+'<span class="caret">';
    });

    var $yearF=$('#yearF');
    var years=[3,20,25,30];
    $yearF.find('a').on("click",function () {
        type3=parseInt($(this).attr('data-thumb'));
        year=years[type3];
        yearratio=loanRate[type][type3];
        $pay[0].value=yearratio;
        $yearF.find('button')[0].innerHTML=$(this)[0].innerHTML+'<span class="caret">';
    });

    var $viewResult=$("a[href='#'].rm-viewdetails");
    $viewResult.on("click",function () {
        if(type2==0){
            original=parseInt($_area.find("input").eq(0).val())+parseInt($_area.find("input").eq(1).val())*percentage;
        }else{
            original=parseInt($_sum.find("input").eq(0).val());
        }
        var $modal="";
        var objArray;
        var $obj;
        if($(this).attr('data-thumb')==1){
            objArray=Tool.Borrow(original,yearratio,year);
            $modal=
                $('<div class="rm-modal">' +
                    '<div class="rm-thumb table-responsive table-hover" style="background-image: url(images/d.jpg)"></div>' +
                    '<h5>等额本息</h5><table class="table table-striped">' +
                    '<tr><td>每月支付本息</td><td>'+objArray[0]+
                        '</td></tr>'+
                    '<tr><td>累计还款总额</td><td>'+objArray[1]+
                    '</td></tr>'+
                    '<tr><td>累计支付利息</td><td>'+objArray[2]+
                    '</td></tr>'+
                    '<tr><td>每月应付利息</td><td>'+objArray[3]+
                    '</td></tr>'+
                    '</table><a href="#" target="_blank">查看详情(暂时未完成)</a>' +
                    '<span class="rm-close-modal">x</span></div>');
            $obj=$("#left").find("input");
        }else{
            objArray=Tool.Floan(original,yearratio,year);
            $modal=
                $('<div class="rm-modal">' +
                    '<div class="rm-thumb table-responsive table-hover" style="background-image: url(images/d.jpg)"></div>' +
                    '<h5>等额本金</h5><table class="table table-striped">' +
                    '<tr><td>首月还款金额</td><td>'+objArray[0]+
                    '</td></tr>'+
                    '<tr><td>每月还款减少金额</td><td>'+(objArray[0]-objArray[1])+
                    '</td></tr>'+
                    '<tr><td>累计还款总额</td><td>'+objArray[objArray.length-1]+
                    '</td></tr>'+
                    '<tr><td>'+
                    '</table><a href="#" target="_blank">查看详情(暂时未完成)</a>' +
                    '<span class="rm-close-modal">x</span></div>');
            $obj=$("#right").find("input");
        }
        $container.removeClass('rm-in').children('div.rm-modal').remove();

        $modal.appendTo($container);

        var h = $modal.outerHeight(true);
        $modal.css('margin-top', -h / 2);

        setTimeout(function () {

            $container.addClass('rm-in rm-nodelay');

            $modal.find('span.rm-close-modal').on('click', function () {

                $container.removeClass('rm-in');

            });

        }, 0);



        return false;
    });

    $about.unbind();
    $about[0].onclick = function () {
        $container.removeClass('rm-in').children('div.rm-modal').remove();
        var $modal =
            $('<div class="rm-modal">' +
                '<div class="rm-thumb" style="background-image: url(images/imsunhao.jpg)"></div>' +
                '<h5>ABOUT ME</h5><p>Hi im sunhao</p>' +
                '<a href="http://imsunhao.com" target="_blank">See the my webstation</a>' +
                '<span class="rm-close-modal">x</span></div>');

        $modal.appendTo($container);

        var h = $modal.outerHeight(true);
        $modal.css('margin-top', -h / 2);

        setTimeout(function () {

            $container.addClass('rm-in rm-nodelay');

            $modal.find('span.rm-close-modal').on('click', function () {

                $container.removeClass('rm-in');

            });

        }, 0);

        return false;
    };
});