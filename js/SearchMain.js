;$(document).ready(function(){
	//日期
	$('#date-text').on('click',function(){
		$('#lst_periods').toggleClass('active');
	});

	var today = new Date();
    var defaultDayStart = new Date(2000, 0, 1);
    $("#input_ds").val(defaultDayStart.getFullYear() + "/" + (defaultDayStart.getMonth() + 1) + "/" + defaultDayStart.getDate());
    $("#input_de").val(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
    $("#lst_periods .date").on("click", function () {
        var opt;
        switch ($(this).text()) {
            case "最近一周": opt = 1; break;
            case "最近一月": opt = 2; break;
            case "最近三月": opt = 3; break;
            case "最近六月": opt = 4; break;
            case "最近一年": opt = 5; break;
            case "最近三年": opt = 6; break;
            case "全部时间": opt = 7; break;
            case "2016年": opt = 2016; break;
            case "2015年": opt = 2015; break;
            case "2014年": opt = 2014; break;
            case "2013年": opt = 2013; break;
            default: opt = 7; break;
        }
        $("#input_ds").val(getStartDate(opt));
        $("#input_de").val(getEndDate(opt));
	});
    //高级搜索
    $('#senior-search').on('click',function(){
        $('#div_multi').toggleClass('active');
        $('#sure_btn').toggleClass('active');
    })
    //filter类别切换
    $('.filter-title').on('click',function(){
        $(this).parent().find('.filter-list').toggleClass('active');
        $(this).parent().siblings().find('.filter-list').removeClass('active');
    })
    //获取数据
    /*var loginBody = {
            "uid": 'luya123',
            "pwd": md5('luya123' + '201314qaz'),
            "citadel": localStorage.citadel
        }
        $.post("http://www.soupilu.com/Home/SearchMain", loginBody, function (result) {
            if (result.ResponseCode == 1) {
                writeUser(user.uid);
                if (result.Citadel != "") {
                    localStorage.citadel = result.Citadel;
                }
                localStorage.token = result.ResponseMessage;
                console.info(result);
            } 
        });*/
    //获取json文档
    $.ajax({
           url: "news.json",//json文件位置
           type: "GET",//请求方式为get
           dataType: "json", //返回数据格式为json
           success: function(data) {//请求成功完成后要执行的方法 
               //each循环 使用$.each方法遍历返回的数据date
               console.info(data);
           }
        })
    //创建筛选条件
    var data = [
    		{ff:'2',name:'1',chs:'市场',fl:'market'},
    		{ff:'2',name:'2',chs:'公告',fl:'notice'},
    		{ff:'2',name:'3',chs:'地域',fl:'local'}
    ]
    var createFilter = function(){
    	var $item = $("<a href='javascript:void(0)' class='list-group-item panel-list-item filter'></a>");
        $item.text(data[i].chs);
        $item.bind("click", {
            "ff": 2,
            "fv": data[i].name,
            "label": data[i].chs,
            'fl': data[i].fl //类别
        }, function (e) {
            addFilter(e);
        });
        var $count = $("<span class='badge'></span>");
        $count.text(data[i].count);
        $count.prependTo($item);
	}
    //根据输入的data数组，生成panel
    var generatePanel = function(data) {
        var $div = $("<div></div>");
        var width = 300;
        if (data.length <= 15) {
            var $divFirstCol = $("<div class='col-xs-12'></div>");
            for (i = 0; i < data.length; i++) {
                createFilter(); 
                $divFirstCol.append($item);
            }
            $div.append($divFirstCol);
        }
        else if (data.length > 15 && data.length <= 30) {
            width = 600;
            $divFirstCol = $("<div class='col-xs-6'></div>");
            var $divSecondCol = $("<div class='col-xs-6'></div>");
            for (i = 0; i < data.length; i++) {
                createFilter(); 
                if (i <= 15) $divFirstCol.append($item);
                else $divSecondCol.append($item);
            }
            $div.append($divFirstCol);
            $div.append($divSecondCol);
        }
        else if (data.length > 30) {
            width = 900;
            $divFirstCol = $("<div class='col-xs-4'></div>");
            $divSecondCol = $("<div class='col-xs-4'></div>");
            var $divThirdCol = $("<div class='col-xs-4'></div>");
            for (i = 0; i < data.length; i++) {
                createFilter(); 
                if (i <= 15) $divFirstCol.append($item);
                else if (i > 15 && i <= 30) $divSecondCol.append($item);
                else $divThirdCol.append($item);
            }
            $div.append($divFirstCol);
            $div.append($divSecondCol);
            $div.append($divThirdCol);
        }
        $div.css("width", width + "px");
        return $div;
    }
    //展示panel
    $("#btn_noticePanel").on("mouseenter", function () {
    	console.info('aaa');
        var $divParent = $("#div_noticePanel");
        var $div = generatePanel(results.notices);
        if (results.notices.length <= 15) {
            $divParent.css("left", "-340px");
        } else if (results.notices.length > 15 && results.notices.length < 30) {
            $divParent.css("left", "-640px");
        } else {
            $divParent.css("left", "-940px");
        }
        $("#div_noticePanel").find("div").eq(0).append($div);
        $divParent.show();
    });
    //移除panel
    $("#div_noticePanel").on("mouseleave", function() {
        $("#div_noticePanel").find("div").eq(0).empty();
        $("#div_noticePanel").hide();
    });

    $('.filter-close').on('click',function(){
        $(this).parent().remove();
        var len = $('.filter-close').length;
        if(len == 0){
            $('.label-wrap').removeClass('active');
        }
    })
    //删除筛选按钮
    var deleteFilter = function (e) {
        var ff = e.data.ff;
        var fv = e.data.fv;
        for (i = 0; i < filters.length; i++) {
            if (filters[i].ff === ff && filters[i].fv === fv) {
                filters.splice(i, 1);
            }
        }
        //Update View
        $("#" + ff + "_" + fv.replace(" ", "_")).remove();
        $(".filter-label").removeClass("color-main");
        if (filters.length == 0) {
            $("#div_filter").slideUp();
            $("#btn_applyFilters").addClass("disabled");
            $("#btn_resetFilters").addClass("disabled");
            //search();
        }
    }

    addFilter = function (e) {
        var ff = e.data.ff;
        var fv = e.data.fv;
        var label = e.data.label;
        var fl = e.data.fl //类别
        for (i = 0; i < filters.length; i++) {
            if (filters[i].ff === ff && filters[i].fv === fv) {
                return false;
            }
        }
        filters.push({ "ff": ff, "fv": fv, "label": label });
        //Update Filter View
        var $filter = $('<a class="filter-label" href=""></a>');
        $filter.addClass(fl);
        $filter.attr("id", ff + "_" + fv.replace(" ", "_"));
        $filter.text(label);
        $div.append($filter);
        var $delete = $('<span class="filter-close">x</span>');
        $delete.bind("click", { "ff": ff, "fv": fv }, function (ee) {
            deleteFilter(ee);
        });
        $filter.append($delete);
        $("#label-wrap").append($filter);
        if (filters.length == 1) $("#label-wrap").slideDown();
        // $("#btn_applyFilters").removeClass("disabled");
        // $("#btn_resetFilters").removeClass("disabled");
    }
    //兼容ie的输入框
    /*var ieSearchDisclosureAdjust = function (body) {
        body.ss = (body.ss == "请输入标题或正文中的关键词（至少两个字），多个词以空格隔开") ? "" : body.ss;
        body.tm = (body.tm == "必含关键词...") ? "" : body.tm;
        body.ts = (body.ts == "可含关键词...") ? "" : body.ts;
        body.tn = (body.tn == "不含关键词...") ? "" : body.tn;
        body.cm = (body.cm == "必含关键词...") ? "" : body.cm;
        body.cs = (body.cs == "可含关键词...") ? "" : body.cs;
        body.cn = (body.cn == "不含关键词...") ? "" : body.cn;
        body.c = (body.c == "公司代码/简称") ? "" : body.c;
        return body;
    }  */
});
    
