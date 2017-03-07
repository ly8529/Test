;$(document).ready(function(){

//A股
var arrMainMarkets = ["沪市主板","深市主板","深市中小板","深市创业板"];
var arrMainNotices = ["年度报告", "半年度报告", "一季度报告", "三季度报告", "首次公开发行及上市", "配股", "增发", "可转债", "权证", "其他融资", "权益及限制出售股份",
    "股权变动", "交易", "股东大会", "澄清、风险、业绩预告", "特别处理及退市", "补充及更正", "中介机构报告", "上市公司制度", "其他重大事项", "债券公告", "投资者关系", "监事会公告", "董事会公告"];


var arrParentIndustries = ["农、林、牧、渔业","采矿业","制造业","电力、热力、燃气及水的生产和供应业","建筑业","批发和零售业","交通运输、仓储和邮政业","住宿和餐饮业",
    "信息传输、软件和信息技术服务业","金融业","房地产业","租赁和商务服务业","科学研究和技术服务业","水利、环境和公共设施管理业","居民服务、修理和其他服务业","教育","卫生和社会工作业","文化、体育和娱乐业","综合"]

var arrChildIndustries = [];
arrChildIndustries.push(["农业","林业","畜牧业","渔业","农、林、牧、渔服务业"]);
arrChildIndustries.push(["煤炭开采和洗选业","石油和天然气开采业","黑色金属矿采选业","有色金属矿采选业","非金属矿采选业","开采辅助活动","其他采矿业"]);
arrChildIndustries.push(["农副食品加工业","食品制造业","酒、饮料和精制茶制造业","烟草制品业","纺织业","纺织服装、服饰业","皮革、毛皮、羽毛及其制品和制鞋业",
    "木材加工和木、竹、藤、棕、草制品业","家具制造业","造纸和纸制品业","印刷和记录媒介复制业","文教、工美、体育和娱乐用品制造业","石油加工、炼焦和核燃料加工业",
    "化学原料和化学制品制造业","医药制造业","化学纤维制造业","橡胶和塑料制品业","非金属矿物制品业","黑色金属冶炼和压延加工业","有色金属冶炼和压延加工业","金属制品业",
    "通用设备制造业","专用设备制造业","汽车制造业","铁路、船舶、航空航天和其它运输设备制造业","铁路、船舶、航空航天和其他运输设备制造业","电气机械和器材制造业",
    "计算机、通信和其他电子设备制造业","仪器仪表制造业","其他制造业","废弃资源综合利用业","金属制品、机械和设备修理业"]);
arrChildIndustries.push(["电力、热力生产和供应业","燃气生产和供应业","水的生产和供应业"]);
arrChildIndustries.push(["房屋建筑业","土木工程建筑业","建筑安装业","建筑装饰和其他建筑业"]);
arrChildIndustries.push(["批发业","零售业"]);
arrChildIndustries.push(["铁路运输业","道路运输业","水上运输业","航空运输业","管道运输业","装卸搬运和其他运输代理业","装卸搬运和运输代理业","仓储业","邮政业"]);
arrChildIndustries.push(["住宿业","餐饮业"]);
arrChildIndustries.push(["电信、广播电视和卫星传输服务","互联网和相关服务","软件和信息技术服务业"]);
arrChildIndustries.push(["货币金融服务","资本市场服务","保险业","其他金融业"]);
arrChildIndustries.push(["房地产业"]);
arrChildIndustries.push(["租赁业","商务服务业"]);
arrChildIndustries.push(["研究和试验发展","专业技术服务业","科技推广和应用服务业"]);
arrChildIndustries.push(["水利管理业","生态保护和环境治理业","公共设施管理业"]);
arrChildIndustries.push(["居民服务业","机动车、电子产品和日用产品修理业","其它服务业","其他服务业"]);
arrChildIndustries.push(["教育"]);
arrChildIndustries.push(["卫生","社会工作"]);
arrChildIndustries.push(["新闻和出版业","广播、电视、电影和影视录音制作业","文化艺术业","体育","娱乐业"]);
arrChildIndustries.push(["综合"]);
//arrParentIndustries与arrChildIndustries里面的下标是对应的，即arrParentIndustries[0] = "农、林、牧、渔业"，对应的arrChildIndustries[0] = ["农业","林业","畜牧业","渔业","农、林、牧、渔服务业"]，为一级行业的子行业


var arrProvinces = ["北京市","天津市","上海市","重庆市","广东省","浙江省","山东省","四川省","福建省","湖北省","安徽省","湖南省","辽宁省","河南省","河北省",
    "新疆维吾尔自治区","陕西省","吉林省","山西省","云南省","江西省","广西壮族自治区","黑龙江省","海南省","内蒙古自治区","甘肃省","贵州省","青海省","宁夏回族自治区","西藏自治区"];

//三板
var arrOtcMarkets = ["创新层","基础层"];
var arrOtcNotices = ["定期报告", "临时公告", "中介机构报告", "首次信息披露", "预披露", "其他"];
//地域和行业同A股
//全局变量
var flagOnSearch = false,
    flagSingle = true,
    flag = 1,
    filters = [],
    pagePn = 1,
    pages = [1,2,3,4,5],
    total = 0,
    results = {};
var flagMarket = 1;
var regSpan = new RegExp("【|】|\[|\]", "g");
var regLawKeyword = new RegExp("[《》]|中华人民共和国", "g");
var industries = [];
var provinces = [];
var companies = [];
var notices = [];
var markets = [];

	//日期
	$('#date_text').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
		$('#lst_periods').toggleClass('active');
	});
    /*$("input").on("keydown", function (e){
        if (e.keyCode == 13) {
            $('#lst_periods').removeClass('active');
            //e.preventDefault();
        }
    });*/

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
    $('#senior_search').on('click',function(e){
        e.stopPropagation();
        e.preventDefault();
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
    
    //搜索结果的切换
    $('.result-item').on('click',function(){
        $(this).parent().find('.paras-wrap').slideToggle();
        $(this).toggleClass('bg');
    });

    //展开所有
    $('#btn_expandAll').click(function () {
        if ($(this).html() === '全部展开') {
            $('.result-area').find('.paras-wrap').slideDown();
            $('.result-item').addClass('bg');
            $(this).html('全部收起');
        } else {
            $('.result-area').find('.paras-wrap').slideUp();
            $('.result-item').removeClass('bg');
            $(this).html('全部展开');
        }
    });
    /*$('#span_title').mouseenter(function(){
        $('#span_title').stop(true).animate({'height':'120px'},500);
    })
    $('#span_title').mouseleave(function(){
        $('#span_title').stop(true).animate({'height':'40px'},500);
    })*/

    //right aside 切换
    $('.navlist').on('click',function(e){
        $(this).parent().find('.tablist').addClass('active');
        $(this).parent().siblings().find('.tablist').removeClass('active');
    })

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
    //updateNewsView
    var updateNewsView = function(results){
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
    //updateResultView
    var updateResultView = function () {
        $('.content').slideUp('fast');
        var $temp = $('#div_result_0');
        $('div.result-area.real').remove();
        for (i = 0; i < results.hits.length; i++) {
            var $result = $temp.clone(true);
            $result.addClass('real');
            $result.removeClass('temp');
            $result.attr("id", "div_result_" + (i + 1));
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
            var $paragraphs = $result.find('.paras-wrap');
            for (j = 0; j < results.hits[i].highlights.length; j++) {
                var $para = $('<p class="para"></p>');
                $para.html(results.hits[i].highlights[j]);
                $paragraphs.append($para);
            }
            if(0 == i){
                $result.find('div').eq(0).addClass('bg');
                $result.find('.paras-wrap').slideDown();
            }
            $result.insertAfter($('#div_result_' + i));
        }
    }

    //更新页码
    var updatePage = function(){
        wait('hide');
        $('#div_pages button.foot-page').remove();
        var $loadNext = $('#btn_loadNext');

        for(var i = 0; i < pages.length ;i++){
            var $page = $('<button class="foot-page"></button>');
            $page.bind('click', { 'p': pages[i] }, function (e) {
                //load(e);
            });
            $page.text(pages[i]);
            if (pagePn == pages[i]) {
                $page.attr('style', 'font-weight:bold');
            } else {
                $page.attr('style', '');
            }
            $page.insertBefore($loadNext);
        }
        var finalPage = Math.ceil(total / 20);
        if(1 == pages[0]){
            $('#btn_loadPrior').prop({'disabled':'disabled'});
            $('#btn_loadPrior').addClass('disabled');
        }else{
            $('#btn_loadPrior').prop({'disabled':''});
            $('#btn_loadPrior').removeClass('disabled');
        }
        if(pages.length < 5 || pages[4] == finalPage){
            $('#btn_loadNext').prop('disabled','disabled');
            $('#btn_loadNext').addClass('disabled');
        }else{
            $('#btn_loadNext').prop('disabled','');
            $('#btn_loadNext').removeClass('disabled');
        }
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
        $('.result-num').text(formatThousand(results.count));

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
    

    
    $('#btn_loadPrior').on('click',function(){
        console.info(pages);
        var finalPage = Math.ceil(results.Total / 20);
        if(pages[0] > 5){
            var firstPage = pages[0] - 5;
            pages = [];
            for(i = firstPage; i < firstPage +5 ;i++){
                pages.push(i);
            }
        }else{
            pages = [];
            for(var i = 1 ;i < Math.min(finalPage + 1, 6 ); i++){
                pages.push(i);
            }
        }
        updatePage();
    });

    $("#btn_loadNext").on("click", function () {
        var lastPage = pages[pages.length - 1];
        var finalPage = Math.ceil(results.Total / 20);
        if (finalPage > lastPage + 6) {
            pages = [];
            for (i = lastPage + 1; i < lastPage + 6; i++) {
                pages.push(i);
            }
        } else {
            pages = [];
            for (i = lastPage+1; i <= finalPage; i++) {
                pages.push(i);
            }
        }
        updatePage();
    });


    //排序
    function compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }
     //有二级行业
    var Industry =  function(arr,AggKey){
        var $panel_wrap = $('<div class="panel-wrap"></div>');
        for( var j = 0 ;j < Math.ceil(arr.length / 2 );j++){
            var $panel_item = $('<div class="panel-item"></div>');
            var $panel_list = $('<div class="panel-list"></div>');
            var $div1 = $('<div></div>');
            var $div2 = $('<div></div>');
            var $a_left = $('<a href="filter first-industry"></a>');
            var $span_left = $('<span class="count"></span>')
            //小图标
            var $em1 = $('<em class="icon-drop">+</em>');
            var $em2 = $('<em class="icon-drop">+</em>');
            $a_left.text(arr[2*j].name);
            $span_left.text(arr[2*j].count);
            $div1.append($em1);
            $div1.append($a_left);
            $div1.append($span_left);
            
            if(arr[2*j+1].name){
                var $a_right = $('<a href="filter first-industry"></a>');
                var $span_right = $('<span class="count"></span>')
                $a_right.text(arr[2*j+1].name);
                $span_right.text(arr[2*j+1].count);
                $div2.append($em2);
                $div2.append($a_right);
                $div2.append($span_right);
                $panel_list.append($div1);
                $panel_list.append($div2);
                $panel_item.append($panel_list);
            }else{
                console.info('不存在');
            }
            
            //二级行业
            $em1.bind('click',{childs: arr[2*j].childs },function(e){
                if(!lock){
                    lock = true;
                    if($(this).hasClass('one')){
                        $('.second-wrap').remove();
                        $(this).removeClass('one');
                    }else{
                        $(this).addClass('one');
                        $('.second-wrap').remove();
                        var $second_wrap = $('<div class="second-wrap"></div>');
                        for(var i = 0 ; i < arr[2*j].childs.length; i++ ){
                            var $a = $('<a class="filter" href=""></a>');
                            $a.text(arr[2*j].childs.childshort);
                            $second_wrap.append($a);
                        }
                        $second_wrap.addClass('left');
                        $(this).parent().parent().append($second_wrap);
                        $(this).parent().parent().find($second_wrap).show();
                    }  
                }
                lock = false;  
            })
            $em2.bind('click',{childs: arr[2*j].childs},function(e){
                if(!lock){
                    lock = true;
                    if($(this).hasClass('one')){
                        $('.second-wrap').remove();
                        $(this).removeClass('one');
                    }else{
                        $(this).addClass('one');
                        $('.second-wrap').remove();
                        var $second_wrap = $('<div class="second-wrap"></div>');
                        //生成二级行业
                        for(var i = 0 ; i < arr[2*j+1].childs.length; i++ ){
                            var $a = $('<a class="filter" href=""></a>');
                            $a.text(arr[2*j+1].childs.childshort);
                            $second_wrap.append($a);
                        }
                        $second_wrap.addClass('right');
                        $(this).parent().parent().append($second_wrap);
                        $(this).parent().parent().find($second_wrap).show();
                    }
                }
                lock = false;  
            })
            $panel_wrap.append($panel_item);
        }
        $('#'+AggKey+'').append($panel_wrap);
        return;
    }
    
    //非二级行业
    /*var Other = function(arr,AggKey){
        var $panel_wrap = $('<div class="panel-wrap"></div>');
        for( var j = 0 ;j < Math.ceil(arr.length / 2 );j++){
            var $panel_item = $('<div class="panel-item"></div>');
            var $panel_list = $('<div class="panel-list"></div>');
            var $div1 = $('<div></div>');
            var $div2 = $('<div></div>');
            var $a_left = $('<a href="filter left"></a>');
            //var $span_left = $('<span class="count"></span>')
            //小图标
            var $em1 = $('<em class="icon-drop">+</em>');
            var $em2 = $('<em class="icon-drop">+</em>');
            $a_left.text(arr[2*j]);
            //$span_left.text(arr[2*j].count);
            $div1.append($em1);
            $div1.append($a_left);
            //$div1.append($span_left);
            var $a_right = $('<a href="filter right"></a>');
            //var $span_right = $('<span class="count"></span>')
            $a_right.text(arr[2*j+1]);
            //$span_right.text(arr[2*j+1].count);
            $div2.append($em2);
            $div2.append($a_right);
            //$div2.append($span_right);
            $panel_list.append($div1);
            $panel_list.append($div2);
            $panel_item.append($panel_list);
            $panel_wrap.append($panel_item);
        }
        $('#'+AggKey+'').append($panel_wrap);
        return;
    }*/
    var fillStat = function(data){
        var inAgg = data.Aggregations || [];
        for (i = 0; i < inAgg.length; i++) {
            switch (inAgg[i].AggKey) {
                case "parentIndustry":
                    for (j = 0; j < inAgg[i].Items.length; j++) {
                        var pushChildIndustry = [];
                        for (k = 0; k < inAgg[i].Items[j].S.length; k++) {
                            pushChildIndustry.push({
                                "childname": arrChildIndustries[parseInt(inAgg[i].Items[j].S[k].N-1)],
                                "childcount": abbrNum(inAgg[i].Items[j].S[k].C),
                                "childshort": abbr(inAgg[i].Items[j].S[k].N, 10, "...")
                            });
                            pushChildIndustry = pushChildIndustry.sort(compare(inAgg[i].Items[j].S[k].N));
                        }
                        industries.push({ "name": arrParentIndustries[parseInt(inAgg[i].Items[j].N)-1], "count": abbrNum(inAgg[i].Items[j].C), "childs": pushChildIndustry, "short": abbr(inAgg[i].Items[j].N, 12, "...") });
                        industries = industries.sort(compare(inAgg[i].Items[j].C));
                        //Industry(industries,'industries');
                    }
                case "province":
                    for (j = 0; j < inAgg[i].Items.length; j++) {
                        provinces.push({ "name": arrProvinces[parseInt(inAgg[i].Items[j].N)-1], "count": abbrNum(inAgg[i].Items[j].C) });
                        provinces = provinces.sort(compare(inAgg[i].Items[j].N));
                    }
                    break;
                case "notice":
                    for (j = 0; j < inAgg[i].Items.length; j++) {
                        notices.push({ "name": arrMainNotices[parseInt(inAgg[i].Items[j].N)-1], "count": abbrNum(inAgg[i].Items[j].C)});
                        notices = notices.sort(compare(inAgg[i].Items[j].N));
                    }
                    break;
                case "company":
                    for (j = 0; j < inAgg[i].Items.length; j++) {
                    }
                    break;
                case "market":
                    for (j = 0; j < inAgg[i].Items.length; j++) {
                        markets.push({ "name": inAgg[i].Items[j].N, "count": abbrNum(inAgg[i].Items[j].C) });
                        markets = markets.sort(compare(inAgg[i].Items[j].N));
                    }
                    break;
            }
        }
        console.log(industries);
        console.info(provinces);
        console.info(markets);
        console.info(notices);
    }
    
    var lock = false; //二级行业展开的时候禁止触发panel-wrap的隐藏
    $('.panel-wrap').mouseleave(function(){
        if(!lock){
            $('.panel-wrap').hide();
        }
    })
    $('.filter-title').mouseenter(function(){
        $(this).parent().find('.panel-wrap').show();
        var height = $(this).parent().offset().top;
        if(height>440){
           $(this).parent().find('.panel-wrap').css({bottom:'0px',top:''}); 
        }else{
           $(this).parent().find('.panel-wrap').css({top:'0px',bottom:''}); 
        }
        
        $(this).parent().siblings().find('.panel-wrap').hide();
    })
   //查看更多
    $('#getMore').on('click',function(){
        page++;
        $.post('',{page:page},function(result){

        })
    })

    
    
    var search = function(){
        if(flagOnSearch){
            return false;
        }else{
            flagOnSearch = true;
        }
        
        wait('show');
        //对用户输入内容进行判断
        if (!$('#input_ss').val() && flagSingle) {
            alert('至少要输入一个关键词（不包括不含）或公司名称');
            flagOnSearch = false;
            wait('hide');
            return false;
        }
        if (!$('#input_tm').val() && !$('#input_ts').val() && !$('#input_cm').val() && !$('#input_cs').val() && !$('#input_stockcode').val() && !flagSingle) {
            alert('至少要输入一个关键词（不包括不含）或公司名称');
            flagOnSearch = false;
            wait('hide');
            return false;
        }
        var extendBody = {
            "isSimpleQuery": flagSingle,
            "filters": filters,
            "sort": 0,
            "searchType": 1,
            "pageNum": 1,
            "token": '',
        }
        var body = $("#frm_search").serializeObject();

        body = ieSearchDisclosureAdjust(body);
        body.startDate = decodeURI(body.startDate);
        body.endDate = decodeURI(body.endDate);
       
        $.extend(body,extendBody);
        $.post('http://10.119.1.150/api/Search/SearchMainFiling',body,function(data){
            flasOnSearch = false;
            total = data.Total;
            console.info(total);
            wait('hide');
            console.info(data);
            //更新搜索结果
            $('.result').slideDown();
            fillSearch(data);

            body = $.extend(body,{'searchType': 2});
            $.post('http://10.119.1.150/api/Search/SearchMainFiling',body,function(stat){
                console.info(stat);
                fillStat(stat);
            })
        })
   }
   //发送搜索请求
   $('#frm_search').on('submit',function(e){
        e.preventDefault();
        search();
         
   })
   $('#btn_senior_search').on('click',function(e){
        e.preventDefault();
        search();
   })
   if ($("#input_tm").val() || $("#input_ts").val() || $("#input_tn").val() || $("#input_cm").val() || $("#input_cs").val() || $("#input_cn").val()) {
        flagSingle = false;
        $("#senior_search").trigger("click");
    }
});
    
