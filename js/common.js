   //获取开始的日期
    var getStartDate = function(n) {
        var dayStart = new Date();
        switch (n) {
            case 1:
                dayStart.setDate(dayStart.getDate() - 7);
                return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
            case 2:
                dayStart.setMonth(dayStart.getMonth() - 1);
                return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
            case 3:
                dayStart.setMonth(dayStart.getMonth() - 3);
                return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
            case 4:
                dayStart.setMonth(dayStart.getMonth() - 6);
                return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
            case 5:
                dayStart.setYear(dayStart.getFullYear() - 1);
                return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
            case 6:
                dayStart.setYear(dayStart.getFullYear() - 3);
                return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
            case 7:
                return "2000/1/1";
            default:
                dayStart.setFullYear(n, 0, 1);
                return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
        }
    }
    //获取结束的日期
    var getEndDate = function (n) {
        var today = new Date();
        switch (n) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                return today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
            default:
                today.setFullYear(n, 11, 31);
                return today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
        }
    }
    /*$("#input_stockcode").typeahead({
        source: function (query, process) {
            var parameter = { "keyword": query };
            if (!query || query.length < 2) return false;
            $.post("/api/Disclosure/RetrieveMainCompany/", parameter, function (data) {
                process(data.Hints);
            });
        }
    });*/
    project = ['003333 淘淘','888888 顺顺','111111 京京','0022222 见微'];
    // $('#input_stockcode').typeahead({
    //     source: project
    // })
    $('#input_stockcode').on('input',function(){
        var val = $(this).val();
        $('#stock_result').empty();
        if(!val || val.length < 2) return false;
        for(var i = 0; i < project.length; i++){
            var $li = $('<li></li>');
            $li.text(project[i]); 
            $li.bind('click',function(e){
                $('#input_stockcode').val($(this).text());
                $('#stock_result').hide();
            })
            $('#stock_result').append($li);
        }
        $('#stock_result').show();
         
        /*$.post('/api/Disclosure/RetrieveMainCompany/',{val: val},function(data){
            for(var i = 0; i < project.length; i++){
                var $li = $('<li></li>');
                $li.text(project[i]); 
                $('#stock_result').append($li);
            }
            $('#stock_result').show();
        })*/
    });
    
    //调整主题内容的高度
    var windowHeight = $(window).height();
    $("#content").height(windowHeight - 210);
    $(window).resize(function() {
        var windowHeight = $(window).height();
        $("#content").height(windowHeight - 210);
    });
    //兼容ie的输入框
    var ieSearchDisclosureAdjust = function (body) {
        body.query = (body.query == "请输入标题或正文中的关键词（至少两个字），多个词以空格隔开") ? "" : body.query;
        body.titleMust = (body.titleMust == "必含关键词...") ? "" : body.titleMust;
        body.titleShould = (body.titleShould == "可含关键词...") ? "" : body.titleShould;
        body.contentMustNot = (body.contentMustNot == "不含关键词...") ? "" : body.contentMustNot;
        body.contentMust = (body.contentMust == "必含关键词...") ? "" : body.contentMust;
        body.contentShould = (body.contentShould == "可含关键词...") ? "" : body.contentShould;
        body.contentMustNot = (body.contentMustNot == "不含关键词...") ? "" : body.contentMustNot;
        body.stock = (body.stock == "公司代码/简称") ? "" : body.stock;
        return body;
    }  

   
    //二级标题的切换
    $('.drop-down').on('click',function(){
        $(this).parent().parent().find('.two-leavel').slideToggle();
    })
    //序列化表单
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    //单框搜索
    var singleFilter = function (body) {
        if (flagSingle) {
            body.tm = '';
            body.ts = '';
            body.tn = '';
            body.cm = '';
            body.cs = '';
            body.cn = '';
            body.c = '';
        } else {
            body.ss = "";
        }
        return body;
    }
    var abbr = function (str, length, appendString) {
        if (str.length > length + appendString.length - 1) {
            return str.substring(0, length) + appendString;
        } else {
            return str;
        }
    }

    var abbrEm = function (str, length, appendString) {
        var rgEm = new RegExp("<[^<>]+>", "g");
        if (!rgEm.test(str)) {
            return abbr(str, length, appendString);
        }
        var strRaw = str.replace(rgEm, "");
        if (strRaw.length <= length) {
            return str;
        } else {
            var rgFirstEm = new RegExp("^(.*?)<em>([^<]+)<");
            var strPre = str.match(rgFirstEm)[1];
            var strEm = str.match(rgFirstEm)[2];
            var strReturn;
            if (strPre.length + strEm.length > length) {
                var diff = strPre.length + strEm.length - length;
                strPre = strPre.substr(0, strPre.length - diff - 1) + "...";
                strReturn = strPre + "<em>" + strEm + "</em>" + appendString;
                return strReturn;
            } else {
                var rgEmEnd = new RegExp("</em>(.*)$");
                var strAfter = str.match(rgEmEnd)[1];
                diff = length - strPre.length - strEm.length;
                strAfter = strAfter.substr(0, diff);
                var rgOpenEmEnd = new RegExp("<[/em]+$");
                strAfter = strAfter.replace(rgOpenEmEnd, "");
                strReturn = strPre + "<em>" + strEm + "</em>" + strAfter + appendString;
                return strReturn;
            }
        }
    }

    var abbrNum = function(num) {
        if (num > 99999) {
            return "99999+";
        } else {
            return num;
        }
    }
    var connotate = function(uri) {
        return uri.replace("%", "%25");
    }
    var wait = function (option) {
        if (option === "show") {
            $(".wait").show();
        } else {
            $(".wait").hide();
        }
    }
    var extractDate = function(str) {
        return str.replace(regDate, "");
    }
    var regDate = new RegExp("T.*");
    var regFloatPart = new RegExp("\\.\\d+$");
    var regIntPart = new RegExp("^\\d+");
    var formatThousand = function (number) {
        if (number == 0) return "0";
        if (!number) return "";
        var str = number.toString();
        str = str.replace(",", "");
        var strInt, strFloat = "";
        if (!regIntPart.test(str)) return "";
        strInt = str.match(regIntPart)[0];
        if (regFloatPart.test(str)) {
            strFloat = str.match(regFloatPart)[0];
        }
        var digits = [];
        for (var i = strInt.length - 1; i >= 0; i--) {
            if ((strInt.length - i - 1) % 3 == 0 && i != strInt.length - 1) {
                digits.unshift(",");
            }
            digits.unshift(strInt[i]);
        }
        strInt = digits.join("");
        return strInt + strFloat;
        return number;
    }