/**
 * Created by hxsd on 2016/10/13.
 */
//计算月还款本息的工具对象
var Tool = {
    /**
     * 等额本息
     * @param original
     * @param yearratio
     * @param year
     * @returns {Array}
     * @constructor
     */
    Borrow: function (original, yearratio, year) {
//验证数据有限性
        year = parseInt(year);
        original = parseFloat(original);
        yearratio = parseFloat(yearratio);

//还款月数
        var timeSpan = year * 12;
//某种利率
        var active = yearratio * 10 / 12 * 0.001;

        var t1 = Math.pow(1 + active, timeSpan);
        var t2 = t1 - 1;
        var tmp = t1 / t2;
//月利率
        var monthratio = active * tmp;

//每月支付本息
        var monthBack = original * monthratio;
//累计还款总额
        var totalBack = monthBack * timeSpan;
//累计支付利息
        var totalInterest = totalBack - original;
//每月应付利息
        var monthInterest = totalInterest / timeSpan;

        totalInterest = (Math.round(totalInterest * 100)) / 100;//存款利息：取两位小数
        monthInterest = (Math.round(monthInterest * 10000)) / 10000;//存款利息：取两位小数
        monthBack = (Math.round(monthBack * 10000)) / 10000;//存款利息：取两位小数
        totalBack = (Math.round(totalBack * 100)) / 100;//本息合计：取两位小数

        var objArray = new Array();
        objArray[0] = monthBack;
        objArray[1] = totalBack;
        objArray[2] = monthInterest;
        objArray[3] = totalInterest;

//alert(objArray);
        return objArray;
    }
    /**
     * 等额本金
     * @param original
     * @param yearratio
     * @param year
     * @returns {Array}
     * @constructor
     */
    , Floan: function (original, yearratio, year) {
//验证数据有限性
        year = parseInt(year);
        original = parseFloat(original);
        yearratio = parseFloat(yearratio);

//还款月数
        var timeSpan = year * 12;
//某种利率
         var active = yearratio * 10 / 12 * 0.001;

        var objArray = new Array();
//月还款额
        var interestM = 0;
//累计还款总额
        var interestTotal = 0;
        for (i = 1; i < timeSpan + 1; i++) {
            t1 = (original - original * (i - 1) / timeSpan) * active;//第i月还款利息
            interestM = original / timeSpan + t1;//第i月还款额
            objArray[i - 1] = interestM;
            interestTotal = interestTotal + interestM;
        }

        interestTotal = (Math.round(interestTotal * 100)) / 100;
        objArray[timeSpan] = interestTotal;
        return objArray;
    }

};

// 贷款利率
var loanRate = [
    ["6.80", "6.55", "6.15", "5.90"],       // 商业贷款利率，不同日期的贷款利率
    ["4.70", "4.50", "4.25", "4.00"]        // 公积金贷款利率，不同日期的贷款利率
];


//等额本息还款法
//original贷款金额
//yearratio年利率%，如年利率5.6%就为5.6
//year还款年限

//等额本息还款法
//original贷款金额
//yearratio年利率%，如年利率5.6%就为5.6
//year还款年限

