$(document).ready(function(){
	//日期
	$('#date_text').on('click',function(){
		$('#lst_periods').toggleClass('active');
	});

	var today = new Date();
    var defaultDayStart = new Date(2000, 0, 1);
    $('#input_ds').val(defaultDayStart.getFullYear() + '/' + (defaultDayStart.getMonth() + 1) + '/' + defaultDayStart.getDate());
    $('#input_de').val(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate());
    $('#lst_periods .date').on('click', function () {
        var opt;
        switch ($(this).text()) {
            case '最近一周': opt = 1; break;
            case '最近一月': opt = 2; break;
            case '最近三月': opt = 3; break;
            case '最近六月': opt = 4; break;
            case '最近一年': opt = 5; break;
            case '最近三年': opt = 6; break;
            case '全部时间': opt = 7; break;
            case '2016年': opt = 2016; break;
            case '2015年': opt = 2015; break;
            case '2014年': opt = 2014; break;
            case '2013年': opt = 2013; break;
            default: opt = 7; break;
        }
        $('#input_ds').val(getStartDate(opt));
        $('#input_de').val(getEndDate(opt));
	});
    //高级搜索
    var flagSingle = true;
    $('#senior_search').on('click',function(){
        if (flagSingle) {
            flagSingle = false;//高级
        } else {
            flagSingle = true;//单框
        }
        //公司代码
        $('#code_search').toggleClass('active');
        //单框搜索
        $('#input_search').toggleClass('hideSelf');
        //高级搜索框
        $('.div-multi-item').toggleClass('active');
        //高级搜索按钮
        $('#senior_btn_wrap').toggleClass('active');
        $('.search-icon').toggleClass('toggle-icon');
    })
    //filter类别切换
    $('.filter-title').on('click',function(){
        $(this).parent().find('.filter-list').toggleClass('active');
        $(this).parent().siblings().find('.filter-list').removeClass('active');
    })
    //搜索结果的切换
    $('.result-area').on('click',function(){
        $(this).find('.paras-wrap').slideToggle();
        $(this).toggleClass('bg');
    });
    //展开所有
    $("#btn_expandAll").click(function () {
        if ($(this).html() === "全部展开") {
            $(".result-area").find(".paras-wrap").slideDown();
            $('.result-area').addClass('bg');
            $(this).html("全部收起");
        } else {
            $(".result-area").find(".paras-wrap").slideUp();
            $('.result-area').removeClass('bg');
            $(this).html("全部展开");
        }
    });
    //right aside 切换
    $('.navlist').on('click',function(e){
        $(this).parent().find('.tablist').addClass('active');
        $(this).parent().siblings().find('.tablist').removeClass('active');
    })

    $('#btn_submit').on('click',function(e){
    	e.preventDefault();
    	updateResultView();
    })
    var singleFilter = function(body){
        if (flagSingle) {
            body.tm = '';
            body.ts = '';
            body.tn = '';
            body.cm = '';
            body.cs = '';
            body.cn = '';
            body.c  = '';
        } else {
            body.ss = '';
        }
        return body;
    }
   
    var updateResultView = function(){
        $('#div_content').hide();
        $('#div_result').show();
        var $temp = $('#div_result_0');
        $('div.result-area.real').remove();
        for (i = 0; i < results.hits.length; i++) {
            var $result = $temp.clone(true);
            $result.addClass('real');
            $result.removeClass('temp');
            $result.attr('id', 'div_result_' + (i + 1));
            //Company
            var $company = $result.find('a.stock');
            $company.attr('href', results.hits[i].source.Company);
            $company.text(results.hits[i].source.StockCode);
            //Title
            var $title = $result.find('a.title');
            $title.attr('href', results.hits[i].source.Href);
            $title.attr('title', results.hits[i].source.Title);
            $title.html(results.hits[i].short);
            //Source File
            $result.find('a.source').attr('href', results.hits[i].source.Url);
            //Span
            $result.find('span').eq(0).text(extractDate(results.hits[i].source.PublishDate));
            //Paragraph
            var $paragraphs = $result.find('div.paras-wrap');
            $paragraphs.attr('id', results.hits[i].id);
            for (j = 0; j < results.hits[i].highlights.length; j++) {
                var $para = $('<p class="para"></p>');
                $para.html(results.hits[i].highlights[j]);
                $paragraphs.append($para);
            }
            if (i == 0) {
               	$result.addClass('bg');
            }
            $result.hide();
            $result.insertAfter($('#div_result_' + i));
            $result.slideDown();
        }
    }

    var updatePage = function(){
        $('#result_pages a.foot-page').remove();
        var $loadNext = $('#btn_loadNext');
        for (i = 0; i < results.pages.length; i++) {
            var $page = $('<button class="foot-page"></button>');
            $page.bind('click', { 'p': results.pages[i] }, function (e) {
                load(e);
            });
            $page.text(results.pages[i]);
            if (results.pages[i] == flagPn) {
                $page.attr('style', 'font-weight:bold;border-color:red');
            } else {
                $page.attr('style', '');
            }

            $page.insertBefore($loadNext);
        }
        var finalPage = Math.ceil(results.count / 20);
        if (results.pages[0] == 1) {
            $('#btn_loadPrior').addClass('disabled');
        } else {
            $('#btn_loadPrior').removeClass('disabled');
        }
        if (results.pages.length < 5 || results.pages[4] == finalPage) {
            $('#btn_loadNext').addClass('disabled');
        } else {
            $('#btn_loadNext').removeClass('disabled');

        }
    }
	//Fill Search Result
    var fillPage = function(data){
        results.pages = [];
        $("#btn_loadPrior").addClass("disabled");
        if (results.count > 0) {
            if (results.count > 100) {
                results.pages.push(1, 2, 3, 4, 5);
                $("#btn_loadNext").removeClass("disabled");
            } else {
                for (i = 1; i <= Math.ceil(results.count / 20) ; i++) {
                    results.pages.push(i);
                }
                $("#btn_loadPrior").addClass("disabled");
                $("#btn_loadNext").addClass("disabled");
            }
        }
        updatePage();
    }
    var fillSearch = function (data) {
        if (data.Token == "no") {
            localStorage.uid = "";
            localStorage.token = "";
            alert("您的账户刚刚在另一浏览器登陆，请您重新登陆，谢谢！");
            window.location.href = "/";
            return;
        }
        localStorage.token = data.Token;
        results.count = data.Total || 0;
        results.hits = [];
        //Count
        var inHits = data.Hits || [];

        for (i = 0; i < inHits.length; i++) {
            //Highlight for Content
            var highlights = [];
            for (j = 0; j < inHits[i].Highlight.Content.length; j++) {
                highlights.push(inHits[i].Highlight.Content[j]);
            }
            //For Title
            var displayedTitle = "";
            if (inHits[i].Highlight.Title.length > 0) {
                displayedTitle = abbrEm(inHits[i].Highlight.Title[0], 36, "...");
            } else {
                displayedTitle = abbr(inHits[i].Source.Title, 36, "...");
            }
            inHits[i].Source.Href = connotate(inHits[i].Source.Href + "&ss=" + $("#input_ss").val().replace(regSpan, "") + "&cm=" + $("#input_cm").val().replace(regSpan, "") + "&cs=" + $("#input_cs").val().replace(regSpan, ""));
            if (inHits[i].Source.StockCode == "预披露" || inHits[i].Source.StockCode == "监管") {
                inHits[i].Source.Company = "javascript:void(0)";
            } else {
                inHits[i].Source.Company = "/Home/Company?market=" + flagMarket + "&code=" + inHits[i].Source.StockCode + "&ticker=" + inHits[i].Source.StockTicker + "&key=";
            }
            results.hits.push({ "id": inHits[i].Id, "source": inHits[i].Source, "highlights": highlights, "short": displayedTitle });
        }
        updateResultView();
        updatePage();
    }

    var reset = function(){
        $("#input_ds").val(defaultDayStart.getFullYear() + "/" + (defaultDayStart.getMonth() + 1) + "/" + defaultDayStart.getDate());
        $("#input_de").val(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
        $("#input_ss").val("");
        $("#input_tm").val("");
        $("#input_ts").val("");
        $("#input_tn").val("");
        $("#input_cm").val("");
        $("#input_cs").val("");
        $("#input_tn").val("");
        $("#input_stockcode").val("");
    };
    $("#btn_reset").bind("click", function () {
       reset();
    });
})