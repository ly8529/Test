;$(document).ready(function(){
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
    //调整主题内容的高度
    var windowHeight = $(window).height();
    $("#content").height(windowHeight - 210);
    $(window).resize(function() {
        var windowHeight = $(window).height();
        $("#content").height(windowHeight - 210);
    });
})  