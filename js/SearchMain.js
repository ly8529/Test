;$(document).ready(function(){
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
        $(this).parent().find('.filter-list').slideToggle();
        $(this).parent().siblings().find('.filter-list').slideUp();
    })
    $('.filter-title').mouseenter(function(){
        $(this).parent().find('.panel-wrap').show();
        $(this).parent().siblings().find('.panel-wrap').hide();
    })
    $('.panel-wrap').mouseleave(function(){
        $('.panel-wrap').hide();
    })
    $('.panel-list .left').on('click',function(){
        $(this).parent().parent().find('.second-wrap.left').show();
        $(this).parent().parent().find('.second-wrap.right').hide();
        $(this).parent().parent().siblings().find('.second-wrap').hide();
    })
    $('.panel-list .right').on('click',function(){
        $(this).parent().parent().find('.second-wrap.right').show();
        $(this).parent().parent().find('.second-wrap.left').hide();
        $(this).parent().parent().siblings().find('.second-wrap').hide();
    })
    $('.filter-width').on('click',function(){
        $(this).parent().find('.test').show();
        console.info($(this).parent().find('.test').css('height'));
        $(this).parent().siblings().find('.test').hide();
    })
    //搜索结果的切换
    $('.result-area').on('click',function(){
        $(this).find('.paras-wrap').slideToggle();
        $(this).toggleClass('bg');
    });
    //展开所有
    $('#btn_expandAll').click(function () {
        if ($(this).html() === '全部展开') {
            $('.result-area').find('.paras-wrap').slideDown();
            $('.result-area').addClass('bg');
            $(this).html('全部收起');
        } else {
            $('.result-area').find('.paras-wrap').slideUp();
            $('.result-area').removeClass('bg');
            $(this).html('全部展开');
        }
    });
    $('#span_title').mouseenter(function(){
        $('#span_title').stop(true).animate({'height':'120px'},500);
    })
    $('#span_title').mouseleave(function(){
        $('#span_title').stop(true).animate({'height':'40px'},500);
    })
    //right aside 切换
    $('.navlist').on('click',function(e){
        $(this).parent().find('.tablist').addClass('active');
        $(this).parent().siblings().find('.tablist').removeClass('active');
    })

    //var createFilter = function(){
 //    	var $item = $('<a href='javascript:void(0)' class='list-group-item panel-list-item filter'></a>');
 //        $item.text(data[i].chs);
 //        $item.bind('click', {
 //            'ff': 2,
 //            'fv': data[i].name,
 //            'label': data[i].chs,
 //            'fl': data[i].fl //类别
 //        }, function (e) {
 //            addFilter(e);
 //        });
 //        var $count = $('<span class='badge'></span>');
 //        $count.text(data[i].count);
 //        $count.prependTo($item);
	// }

    //删除筛选按钮
   /* var deleteFilter = function (e) {
        var ff = e.data.ff;
        var fv = e.data.fv;
        for (i = 0; i < filters.length; i++) {
            if (filters[i].ff === ff && filters[i].fv === fv) {
                filters.splice(i, 1);
            }
        }
        //Update View
        $('#' + ff + '_' + fv.replace(' ', '_')).remove();
        $('.filter-label').removeClass('color-main');
        if (filters.length == 0) {
            $('#div_filter').slideUp();
            $('#btn_applyFilters').addClass('disabled');
            $('#btn_resetFilters').addClass('disabled');
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
        filters.push({ 'ff': ff, 'fv': fv, 'label': label });
        //Update Filter View
        var $filter = $('<a class='filter-label' href='></a>');
        $filter.addClass(fl);
        $filter.attr('id', ff + '_' + fv.replace(' ', '_'));
        $filter.text(label);
        $div.append($filter);
        var $delete = $('<span class='filter-close'>x</span>');
        $delete.bind('click', { 'ff': ff, 'fv': fv }, function (ee) {
            deleteFilter(ee);
        });
        $filter.append($delete);
        $('#label-wrap').append($filter);
        if (filters.length == 1) $('#label-wrap').slideDown();
        // $('#btn_applyFilters').removeClass('disabled');
        // $('#btn_resetFilters').removeClass('disabled');
    }*/
    //reset button
    var reset = function(){
        $('#input_ds').val(defaultDayStart.getFullYear() + '/' + (defaultDayStart.getMonth() + 1) + '/' + defaultDayStart.getDate());
        $('#input_de').val(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate());
        $('#input_ss').val('');
        $('#input_tm').val('');
        $('#input_ts').val('');
        $('#input_tn').val('');
        $('#input_cm').val('');
        $('#input_cs').val('');
        $('#input_cn').val('');
        $('#input_stockcode').val('');
    };
    $('#btn_reset').bind('click', function () {
       reset();
    });
    //更新新闻
    var updateNewsView = function(){
        var $content_show =  $('#content_show');
        $content_show.empty();
        var $ul = $('<ul></ul>')
        for(i = 0; i < 20; i++){
            var $li = $('<li></li>')
            var $a = $('<a href=""></a>');
            $a.text('关于推进传统基础设施领域政府和社会资本合作（PPP）项目资产证券化业务的通知');
            var $span = $('<span></span>');
            $span.text('2017-3-2');
            $li.append($a);
            $li.append($span);
            $ul.append($li);
        }
        $content_show.append($ul);
        var $getMore = $('<a class="getMore">查看更多</a>');
        $getMore.attr('href','');
        $content_show.append($getMore);
    }
    updateNewsView();
    //更新搜索结果
    var updateResultView = function () {
        $('#div_news').slideUp();
        var $temp = $('#div_result_0');
        $('div.result-area.real').remove();
        for (i = 0; i < results.hits.length; i++) {
            var $result = $temp.clone(true);
            $result.addClass('real');
            $result.removeClass('temp');
            $result.attr('id', 'div_result_' + (i + 1));
            //Collapse
            $result.find('div').eq(0).attr('data-target', '#' + results.hits[i].id);
            //Company
            var $company = $result.find('a').eq(0);
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
            var $paragraphs = $result.find('div').eq(1);
            $paragraphs.attr('id', results.hits[i].id);
            for (j = 0; j < results.hits[i].highlights.length; j++) {
                var $para = $('<p class="para"></p>');
                $para.html(results.hits[i].highlights[j]);
                $paragraphs.append($para);
            }
            if (i == 0) {
                $paragraphs.removeClass('collapse');
                $paragraphs.addClass('in');
            }
            $result.hide();
            $result.insertAfter($('#div_result_' + i));
            $result.slideDown();
        }
    }
    //更新页码
    var flagPn = 1;
    var results = {
            pages: [1,2,3,4,5],
            count: 333
        };
    var updatePage = function () {
        $('#div_pages button.foot-page').remove();
        var $loadNext = $('#btn_loadNext');
        
        for (i = 0; i < results.pages.length; i++) {
            var $page = $('<button class="foot-page"></button>');
            $page.bind('click', { 'p': results.pages[i] }, function (e) {
                load(e);
            });
            $page.text(results.pages[i]);
            if (results.pages[i] == flagPn) {
                $page.attr('style', 'font-weight:bold');
            } else {
                $page.attr('style', '');
            }

            $page.insertBefore($loadNext);
        }
        var finalPage = Math.ceil(results.count / 20);
        if (results.pages[0] == 1) {
            $('#btn_loadPrior').attr('disabled','disabled');
            $('#btn_loadPrior').css({'cursor':'default'});
        } else {
            $('#btn_loadPrior').attr('disabled','');
        }
        if (results.pages.length < 5 || results.pages[4] == finalPage) {
            $('#btn_loadNext').attr('disabled','disabled');
        } else {
            $('#btn_loadNext').attr('disabled','');
        }
    }
    $("#btn_loadPrior").on("click", function () {
        var finalPage = Math.ceil(results.count / 20);
        if (results.pages[0] > 5) {
            var firstPage = results.pages[0] - 5;
            results.pages = [];
            for (i = firstPage; i < firstPage + 5; i++) {
                results.pages.push(i);
            }
        } else {
            results.pages = [];
            for (i = 1; i < Math.min(finalPage + 1, 6) ; i++) {
                results.pages.push(i);
            }
        }
        updatePage();
    });

    $("#btn_loadNext").on("click", function () {
        debugger;
        var lastPage = results.pages[results.pages.length - 1];
        var finalPage = Math.ceil(results.count / 20);
        if (finalPage > lastPage + 6) {
            results.pages = [];
            for (i = lastPage + 1; i < lastPage + 6; i++) {
                results.pages.push(i);
            }
        } else {
            results.pages = [];
            for (i = finalPage - Math.min(4, finalPage - 1) ; i <= finalPage; i++) {
                results.pages.push(i);
            }
        }
        updatePage();
    });

    $("#btn_loadFirst").on("click", function () {
        if (flagWarm) return;
        results.pages = [];
        if (results.count > 0) {
            if (results.count > 100) {
                results.pages.push(1, 2, 3, 4, 5);
            } else {
                for (i = 1; i < Math.ceil(results.count / 20) ; i++) {
                    results.pages.push(i);
                }
            }
        }
        updatePage();
        load(1);
    });
});
    
